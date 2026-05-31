/* ============================================================
   SMV Kontorhjælper — Cloudflare Worker
   ============================================================
   DEPLOY STEPS:
   1. Go to cloudflare.com → sign up free
   2. Workers & Pages → Create Worker → paste this file
   3. Settings → Variables → Add secret: GEMINI_API_KEY = your key
      (get free key at aistudio.google.com)
   4. Save & Deploy
   5. Copy your worker URL (e.g. https://smv-ai.yourname.workers.dev)
   6. Paste it as WORKER_URL in app.js
============================================================ */

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    const prompt = buildPrompt(body);
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Unknown tool' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    const geminiRes = await fetch(`${GEMINI_URL}?key=${env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.65, maxOutputTokens: 1200 },
      }),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok || data.error) {
      const errMsg = data.error?.message ?? `HTTP ${geminiRes.status}`;
      console.error('Gemini error:', errMsg);
      return new Response(JSON.stringify({ error: errMsg }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return new Response(JSON.stringify({ output }), {
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  },
};

// ── Prompt builder ─────────────────────────────────────────────
function buildPrompt({ toolId, notes, customer, company, price, deadline, tone, lang }) {
  const langLabel = lang === 'en' ? 'English' : 'dansk';
  const t = (da, en) => lang === 'en' ? en : da;

  const meta = [
    company  ? t(`Virksomhed: ${company}`,   `Company: ${company}`)   : '',
    customer ? t(`Modtager: ${customer}`,     `Recipient: ${customer}`) : '',
    price    ? t(`Beløb: ${price}`,           `Amount: ${price}`)       : '',
    deadline ? t(`Dato/frist: ${deadline}`,   `Date/deadline: ${deadline}`) : '',
  ].filter(Boolean).join('\n');

  const toneNote = tone
    ? t(`Skriv i en ${tone} tone.`, `Write in a ${tone} tone.`)
    : '';

  const prompts = {
    kundemail: `
${t('Du er assistent for en dansk SMV-virksomhed og skriver en professionel kundemail.', 'You are an assistant for a small business and write a professional customer email.')}
${toneNote}
${meta}
${t('Brugerens noter:', 'User notes:')} ${notes}

${t(`Skriv en komplet, klar email på ${langLabel} med:
- Emne: [emne der passer indholdet]
- Professionel hilsen med modtagerens navn hvis angivet
- Tydeligt indhold baseret på noterne — hvad er budskabet, hvad skal kunden vide/gøre?
- Et konkret næste skridt
- Professionel afslutning med kontaktinfo-blok (navn, telefon, email — brug placeholders [Navn], [Tlf.], [Email] hvis ikke oplyst)

Returnér kun emailen, klar til at sende.`,
`Write a complete, clear email in ${langLabel} with:
- Subject: [subject matching content]
- Professional greeting with recipient name if provided
- Clear content based on the notes
- A concrete next step
- Professional sign-off with contact block (use [Name], [Phone], [Email] as placeholders if not provided)

Return only the email, ready to send.`)}`,

    tilbud: `
${t('Du skriver et professionelt tilbud for en dansk SMV-virksomhed.', 'You write a professional quote for a small business.')}
${toneNote}
${meta}
${t('Brugerens noter:', 'User notes:')} ${notes}

${t(`Skriv et komplet tilbudsdokument på ${langLabel} med:
- TILBUD øverst med referencenummer (brug dato-baseret format: T-YYYYMMDD-01) og dato
- Modtager/kunde
- Specificeret beskrivelse af ydelse eller vare
- Prisspecifikation (ekskl. moms, moms 25%, inkl. moms)
- Gyldighed (30 dage), betalingsbetingelser (netto 14 dage)
- Eventuelle forbehold eller bemærkninger
- Underskriftslinje og kontaktinfo

Returnér kun tilbudsdokumentet.`,
`Write a complete quote document in ${langLabel} with:
- QUOTE at top with reference number and date
- Client/recipient
- Detailed description of service or goods
- Price breakdown (excl. VAT, VAT, incl. VAT)
- Validity (30 days), payment terms (net 14 days)
- Any conditions or notes
- Signature line and contact info

Return only the quote document.`)}`,

    rykker: `
${t('Du skriver en professionel rykkerskrivelse for en dansk SMV-virksomhed.', 'You write a professional payment reminder for a small business.')}
${meta}
${t('Brugerens noter:', 'User notes:')} ${notes}

${t(`Skriv en komplet rykkerskrivelse på ${langLabel} med:
- RYKKER øverst med fakturanummer og dato (udled fra noterne eller brug placeholders)
- Modtager
- Klar reference til den forfaldne faktura med beløb
- Ny betalingsfrist (10 hverdage fra dato)
- Bankoplysninger (reg.nr. [XXXX], kontonr. [XXXXXXXXXX] som placeholder)
- Hvad der sker ved fortsat manglende betaling
- Professionel men bestemt tone
- Kontaktinfo i bunden

Returnér kun rykkerteksten.`,
`Write a complete payment reminder in ${langLabel} with:
- REMINDER at top with invoice number and date
- Recipient
- Clear reference to the overdue invoice with amount
- New payment deadline (10 business days)
- Bank details (as placeholders if not provided)
- Consequences of continued non-payment
- Professional but firm tone
- Contact info at bottom

Return only the reminder text.`)}`,

    facebook: `
${t('Du skriver et engagerende Facebook-opslag for en dansk SMV-virksomhed.', 'You write an engaging Facebook post for a small business.')}
${toneNote}
${meta}
${t('Brugerens noter:', 'User notes:')} ${notes}

${t(`Skriv et Facebook-opslag på ${langLabel} der:
- Starter med en fængende sætning der stopper scrolling (brug gerne spørgsmål eller et overraskende faktum)
- Fortæller historien/budskabet klart og kort (2-4 afsnit)
- Bruger 3-5 relevante emojis naturligt i teksten
- Har en tydelig call-to-action (ring, skriv, book, besøg)
- Slutter med 5-8 relevante hashtags

Returnér kun opslags-teksten, klar til at kopiere ind i Facebook.`,
`Write a Facebook post in ${langLabel} that:
- Opens with a hook that stops scrolling
- Clearly tells the story/message (2-4 paragraphs)
- Uses 3-5 relevant emojis naturally in the text
- Has a clear call-to-action
- Ends with 5-8 relevant hashtags

Return only the post text, ready to paste into Facebook.`)}`,

    sop: `
${t('Du skriver en professionel SOP (Standard Operating Procedure) / arbejdsinstruktion.', 'You write a professional SOP (Standard Operating Procedure).')}
${meta}
${t('Brugerens noter:', 'User notes:')} ${notes}

${t(`Skriv et komplet SOP-dokument på ${langLabel} med:
- Dokumenthoved: Titel, Dokumentnummer (SOP-YYYYMMDD-01), Version 1.0, Dato, Udarbejdet af (placeholder)
- Formål: hvad beskriver denne procedure
- Anvendelsesområde: hvem er den for
- Nødvendigt udstyr og materialer (udled fra noterne)
- Trin-for-trin procedure med nummererede trin
- ⚠️ SIKKERHED: relevante sikkerhedsadvarsler
- Kvalitetskontrol: hvad skal tjekkes
- Opbevaring og dokumentation
- Underskrift: Udarbejdet af / Godkendt af med dato-linjer

Returnér kun SOP-dokumentet.`,
`Write a complete SOP document in ${langLabel} with:
- Document header: Title, Document number, Version, Date
- Purpose and scope
- Required equipment and materials
- Step-by-step numbered procedure
- ⚠️ SAFETY warnings where relevant
- Quality control checks
- Storage and documentation
- Signature section

Return only the SOP document.`)}`,

    tjekliste: `
${t('Du skriver en professionel tjekliste.', 'You write a professional checklist.')}
${meta}
${t('Brugerens noter:', 'User notes:')} ${notes}

${t(`Skriv en komplet tjekliste på ${langLabel} med:
- Titel og formål
- Dato og ansvarlig-felt øverst
- Punkterne logisk opdelt i sektioner (brug overskrifter)
- Hvert punkt på sin linje som: ☐ Punkt (tilføj ⚡ foran kritiske punkter)
- Minimum 12-20 konkrete punkter baseret på noterne
- Afslutning: Gennemført af: _______ Dato: _______ Underskrift: _______

Returnér kun tjeklisteteksten.`,
`Write a complete checklist in ${langLabel} with:
- Title and purpose
- Date and responsible fields at top
- Items organized in logical sections
- Each item as: ☐ Item (add ⚡ for critical items)
- At least 12-20 concrete items based on the notes
- Sign-off section at the bottom

Return only the checklist text.`)}`,

    onboarding: `
${t('Du skriver en professionel medarbejder-onboarding-plan.', 'You write a professional employee onboarding plan.')}
${meta}
${t('Brugerens noter:', 'User notes:')} ${notes}

${t(`Skriv en komplet onboarding-plan på ${langLabel} med:
- Velkomstsætning til den nye medarbejder (brug navn hvis angivet)
- Praktisk info (mødetid første dag, adresse, parkering, adgangskort)
- Uge 1 plan dag-for-dag (mandag til fredag)
- Vigtige kontakter: nærmeste leder, kollega/makker, HR-kontakt (brug placeholders)
- Certifikater og kurser der skal gennemføres (udled fra noterne)
- Prøvetid og forventninger
- HR-underskriftssektion: Medarbejder / Leder / Dato

Returnér kun onboarding-planen.`,
`Write a complete onboarding plan in ${langLabel} with:
- Welcome message to the new employee
- Practical info (first day details, address, access)
- Week 1 day-by-day plan
- Key contacts with placeholders
- Required certifications and courses
- Probation period and expectations
- HR signature section

Return only the onboarding plan.`)}`,

    professionel: `
${t('Du forbedrer en tekst til professionelt erhvervsbrug på dansk.', 'You improve a text for professional business use.')}
${toneNote}
${t('Original tekst:', 'Original text:')} ${notes}

${t(`Forbedre teksten ved at:
1. Rette alle stavefejl og grammatikfejl
2. Gøre sproget mere professionelt og præcist
3. Forbedre sætningsstruktur og flow
4. Fjerne unødig fyldtekst
5. Bevare det originale budskab og betydning

Svar i dette format:

FORBEDRET TEKST:
[den forbedrede version her]

HVAD ER ÆNDRET:
• [ændring 1]
• [ændring 2]
• [osv. — list de 3-6 vigtigste ændringer]

TIPS TIL GENNEMGANG:
[1-2 sætninger om hvad man særligt bør tjekke inden teksten sendes]`,
`Improve the text by:
1. Fixing all spelling and grammar errors
2. Making the language more professional and precise
3. Improving sentence structure and flow
4. Removing unnecessary filler
5. Preserving the original message

Reply in this format:

IMPROVED TEXT:
[the improved version here]

WHAT CHANGED:
• [change 1]
• [change 2]
• [etc. — list the 3-6 most important changes]

REVIEW TIPS:
[1-2 sentences about what to double-check before sending]`)}`,
  };

  return prompts[toolId] ?? null;
}
