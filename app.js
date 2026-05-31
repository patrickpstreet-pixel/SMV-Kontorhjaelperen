/* ============================================
   SMV Kontorhjælper — app.js
   ============================================ */

// ── Language system ──────────────────────────────────────────────────────────

const LANG = {
  da: {
    appName: 'SMV Kontorhjælper',
    appSub: 'Praktiske tekster og skabeloner til små virksomheder',
    introTitle: 'Klar til at spare tid?',
    introText: 'Indsæt dine rå noter, vælg hvad du vil lave, og få et brugbart udkast med det samme.',
    toolsLabel: 'Vælg et værktøj',
    notesLabel: 'Dine rå noter',
    notesPlaceholder: 'Skriv dine rå noter her... Sæt bare stikord ned. Det behøver ikke være perfekt.',
    customerLabel: 'Kundenavn (valgfrit)',
    companyLabel: 'Firmanavn (valgfrit)',
    priceLabel: 'Pris (valgfrit)',
    deadlineLabel: 'Frist / dato (valgfrit)',
    toneLabel: 'Tone',
    tones: ['Venlig', 'Professionel', 'Kort og direkte'],
    generateBtn: 'Lav udkast',
    generating: 'Genererer...',
    outputLabel: 'Dit udkast',
    copyBtn: 'Kopiér tekst',
    saveBtn: 'Gem lokalt',
    clearBtn: 'Ryd',
    downloadBtn: 'Download .txt',
    draftsLabel: 'Gemte udkast',
    draftsEmpty: 'Ingen gemte udkast endnu. Lav dit første udkast ovenfor.',
    openBtn: 'Åbn',
    copyDraftBtn: 'Kopiér',
    deleteBtn: 'Slet',
    copiedMsg: 'Kopieret til udklipsholderen!',
    savedMsg: 'Gemt lokalt!',
    deletedMsg: 'Udkast slettet.',
    validationMsg: 'Skriv venligst dine noter inden du genererer.',
    clearConfirm: 'Er du sikker på, at du vil rydde? Det sletter udkastet.',
    changeToolBtn: 'Skift værktøj',
    yourNotes: 'Dine noter',
    optionalFields: 'Ekstra felter (valgfrit)',
  },
  en: {
    appName: 'SMV Office Helper',
    appSub: 'Practical texts and templates for small businesses',
    introTitle: 'Ready to save time?',
    introText: 'Enter your rough notes, choose what you need, and get a usable draft immediately.',
    toolsLabel: 'Choose a tool',
    notesLabel: 'Your rough notes',
    notesPlaceholder: 'Write your rough notes here... Just jot down key points. It doesn\'t need to be perfect.',
    customerLabel: 'Customer name (optional)',
    companyLabel: 'Company name (optional)',
    priceLabel: 'Price (optional)',
    deadlineLabel: 'Deadline / date (optional)',
    toneLabel: 'Tone',
    tones: ['Friendly', 'Professional', 'Short & direct'],
    generateBtn: 'Generate draft',
    generating: 'Generating...',
    outputLabel: 'Your draft',
    copyBtn: 'Copy text',
    saveBtn: 'Save locally',
    clearBtn: 'Clear',
    downloadBtn: 'Download .txt',
    draftsLabel: 'Saved drafts',
    draftsEmpty: 'No saved drafts yet. Create your first draft above.',
    openBtn: 'Open',
    copyDraftBtn: 'Copy',
    deleteBtn: 'Delete',
    copiedMsg: 'Copied to clipboard!',
    savedMsg: 'Saved locally!',
    deletedMsg: 'Draft deleted.',
    validationMsg: 'Please write your notes before generating.',
    clearConfirm: 'Are you sure you want to clear? This will delete the draft.',
    changeToolBtn: 'Change tool',
    yourNotes: 'Your notes',
    optionalFields: 'Extra fields (optional)',
  }
};

// ── Tool definitions ─────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: 'kundemail',
    icon: '✉️',
    titleDa: 'Kundemail',
    titleEn: 'Customer Email',
    descDa: 'Gør rå noter til en høflig professionel mail',
    descEn: 'Turn rough notes into a polite professional email',
    fields: ['customer', 'company', 'tone'],
  },
  {
    id: 'tilbud',
    icon: '📋',
    titleDa: 'Tilbudstekst',
    titleEn: 'Quotation Text',
    descDa: 'Lav en struktureret tilbudstekst fra dine noter',
    descEn: 'Create a structured quotation from your notes',
    fields: ['customer', 'company', 'price', 'deadline', 'tone'],
  },
  {
    id: 'rykker',
    icon: '🔔',
    titleDa: 'Rykkermail',
    titleEn: 'Payment Reminder',
    descDa: 'Høflig betalingspåmindelse uden at lyde aggressiv',
    descEn: 'Polite payment reminder without sounding aggressive',
    fields: ['customer', 'company', 'price', 'deadline', 'tone'],
  },
  {
    id: 'facebook',
    icon: '📣',
    titleDa: 'Facebook-opslag',
    titleEn: 'Facebook Post',
    descDa: 'Lokalt opslag til din virksomhedsside',
    descEn: 'Local post for your business page',
    fields: ['company', 'tone'],
  },
  {
    id: 'sop',
    icon: '📄',
    titleDa: 'SOP / Arbejdsinstruktion',
    titleEn: 'SOP / Work Instruction',
    descDa: 'Struktureret arbejdsinstruktion fra dine noter',
    descEn: 'Structured work instruction from your notes',
    fields: ['company'],
  },
  {
    id: 'tjekliste',
    icon: '✅',
    titleDa: 'Tjekliste',
    titleEn: 'Checklist',
    descDa: 'Gør noter til en praktisk tjekliste',
    descEn: 'Turn notes into a practical checklist',
    fields: [],
  },
  {
    id: 'onboarding',
    icon: '👋',
    titleDa: 'Medarbejder-onboarding',
    titleEn: 'Employee Onboarding',
    descDa: 'Onboardingplan for en ny medarbejder',
    descEn: 'Onboarding plan for a new employee',
    fields: ['customer', 'company'],
  },
  {
    id: 'professionel',
    icon: '✨',
    titleDa: 'Gør tekst professionel',
    titleEn: 'Make Text Professional',
    descDa: 'Omskriv rodet tekst til professionelt sprog',
    descEn: 'Rewrite messy text into professional language',
    fields: ['tone'],
  },
];

// ── State ─────────────────────────────────────────────────────────────────────

let currentLang = 'da';
let selectedTool = null;
let currentOutput = '';
let drafts = [];

// ── Helpers ───────────────────────────────────────────────────────────────────

function t(key) {
  return LANG[currentLang][key] || LANG['da'][key] || key;
}

function toolTitle(tool) {
  return currentLang === 'en' ? tool.titleEn : tool.titleDa;
}

function toolDesc(tool) {
  return currentLang === 'en' ? tool.descEn : tool.descDa;
}

function formatDate(ts) {
  const d = new Date(ts);
  const pad = n => String(n).padStart(2, '0');
  if (currentLang === 'en') {
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} kl. ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function today() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

function loadDrafts() {
  try {
    drafts = JSON.parse(localStorage.getItem('smv_drafts') || '[]');
  } catch { drafts = []; }
}

function saveDraftsToStorage() {
  localStorage.setItem('smv_drafts', JSON.stringify(drafts));
}

// ── Template generators ──────────────────────────────────────────────────────
// NOTE: This is where AI generation will be plugged in later.
// Replace the switch block inside generateDraft() with an API call.

function generateDraft(toolId, formData) {
  /* ── FUTURE AI HOOK ───────────────────────────────────────────────────────
     When you add a real AI backend, replace the switch below with:

     const response = await fetch('/api/generate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ tool: toolId, ...formData, lang: currentLang })
     });
     return await response.json().then(r => r.text);

     For Claude API through a serverless function (Vercel/Netlify), use:
     body: JSON.stringify({
       model: 'claude-sonnet-4-6',
       tool: toolId,
       notes: formData.notes,
       options: { customer, company, price, deadline, tone }
     })
  ────────────────────────────────────────────────────────────────────────── */

  const { notes, customer, company, price, deadline, tone } = formData;
  const da = currentLang === 'da';

  const greeting = customer
    ? (da ? `Kære ${customer},` : `Dear ${customer},`)
    : (da ? 'Kære kunde,' : 'Dear customer,');

  const sign = company || (da ? 'Venlig hilsen' : 'Kind regards');

  const toneStyle = tone === t('tones')[2]
    ? 'direct'
    : tone === t('tones')[1]
    ? 'formal'
    : 'friendly';

  switch (toolId) {

    // ── 1. Kundemail ────────────────────────────────────────────────────────
    case 'kundemail': {
      if (da) {
        return [
          greeting,
          '',
          `Mange tak for din henvendelse${customer ? ` og interessen, ${customer}` : ''}.`,
          '',
          `${notes}`,
          '',
          toneStyle === 'direct'
            ? 'Vend gerne tilbage, hvis du har spørgsmål.'
            : toneStyle === 'formal'
            ? 'Vi ser frem til et godt samarbejde og vender tilbage hurtigst muligt med yderligere information.'
            : 'Tøv endelig ikke med at kontakte os, hvis du har spørgsmål eller ønsker at høre mere. Vi er altid klar til at hjælpe.',
          '',
          `Med venlig hilsen`,
          sign,
        ].join('\n');
      } else {
        return [
          greeting,
          '',
          `Thank you for reaching out${customer ? `, ${customer}` : ''}.`,
          '',
          `${notes}`,
          '',
          toneStyle === 'direct'
            ? 'Feel free to get back to us if you have any questions.'
            : toneStyle === 'formal'
            ? 'We look forward to working with you and will get back to you with more information as soon as possible.'
            : 'Please don\'t hesitate to reach out if you have any questions or would like to know more. We\'re always happy to help.',
          '',
          `Kind regards,`,
          sign,
        ].join('\n');
      }
    }

    // ── 2. Tilbudstekst ─────────────────────────────────────────────────────
    case 'tilbud': {
      const priceStr = price ? (da ? `\nPris: ${price}` : `\nPrice: ${price}`) : '';
      const deadlineStr = deadline ? (da ? `\nGyldig til: ${deadline}` : `\nValid until: ${deadline}`) : '';
      if (da) {
        return [
          `TILBUD${company ? ' — ' + company.toUpperCase() : ''}`,
          `Dato: ${today()}`,
          customer ? `Til: ${customer}` : '',
          '',
          '─────────────────────────────',
          '',
          'BESKRIVELSE AF OPGAVE',
          notes,
          '',
          '─────────────────────────────',
          '',
          'BETINGELSER',
          priceStr ? `${priceStr}` : '• Pris aftales nærmere',
          deadlineStr ? `${deadlineStr}` : '',
          '• Prisen er ekskl. moms, med mindre andet er angivet',
          '• Eventuelle tillægsopgaver aftales særskilt',
          '• Arbejdet påbegyndes efter skriftlig godkendelse',
          '',
          '─────────────────────────────',
          '',
          toneStyle === 'direct'
            ? 'Venligst bekræft tilbuddet senest ' + (deadline || 'hurtigst muligt') + '.'
            : 'Vi håber, at ovenstående tilbud lever op til dine forventninger. Tag gerne fat i os, hvis du har spørgsmål eller ønsker justeringer.',
          '',
          'Med venlig hilsen',
          sign,
        ].filter(l => l !== '').join('\n');
      } else {
        return [
          `QUOTATION${company ? ' — ' + company.toUpperCase() : ''}`,
          `Date: ${today()}`,
          customer ? `To: ${customer}` : '',
          '',
          '─────────────────────────────',
          '',
          'SCOPE OF WORK',
          notes,
          '',
          '─────────────────────────────',
          '',
          'TERMS & CONDITIONS',
          priceStr ? `${priceStr}` : '• Price to be agreed upon',
          deadlineStr ? `${deadlineStr}` : '',
          '• Price excludes VAT unless otherwise stated',
          '• Any additional work will be agreed separately',
          '• Work commences upon written approval',
          '',
          '─────────────────────────────',
          '',
          toneStyle === 'direct'
            ? 'Please confirm this quotation by ' + (deadline || 'as soon as possible') + '.'
            : 'We hope this quotation meets your expectations. Please get in touch if you have any questions or would like adjustments.',
          '',
          'Kind regards,',
          sign,
        ].filter(l => l !== '').join('\n');
      }
    }

    // ── 3. Rykkermail ───────────────────────────────────────────────────────
    case 'rykker': {
      const amountStr = price ? (da ? ` på ${price}` : ` of ${price}`) : '';
      const dueDateStr = deadline ? (da ? ` med forfaldsdato ${deadline}` : ` with due date ${deadline}`) : '';
      if (da) {
        return [
          greeting,
          '',
          `Vi tillader os venligst at minde dig om en udestående betaling${amountStr}${dueDateStr}.`,
          '',
          notes ? notes + '\n' : '',
          toneStyle === 'direct'
            ? `Betalingen bedes overført hurtigst muligt. Kontakt os, hvis der er spørgsmål.`
            : `Vi sætter pris på et hurtigt samarbejde. Hvis betalingen allerede er afsendt, bedes du se bort fra denne påmindelse. Kontakt os endelig, hvis du har spørgsmål til fakturaen eller betalingsbetingelserne — vi finder gerne en løsning.`,
          '',
          'Med venlig hilsen',
          sign,
        ].filter(l => l !== null).join('\n');
      } else {
        return [
          greeting,
          '',
          `We would like to kindly remind you of an outstanding payment${amountStr}${dueDateStr}.`,
          '',
          notes ? notes + '\n' : '',
          toneStyle === 'direct'
            ? `Please transfer the payment as soon as possible. Contact us if you have any questions.`
            : `We appreciate your prompt attention to this matter. If payment has already been sent, please disregard this reminder. Feel free to contact us if you have any questions about the invoice or payment terms — we're happy to find a solution.`,
          '',
          'Kind regards,',
          sign,
        ].filter(l => l !== null).join('\n');
      }
    }

    // ── 4. Facebook-opslag ──────────────────────────────────────────────────
    case 'facebook': {
      const co = company || (da ? 'os' : 'us');
      if (da) {
        return [
          `🔹 ${notes}`,
          '',
          toneStyle === 'direct'
            ? `Tag fat i ${co} i dag — vi er klar til at hjælpe! 👇`
            : toneStyle === 'formal'
            ? `Hos ${co} prioriterer vi kvalitet og god service. Kontakt os gerne for mere information.`
            : `Hos ${co} elsker vi at hjælpe vores lokale kunder. Skriv til os eller ring — vi glæder os til at høre fra dig! 😊`,
          '',
          `📍 ${company || '[Bynavn]'}`,
          `📞 [Tlf. nummer]`,
          `🌐 [Hjemmeside]`,
          '',
          '#lokalterhvervsliv #småvirksomheder' + (company ? ` #${company.replace(/\s+/g, '')}` : ''),
        ].join('\n');
      } else {
        return [
          `🔹 ${notes}`,
          '',
          toneStyle === 'direct'
            ? `Get in touch with ${co} today — we're ready to help! 👇`
            : toneStyle === 'formal'
            ? `At ${co}, we prioritise quality and great service. Contact us for more information.`
            : `At ${co}, we love helping our local customers. Message us or call — we'd love to hear from you! 😊`,
          '',
          `📍 ${company || '[City]'}`,
          `📞 [Phone number]`,
          `🌐 [Website]`,
          '',
          '#localbusiness #smallbusiness' + (company ? ` #${company.replace(/\s+/g, '')}` : ''),
        ].join('\n');
      }
    }

    // ── 5. SOP / Arbejdsinstruktion ─────────────────────────────────────────
    case 'sop': {
      if (da) {
        return [
          `ARBEJDSINSTRUKTION (SOP)`,
          `${company ? 'Virksomhed: ' + company : ''}`,
          `Dato: ${today()}`,
          `Version: 1.0`,
          '',
          '════════════════════════════════════',
          '1. FORMÅL',
          '════════════════════════════════════',
          `Denne instruktion beskriver fremgangsmåden for: ${notes.split('\n')[0] || 'opgaven'}`,
          '',
          '════════════════════════════════════',
          '2. ANSVARSFORDELING',
          '════════════════════════════════════',
          '• Ansvarlig: [Navn / stilling]',
          '• Godkendt af: [Leder / navn]',
          '',
          '════════════════════════════════════',
          '3. FREMGANGSMÅDE',
          '════════════════════════════════════',
          ...buildNumberedSteps(notes, da),
          '',
          '════════════════════════════════════',
          '4. KVALITET / SIKKERHED',
          '════════════════════════════════════',
          '• Kontrollér resultatet inden aflevering',
          '• Overhold gældende sikkerhedsforskrifter',
          '• Rapportér afvigelser til nærmeste leder',
          '',
          '════════════════════════════════════',
          '5. AFSLUTNINGSKONTROL',
          '════════════════════════════════════',
          '[ ] Opgaven er udført korrekt',
          '[ ] Arbejdsplads ryddet',
          '[ ] Afvigelser registreret (hvis relevant)',
          '[ ] Næste skridt sat i gang',
        ].filter(l => l !== '').join('\n');
      } else {
        return [
          `STANDARD OPERATING PROCEDURE (SOP)`,
          `${company ? 'Company: ' + company : ''}`,
          `Date: ${today()}`,
          `Version: 1.0`,
          '',
          '════════════════════════════════════',
          '1. PURPOSE',
          '════════════════════════════════════',
          `This instruction describes the procedure for: ${notes.split('\n')[0] || 'the task'}`,
          '',
          '════════════════════════════════════',
          '2. RESPONSIBILITIES',
          '════════════════════════════════════',
          '• Responsible: [Name / position]',
          '• Approved by: [Manager / name]',
          '',
          '════════════════════════════════════',
          '3. PROCEDURE',
          '════════════════════════════════════',
          ...buildNumberedSteps(notes, da),
          '',
          '════════════════════════════════════',
          '4. QUALITY / SAFETY',
          '════════════════════════════════════',
          '• Check the result before delivery',
          '• Follow applicable safety regulations',
          '• Report deviations to the nearest manager',
          '',
          '════════════════════════════════════',
          '5. COMPLETION CHECK',
          '════════════════════════════════════',
          '[ ] Task completed correctly',
          '[ ] Workspace tidied',
          '[ ] Deviations recorded (if applicable)',
          '[ ] Next steps initiated',
        ].filter(l => l !== '').join('\n');
      }
    }

    // ── 6. Tjekliste ────────────────────────────────────────────────────────
    case 'tjekliste': {
      const lines = notes.split('\n').map(l => l.trim()).filter(Boolean);
      if (da) {
        const groups = groupLines(lines);
        let out = ['TJEKLISTE', `Oprettet: ${today()}`, ''];
        groups.forEach(g => {
          out.push(g.header ? `\n▸ ${g.header.toUpperCase()}` : '');
          g.items.forEach(item => out.push(`[ ] ${item}`));
        });
        out.push('', '─────────────────────────────');
        out.push(`Samlet antal punkter: ${lines.length}`);
        return out.join('\n');
      } else {
        const groups = groupLines(lines);
        let out = ['CHECKLIST', `Created: ${today()}`, ''];
        groups.forEach(g => {
          out.push(g.header ? `\n▸ ${g.header.toUpperCase()}` : '');
          g.items.forEach(item => out.push(`[ ] ${item}`));
        });
        out.push('', '─────────────────────────────');
        out.push(`Total items: ${lines.length}`);
        return out.join('\n');
      }
    }

    // ── 7. Medarbejder-onboarding ───────────────────────────────────────────
    case 'onboarding': {
      const emp = customer || (da ? 'den nye medarbejder' : 'the new employee');
      const co = company || (da ? 'virksomheden' : 'the company');
      if (da) {
        return [
          `ONBOARDINGPLAN`,
          `Medarbejder: ${emp}`,
          `Virksomhed: ${co}`,
          `Startdato: ${deadline || '[indsæt dato]'}`,
          `Udarbejdet: ${today()}`,
          '',
          '════════════════════════════════════',
          'DAG 1 — VELKOMMEN',
          '════════════════════════════════════',
          '[ ] Velkomst og rundvisning',
          '[ ] Præsentation for kolleger',
          '[ ] Opsætning af arbejdsplads (PC, adgange, nøgler)',
          '[ ] Gennemgang af praktiske regler',
          `[ ] Tillykke og god arbejdslyst, ${emp}!`,
          '',
          '════════════════════════════════════',
          'FØRSTE UGE',
          '════════════════════════════════════',
          '[ ] Introduktion til arbejdsopgaver',
          '[ ] Oplæring i systemer og værktøjer',
          '[ ] Møde med nærmeste leder',
          '[ ] Gennemgang af virksomhedspolitikker',
          notes ? '\nOPGAVE-SPECIFIKKE NOTER:\n' + notes : '',
          '',
          '════════════════════════════════════',
          'FØRSTE MÅNED',
          '════════════════════════════════════',
          '[ ] Selvstændigt arbejde med støtte',
          '[ ] Check-in møde med leder (uge 2)',
          '[ ] Opfølgningsgespräch (uge 4)',
          '[ ] Feedback og evaluering',
          '[ ] Yderligere oplæring efter behov',
          '',
          '════════════════════════════════════',
          'PRAKTISK OPSÆTNING',
          '════════════════════════════════════',
          '[ ] Login og adgangskoder',
          '[ ] Email og kalender',
          '[ ] Nødvendigt udstyr',
          '[ ] Vigtige kontakter',
          '[ ] Interne systemer og platforme',
        ].filter(l => l !== null).join('\n');
      } else {
        return [
          `ONBOARDING PLAN`,
          `Employee: ${emp}`,
          `Company: ${co}`,
          `Start date: ${deadline || '[insert date]'}`,
          `Created: ${today()}`,
          '',
          '════════════════════════════════════',
          'DAY 1 — WELCOME',
          '════════════════════════════════════',
          '[ ] Welcome and office tour',
          '[ ] Introduction to colleagues',
          '[ ] Workspace setup (PC, access, keys)',
          '[ ] Overview of practical rules',
          `[ ] Welcome aboard, ${emp}!`,
          '',
          '════════════════════════════════════',
          'FIRST WEEK',
          '════════════════════════════════════',
          '[ ] Introduction to tasks and responsibilities',
          '[ ] Training on systems and tools',
          '[ ] Meeting with direct manager',
          '[ ] Review company policies',
          notes ? '\nROLE-SPECIFIC NOTES:\n' + notes : '',
          '',
          '════════════════════════════════════',
          'FIRST MONTH',
          '════════════════════════════════════',
          '[ ] Independent work with support',
          '[ ] Check-in meeting with manager (week 2)',
          '[ ] Follow-up conversation (week 4)',
          '[ ] Feedback and evaluation',
          '[ ] Additional training as needed',
          '',
          '════════════════════════════════════',
          'PRACTICAL SETUP',
          '════════════════════════════════════',
          '[ ] Logins and passwords',
          '[ ] Email and calendar',
          '[ ] Required equipment',
          '[ ] Key contacts',
          '[ ] Internal systems and platforms',
        ].filter(l => l !== null).join('\n');
      }
    }

    // ── 8. Gør tekst professionel ───────────────────────────────────────────
    case 'professionel': {
      if (da) {
        const intro = toneStyle === 'direct'
          ? 'Herunder følger en revideret og professionel version af din tekst:'
          : toneStyle === 'formal'
          ? 'Nedenstående udgør en professionelt omskrevet version af det indsendte materiale:'
          : 'Her er en mere poleret version af din tekst — samme indhold, klarere og mere professionelt sprog:';
        return [
          `── ORIGINALTEKST ──`,
          notes,
          '',
          `── PROFESSIONEL VERSION ──`,
          '',
          intro,
          '',
          ...rewriteProfessional(notes, currentLang, toneStyle),
          '',
          '(Gennemgå og tilpas teksten efter behov — dette er et udkast.)',
        ].join('\n');
      } else {
        const intro = toneStyle === 'direct'
          ? 'Below is a revised professional version of your text:'
          : toneStyle === 'formal'
          ? 'The following is a professionally rewritten version of the submitted material:'
          : 'Here is a more polished version of your text — same content, clearer and more professional language:';
        return [
          `── ORIGINAL TEXT ──`,
          notes,
          '',
          `── PROFESSIONAL VERSION ──`,
          '',
          intro,
          '',
          ...rewriteProfessional(notes, currentLang, toneStyle),
          '',
          '(Review and adjust the text as needed — this is a draft.)',
        ].join('\n');
      }
    }

    default:
      return da
        ? 'Vælg venligst et gyldigt værktøj.'
        : 'Please select a valid tool.';
  }
}

// ── Template helpers ──────────────────────────────────────────────────────────

function buildNumberedSteps(notes, da) {
  const lines = notes.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) {
    return [da ? 'Trin 1: [Beskriv første trin]' : 'Step 1: [Describe first step]'];
  }
  return lines.map((line, i) => `${i + 1}. ${capitalizeFirst(line)}`);
}

function groupLines(lines) {
  // Simple heuristic: if a line ends with ':' or is short, treat as header
  const groups = [{ header: '', items: [] }];
  lines.forEach(line => {
    if (line.endsWith(':') && line.length < 50) {
      groups.push({ header: line.replace(/:$/, ''), items: [] });
    } else {
      groups[groups.length - 1].items.push(capitalizeFirst(line));
    }
  });
  return groups.filter(g => g.items.length > 0 || g.header);
}

function rewriteProfessional(text, lang, toneStyle) {
  const da = lang === 'da';
  const sentences = text
    .split(/[.!?\n]+/)
    .map(s => s.trim())
    .filter(Boolean);

  return sentences.map((s, i) => {
    const cap = capitalizeFirst(s);
    if (toneStyle === 'direct') return cap + (cap.endsWith('.') ? '' : '.');
    const fillers = da
      ? ['Vi ønsker at informere om, at ', 'Det skal bemærkes, at ', 'Vi kan oplyse, at ']
      : ['We would like to inform you that ', 'Please note that ', 'We can confirm that '];
    if (i === 0 && toneStyle === 'formal') {
      return fillers[0] + cap.toLowerCase() + '.';
    }
    return cap + (cap.endsWith('.') ? '' : '.');
  });
}

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── UI Rendering ──────────────────────────────────────────────────────────────

function renderTools() {
  const grid = document.getElementById('toolsGrid');
  grid.innerHTML = '';
  TOOLS.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'tool-card' + (selectedTool?.id === tool.id ? ' selected' : '');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-pressed', selectedTool?.id === tool.id ? 'true' : 'false');
    card.setAttribute('aria-label', toolTitle(tool));
    card.innerHTML = `
      <div class="tool-icon">${tool.icon}</div>
      <div class="tool-title">${toolTitle(tool)}</div>
      <div class="tool-desc">${toolDesc(tool)}</div>
    `;
    card.addEventListener('click', () => selectTool(tool));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectTool(tool); }
    });
    grid.appendChild(card);
  });
}

function renderWorkspace() {
  const ws = document.getElementById('workspace');
  if (!selectedTool) {
    ws.classList.remove('visible');
    return;
  }

  ws.classList.add('visible');

  // Header
  document.getElementById('wsToolIcon').textContent = selectedTool.icon;
  document.getElementById('wsToolTitle').textContent = toolTitle(selectedTool);

  // Notes area
  document.querySelector('.form-label[for="notesInput"]').textContent = t('notesLabel');
  document.getElementById('notesInput').placeholder = t('notesPlaceholder');

  // Optional fields
  const fields = selectedTool.fields;
  const row1 = document.getElementById('fieldRow1');
  const row2 = document.getElementById('fieldRow2');

  // Customer + company
  const customerGroup = document.getElementById('fieldCustomer');
  const companyGroup = document.getElementById('fieldCompany');
  const priceGroup = document.getElementById('fieldPrice');
  const deadlineGroup = document.getElementById('fieldDeadline');
  const toneGroup = document.getElementById('fieldTone');

  customerGroup.style.display = fields.includes('customer') ? '' : 'none';
  companyGroup.style.display = fields.includes('company') ? '' : 'none';
  priceGroup.style.display = fields.includes('price') ? '' : 'none';
  deadlineGroup.style.display = fields.includes('deadline') ? '' : 'none';
  toneGroup.style.display = fields.includes('tone') ? '' : 'none';

  // Check if any optional fields exist
  const hasOptional = fields.length > 0;
  document.getElementById('optionalFieldsSection').style.display = hasOptional ? '' : 'none';
  document.getElementById('optionalLabel').textContent = t('optionalFields');

  // Labels
  document.querySelector('.form-label[for="customerInput"]').textContent = t('customerLabel');
  document.querySelector('.form-label[for="companyInput"]').textContent = t('companyLabel');
  document.querySelector('.form-label[for="priceInput"]').textContent = t('priceLabel');
  document.querySelector('.form-label[for="deadlineInput"]').textContent = t('deadlineLabel');
  document.querySelector('.form-label[for="toneSelect"]').textContent = t('toneLabel');

  // Tone options
  const toneSelect = document.getElementById('toneSelect');
  const tones = t('tones');
  const currentVal = toneSelect.options[toneSelect.selectedIndex]?.value || tones[0];
  toneSelect.innerHTML = tones.map(tone => `<option value="${tone}">${tone}</option>`).join('');

  // Generate button
  document.getElementById('generateBtn').textContent = t('generateBtn');

  // Output labels
  document.getElementById('outputLabel').textContent = t('outputLabel');
  document.getElementById('copyBtn').textContent = `📋 ${t('copyBtn')}`;
  document.getElementById('saveBtn').textContent = `💾 ${t('saveBtn')}`;
  document.getElementById('clearBtn').textContent = `🗑 ${t('clearBtn')}`;
  document.getElementById('downloadBtn').textContent = `⬇ ${t('downloadBtn')}`;
  document.getElementById('changeToolBtn').textContent = `← ${t('changeToolBtn')}`;

  // Scroll to workspace
  ws.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderDrafts() {
  const container = document.getElementById('draftsList');
  document.getElementById('draftsLabel').textContent = t('draftsLabel');

  if (drafts.length === 0) {
    container.innerHTML = `<div class="drafts-empty">${t('draftsEmpty')}</div>`;
    return;
  }

  container.innerHTML = '';
  [...drafts].reverse().forEach((draft, ri) => {
    const i = drafts.length - 1 - ri;
    const tool = TOOLS.find(t => t.id === draft.toolId);
    const icon = tool?.icon || '📝';
    const name = currentLang === 'en' ? (tool?.titleEn || draft.toolId) : (tool?.titleDa || draft.toolId);
    const preview = draft.text.replace(/\n/g, ' ').substring(0, 90) + (draft.text.length > 90 ? '…' : '');

    const item = document.createElement('div');
    item.className = 'draft-item';
    item.innerHTML = `
      <div class="draft-icon">${icon}</div>
      <div class="draft-content">
        <div class="draft-header">
          <span class="draft-tool-name">${name}</span>
          <span class="draft-date">${formatDate(draft.ts)}</span>
        </div>
        <div class="draft-preview">${preview}</div>
      </div>
      <div class="draft-actions">
        <button class="btn btn-secondary btn-sm" onclick="openDraft(${i})">${t('openBtn')}</button>
        <button class="btn btn-success btn-sm" onclick="copyDraft(${i})">${t('copyDraftBtn')}</button>
        <button class="btn btn-danger btn-sm" onclick="deleteDraft(${i})">${t('deleteBtn')}</button>
      </div>
    `;
    container.appendChild(item);
  });
}

function updateAllText() {
  document.getElementById('appName').textContent = t('appName');
  document.getElementById('appSub').textContent = t('appSub');
  document.getElementById('introTitle').textContent = t('introTitle');
  document.getElementById('introText').textContent = t('introText');
  document.getElementById('toolsLabel').textContent = t('toolsLabel');
  renderTools();
  if (selectedTool) renderWorkspace();
  renderDrafts();
}

// ── Actions ───────────────────────────────────────────────────────────────────

function selectTool(tool) {
  selectedTool = tool;
  currentOutput = '';
  document.getElementById('outputSection').classList.remove('visible');
  renderTools();
  renderWorkspace();
}

function handleGenerate() {
  const notes = document.getElementById('notesInput').value.trim();
  if (!notes) {
    const textarea = document.getElementById('notesInput');
    textarea.classList.add('input-error');
    let errMsg = document.getElementById('notesError');
    if (!errMsg) {
      errMsg = document.createElement('p');
      errMsg.id = 'notesError';
      errMsg.className = 'error-msg';
      textarea.parentNode.insertBefore(errMsg, textarea.nextSibling);
    }
    errMsg.textContent = t('validationMsg');
    textarea.focus();
    setTimeout(() => {
      textarea.classList.remove('input-error');
      errMsg.textContent = '';
    }, 3000);
    return;
  }

  const btn = document.getElementById('generateBtn');
  btn.textContent = t('generating');
  btn.disabled = true;
  btn.classList.add('btn-loading');

  // Simulate slight delay for UX feel (remove when using real API)
  setTimeout(() => {
    const formData = {
      notes,
      customer: document.getElementById('customerInput').value.trim(),
      company: document.getElementById('companyInput').value.trim(),
      price: document.getElementById('priceInput').value.trim(),
      deadline: document.getElementById('deadlineInput').value.trim(),
      tone: document.getElementById('toneSelect').value,
    };

    currentOutput = generateDraft(selectedTool.id, formData);

    document.getElementById('outputBox').textContent = currentOutput;
    document.getElementById('outputSection').classList.add('visible');
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth', block: 'start' });

    btn.textContent = t('generateBtn');
    btn.disabled = false;
    btn.classList.remove('btn-loading');
  }, 380);
}

function copyOutput() {
  if (!currentOutput) return;
  navigator.clipboard.writeText(currentOutput).then(() => {
    showToast(t('copiedMsg'), 'success');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = currentOutput;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(t('copiedMsg'), 'success');
  });
}

function saveDraft() {
  if (!currentOutput || !selectedTool) return;
  drafts.push({
    toolId: selectedTool.id,
    text: currentOutput,
    ts: Date.now(),
  });
  saveDraftsToStorage();
  renderDrafts();
  showToast(t('savedMsg'), 'success');
}

function clearOutput() {
  if (!currentOutput) return;
  if (!confirm(t('clearConfirm'))) return;
  currentOutput = '';
  document.getElementById('outputBox').textContent = '';
  document.getElementById('outputSection').classList.remove('visible');
}

function downloadOutput() {
  if (!currentOutput) return;
  const filename = (toolTitle(selectedTool) || 'udkast').replace(/[^a-zA-Z0-9æøå]/gi, '_') + '_' + Date.now() + '.txt';
  const blob = new Blob([currentOutput], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function openDraft(i) {
  const draft = drafts[i];
  if (!draft) return;
  const tool = TOOLS.find(t => t.id === draft.toolId);
  if (tool) { selectedTool = tool; renderTools(); renderWorkspace(); }
  currentOutput = draft.text;
  document.getElementById('outputBox').textContent = currentOutput;
  document.getElementById('outputSection').classList.add('visible');
  document.getElementById('workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function copyDraft(i) {
  const draft = drafts[i];
  if (!draft) return;
  navigator.clipboard.writeText(draft.text).then(() => {
    showToast(t('copiedMsg'), 'success');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = draft.text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(t('copiedMsg'), 'success');
  });
}

function deleteDraft(i) {
  drafts.splice(i, 1);
  saveDraftsToStorage();
  renderDrafts();
  showToast(t('deletedMsg'));
}

function changeTool() {
  selectedTool = null;
  currentOutput = '';
  document.getElementById('workspace').classList.remove('visible');
  document.getElementById('outputSection').classList.remove('visible');
  renderTools();
  document.getElementById('toolsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('smv_lang', lang);
  updateAllText();
}

// ── Notes character counter ───────────────────────────────────────────────────

function updateCharCount() {
  const ta = document.getElementById('notesInput');
  const counter = document.getElementById('charCount');
  const len = ta.value.length;
  counter.textContent = `${len} ${currentLang === 'da' ? 'tegn' : 'characters'}`;
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  loadDrafts();

  const savedLang = localStorage.getItem('smv_lang');
  if (savedLang && (savedLang === 'da' || savedLang === 'en')) {
    currentLang = savedLang;
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  document.getElementById('generateBtn').addEventListener('click', handleGenerate);
  document.getElementById('copyBtn').addEventListener('click', copyOutput);
  document.getElementById('saveBtn').addEventListener('click', saveDraft);
  document.getElementById('clearBtn').addEventListener('click', clearOutput);
  document.getElementById('downloadBtn').addEventListener('click', downloadOutput);
  document.getElementById('changeToolBtn').addEventListener('click', changeTool);
  document.getElementById('notesInput').addEventListener('input', updateCharCount);

  document.getElementById('notesInput').addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') handleGenerate();
  });

  updateAllText();
  renderDrafts();
}

document.addEventListener('DOMContentLoaded', init);
