/* ============================================
   SMV Kontorhjælper — app.js v2
   ============================================ */

// ── Language strings ──────────────────────────────────────────────────────────

const LANG = {
  da: {
    appName: 'SMV Kontorhjælper',
    appSub: 'Praktiske tekster og skabeloner til små virksomheder',
    introTitle: 'Klar til at spare tid?',
    introText: 'Indsæt dine rå noter, vælg hvad du vil lave, og få et brugbart udkast med det samme.',
    toolsLabel: 'Vælg et værktøj',
    notesLabel: 'Dine rå noter',
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
    optionalFields: 'Ekstra felter (valgfrit)',
    tipLabel: 'Tip:',
  },
  en: {
    appName: 'SMV Office Helper',
    appSub: 'Practical texts and templates for small businesses',
    introTitle: 'Ready to save time?',
    introText: 'Enter your rough notes, choose what you need, and get a usable draft immediately.',
    toolsLabel: 'Choose a tool',
    notesLabel: 'Your rough notes',
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
    optionalFields: 'Extra fields (optional)',
    tipLabel: 'Tip:',
  }
};

// ── Tool definitions ──────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: 'kundemail',
    icon: '✉️',
    titleDa: 'Kundemail',
    titleEn: 'Customer Email',
    descDa: 'Gør rå noter til en høflig professionel mail',
    descEn: 'Turn rough notes into a polite professional email',
    hintDa: 'F.eks: kundens forespørgsel om pris på hjemmeside. vi tilbyder design og vedligehold. pris ca 15.000 kr. vi sender tilbud inden for 2 dage',
    hintEn: 'E.g: customer asked about website price. we offer design and maintenance. price approx 15,000. we will send quote within 2 days',
    fields: ['customer', 'company', 'tone'],
  },
  {
    id: 'tilbud',
    icon: '📋',
    titleDa: 'Tilbudstekst',
    titleEn: 'Quotation Text',
    descDa: 'Lav en struktureret tilbudstekst fra dine noter',
    descEn: 'Create a structured quotation from your notes',
    hintDa: 'F.eks: nyt tag på villa. fjerne gammelt tag, montere nyt tegltag, inkl. rygning og inddækning. arbejde tager ca 3 dage. stillas inkluderet',
    hintEn: 'E.g: new roof on house. remove old tiles, fit new clay roof, incl. ridge and flashing. work takes approx 3 days. scaffolding included',
    fields: ['customer', 'company', 'price', 'deadline', 'tone'],
  },
  {
    id: 'rykker',
    icon: '🔔',
    titleDa: 'Rykkermail',
    titleEn: 'Payment Reminder',
    descDa: 'Høflig betalingspåmindelse uden at lyde aggressiv',
    descEn: 'Polite payment reminder without sounding aggressive',
    hintDa: 'F.eks: faktura 2024-047 sendt 15. april. beløb 8.500 kr. ikke modtaget betaling endnu. anden rykker. betalingsfrist var 30 dage',
    hintEn: 'E.g: invoice 2024-047 sent April 15th. amount 8,500. no payment received yet. second reminder. payment terms were 30 days',
    fields: ['customer', 'company', 'price', 'deadline', 'tone'],
  },
  {
    id: 'facebook',
    icon: '📣',
    titleDa: 'Facebook-opslag',
    titleEn: 'Facebook Post',
    descDa: 'Lokalt opslag til din virksomhedsside',
    descEn: 'Local post for your business page',
    hintDa: 'F.eks: sommertilbud på vinduespudsning. 20% rabat hele juli. gratis tilbud på stedet. betjener hele nordsjælland',
    hintEn: 'E.g: summer offer on window cleaning. 20% discount all of July. free quote on site. serving all of north zealand',
    fields: ['company', 'tone'],
  },
  {
    id: 'sop',
    icon: '📄',
    titleDa: 'SOP / Arbejdsinstruktion',
    titleEn: 'SOP / Work Instruction',
    descDa: 'Struktureret arbejdsinstruktion fra dine noter',
    descEn: 'Structured work instruction from your notes',
    hintDa: 'F.eks: modtagelse af varer. kontroller antal mod følgeseddel. registrer i lager-system. afvigelser meldes til leder. varer sættes i reol A-C efter kategori',
    hintEn: 'E.g: receiving goods. check quantity against delivery note. register in stock system. deviations reported to manager. goods placed on shelf A-C by category',
    fields: ['company'],
  },
  {
    id: 'tjekliste',
    icon: '✅',
    titleDa: 'Tjekliste',
    titleEn: 'Checklist',
    descDa: 'Gør noter til en praktisk tjekliste',
    descEn: 'Turn notes into a practical checklist',
    hintDa: 'F.eks: åbning af butik:\nnøgler og alarm\nkasse tænd\nvarmer tænd\nkaffemaskine\nfacebook opslag\nhent post\nflyt borde ud',
    hintEn: 'E.g: opening the shop:\nkeys and alarm\ncash register on\nheating on\ncoffee machine\nfacebook post\ncollect mail\nmove tables outside',
    fields: [],
  },
  {
    id: 'onboarding',
    icon: '👋',
    titleDa: 'Medarbejder-onboarding',
    titleEn: 'Employee Onboarding',
    descDa: 'Onboardingplan for en ny medarbejder',
    descEn: 'Onboarding plan for a new employee',
    hintDa: 'F.eks: ny elektriker. skal lære vores sagsstyringssystem. introduceres til faste kunder. sikkerhedskursus uge 2. kørekort klasse B nødvendigt',
    hintEn: 'E.g: new electrician. needs to learn our case management system. introduce to regular customers. safety course week 2. class B driving license required',
    fields: ['customer', 'company', 'deadline'],
  },
  {
    id: 'professionel',
    icon: '✨',
    titleDa: 'Gør tekst professionel',
    titleEn: 'Make Text Professional',
    descDa: 'Omskriv rodet tekst til professionelt sprog',
    descEn: 'Rewrite messy text into professional language',
    hintDa: 'Indsæt din ufærdige tekst her — stikord, halvfærdige sætninger eller bare noget du vil have til at lyde mere professionelt.',
    hintEn: 'Paste your unfinished text here — bullet points, half-finished sentences, or anything you want to sound more professional.',
    fields: ['tone'],
  },
];

// ── Word replacement dictionaries ─────────────────────────────────────────────

const WORD_REPLACEMENTS = {
  da: [
    [/\bbare\b/gi, 'blot'],
    [/\blige\b(?= \w)/gi, 'venligst'],
    [/\bprøv(e|er|ede)?\b/gi, (_, s) => 'bestræb' + (s === 'er' ? 'er sig' : s === 'ede' ? 'ede sig' : ' dig')],
    [/\bproblem(et|er|erne)?\b/gi, (_, s) => 'udfordring' + (s || '')],
    [/\bting(ene)?\b/gi, (_, s) => 'forhold' + (s ? 'ene' : 'et')],
    [/\bhurtigt\b/gi, 'rettidigt'],
    [/\bsnart\b/gi, 'inden for kort tid'],
    [/\bmeget\b/gi, 'særdeles'],
    [/\bret\b(?= [a-zæøå])/gi, 'temmelig'],
    [/\bkigge\b|\bkigger\b|\bkiggede\b/gi, 'gennemgå'],
    [/\bfortælle\b|\bfortæller\b/gi, 'informere'],
    [/\bsige til\b/gi, 'meddele'],
    [/\bbruge(r|s|de)?\b/gi, (_, s) => 'anvende' + (s || '')],
    [/\blave(r|de|t)?\b/gi, 'udarbejde'],
    [/\bgøre\b|\bgør\b/gi, 'foretage'],
    [/\bhjælp(e|er)?\b/gi, 'assistere'],
    [/\bvise\b|\bviser\b/gi, 'demonstrere'],
    [/\btale med\b/gi, 'kommunikere med'],
    [/\bsende\b|\bsender\b/gi, 'fremsende'],
    [/\bfå\b(?= \w)/gi, 'modtage'],
    [/\bgive\b|\bgiver\b/gi, 'tilvejebringe'],
    [/\bokay\b|\bok\b/gi, 'i orden'],
    [/\bfed\b(?= [a-zæøå]|\.|,|!|\?)/gi, 'fremragende'],
    [/\bsuper\b(?= [a-zæøå])/gi, 'særdeles'],
    [/\bdårlig(t|e)?\b/gi, (_, s) => 'utilfredsstillende' + (s || '')],
    [/\bbillig(t|e)?\b/gi, (_, s) => 'prisvenlig' + (s || '')],
    [/\bstarte\b|\bstarter\b/gi, 'igangsætte'],
    [/\bafslutte\b|\bafslutter\b/gi, 'færdiggøre'],
    [/\bkøbe\b|\bkøber\b/gi, 'erhverve'],
    [/\bsælge\b|\bsælger\b/gi, 'udbyde'],
    [/\bspørge\b|\bspørger\b/gi, 'forespørge'],
    [/\bringe\b|\bringer\b/gi, 'kontakte telefonisk'],
    [/\bskrive\b|\bskriver\b/gi, 'fremsende skriftligt'],
  ],
  en: [
    [/\bjust\b/gi, 'simply'],
    [/\bpretty\b(?= [a-z])/gi, 'rather'],
    [/\bstuff\b/gi, 'matters'],
    [/\bthings\b/gi, 'matters'],
    [/\bproblem(s)?\b/gi, (_, s) => 'challenge' + (s || '')],
    [/\btry\b/gi, 'endeavour'],
    [/\buse\b/gi, 'utilise'],
    [/\bshow\b/gi, 'demonstrate'],
    [/\bfix\b/gi, 'resolve'],
    [/\bstart\b/gi, 'commence'],
    [/\bend\b(?= |\.|,)/gi, 'conclude'],
    [/\bbuy\b/gi, 'acquire'],
    [/\bsell\b/gi, 'offer'],
    [/\btell\b/gi, 'inform'],
    [/\bhelp\b/gi, 'assist'],
    [/\bask\b/gi, 'enquire'],
    [/\bsend\b/gi, 'forward'],
    [/\bcheck\b/gi, 'review'],
    [/\bget\b(?= \w)/gi, 'obtain'],
    [/\blook at\b/gi, 'review'],
    [/\bquickly\b/gi, 'promptly'],
    [/\bsoon\b/gi, 'at the earliest opportunity'],
    [/\bbig\b/gi, 'substantial'],
    [/\bsmall\b/gi, 'limited'],
    [/\bgood\b/gi, 'satisfactory'],
    [/\bbad\b/gi, 'unsatisfactory'],
    [/\bcheap\b/gi, 'cost-effective'],
    [/\bokay\b|\bok\b/gi, 'acceptable'],
    [/\bcool\b/gi, 'excellent'],
    [/\bnice\b/gi, 'commendable'],
    [/\bstuff\b/gi, 'material'],
    [/\bkind of\b/gi, 'somewhat'],
  ]
};

// ── State ─────────────────────────────────────────────────────────────────────

let currentLang = 'da';
let selectedTool = null;
let currentOutput = '';
let drafts = [];

// ── Core helpers ──────────────────────────────────────────────────────────────

function t(key) {
  return LANG[currentLang][key] || LANG['da'][key] || key;
}

function toolTitle(tool) {
  return currentLang === 'en' ? tool.titleEn : tool.titleDa;
}

function toolDesc(tool) {
  return currentLang === 'en' ? tool.descEn : tool.descDa;
}

function toolHint(tool) {
  return currentLang === 'en' ? tool.hintEn : tool.hintDa;
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

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Note processing ───────────────────────────────────────────────────────────

// Splits raw notes into a clean array of sentences/items
function processNotes(notes) {
  return notes
    .split(/[\n\r]/)
    .flatMap(line => line.split(/(?<=[.!?])\s+/))
    .map(s => s.replace(/^[-–•*\d.)>\s]+/, '').trim())
    .filter(s => s.length > 2)
    .map(s => {
      s = capitalizeFirst(s.trim());
      if (!/[.!?:,]$/.test(s)) s += '.';
      return s;
    });
}

// Joins sentences into a flowing paragraph with connectors
function buildParagraph(sentences, lang, toneStyle) {
  if (!sentences || sentences.length === 0) return '';
  if (sentences.length === 1) return sentences[0];

  const connectors = lang === 'da'
    ? toneStyle === 'direct'
      ? ['Desuden: ', 'Hertil: ', 'Endvidere: ']
      : ['Derudover ', 'Vi skal hertil tilføje, at ', 'Vi kan ligeledes bekræfte, at ', 'I forlængelse heraf ']
    : toneStyle === 'direct'
      ? ['Additionally: ', 'Furthermore: ', 'Also: ']
      : ['Furthermore, ', 'We would also like to add that ', 'We can also confirm that ', 'In addition, '];

  return sentences.map((s, i) => {
    if (i === 0) return s;
    const connector = connectors[(i - 1) % connectors.length];
    // Lowercase first letter after connector if it's a full word connector
    if (connector.endsWith(' ') && !connector.endsWith(': ')) {
      return connector + s.charAt(0).toLowerCase() + s.slice(1);
    }
    return connector + s;
  }).join(' ');
}

// Converts sentences to bullet points
function notesToBullets(sentences) {
  return sentences.map(s => `• ${s}`).join('\n');
}

// Converts sentences to numbered steps
function notesToSteps(sentences, lang) {
  const da = lang === 'da';
  if (sentences.length === 0) {
    return [da ? '1. [Beskriv første trin]' : '1. [Describe first step]'];
  }
  return sentences.map((s, i) => `${i + 1}. ${s}`);
}

// ── Professional text rewriter ────────────────────────────────────────────────

function applyWordReplacements(text, lang) {
  const replacements = WORD_REPLACEMENTS[lang] || [];
  let result = text;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function rewriteSentenceProfessionally(sentence, lang, toneStyle) {
  let s = sentence.trim();
  if (!s) return s;

  // Apply word-level replacements
  s = applyWordReplacements(s, lang);

  // Ensure proper ending
  if (!/[.!?]$/.test(s)) s += '.';

  // Formal sentence starters for formal tone
  if (toneStyle === 'formal') {
    const startersDa = [
      'Vi ønsker at informere om, at ',
      'Det skal bemærkes, at ',
      'Vi kan bekræfte, at ',
      'Vi henleder opmærksomheden på, at ',
    ];
    const startersEn = [
      'We would like to inform you that ',
      'Please note that ',
      'We can confirm that ',
      'We draw your attention to the fact that ',
    ];
    const starters = lang === 'da' ? startersDa : startersEn;
    // Only add a formal starter to some sentences, not all
    if (Math.random() > 0.5 && s.length < 120) {
      const starter = randomPick(starters);
      s = starter + s.charAt(0).toLowerCase() + s.slice(1);
    }
  }

  return capitalizeFirst(s);
}

// ── Template generators ───────────────────────────────────────────────────────
// NOTE: Replace generateDraft() content with a real AI API call when ready.

function generateDraft(toolId, formData) {
  /* ── FUTURE AI HOOK ────────────────────────────────────────────────────────
     Replace the switch block below with an API call, e.g.:

     const response = await fetch('/api/generate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ tool: toolId, lang: currentLang, ...formData })
     });
     const { text } = await response.json();
     return text;

     For Claude API (claude-sonnet-4-6) via Vercel/Netlify serverless function:
     Pass tool, notes, lang, tone, and optional fields to your proxy endpoint.
  ──────────────────────────────────────────────────────────────────────────── */

  const { notes, customer, company, price, deadline, tone } = formData;
  const da = currentLang === 'da';

  const toneStyle = tone === t('tones')[2] ? 'direct'
    : tone === t('tones')[1] ? 'formal'
    : 'friendly';

  const sentences = processNotes(notes);
  const bodyParagraph = buildParagraph(sentences, currentLang, toneStyle);

  switch (toolId) {

    // ── 1. Kundemail ──────────────────────────────────────────────────────
    case 'kundemail': {
      const greeting = customer
        ? (da ? `Kære ${customer},` : `Dear ${customer},`)
        : (da ? 'Kære kunde,' : 'Dear customer,');

      const openers = da ? {
        friendly: [
          'Mange tak for din henvendelse — det var en fornøjelse at høre fra dig.',
          'Tak for din mail. Vi sætter stor pris på din interesse.',
          'Mange tak for, at du kontaktede os. Vi er glade for at høre fra dig.',
        ],
        formal: [
          'Vi bekræfter hermed modtagelsen af din henvendelse og takker for din interesse.',
          'Vi har modtaget din forespørgsel og vender tilbage med det samme.',
          'Tak for din henvendelse. Vi behandler den med høj prioritet.',
        ],
        direct: [
          'Tak for din henvendelse.',
          'Vi har modtaget din besked.',
          'Tak for din mail.',
        ],
      } : {
        friendly: [
          'Thank you for reaching out — it\'s great to hear from you.',
          'Thank you for your message. We really appreciate your interest.',
          'Many thanks for contacting us. We\'re happy to hear from you.',
        ],
        formal: [
          'We hereby confirm receipt of your enquiry and thank you for your interest.',
          'We have received your request and will respond promptly.',
          'Thank you for your enquiry. We are treating it with high priority.',
        ],
        direct: [
          'Thank you for your enquiry.',
          'We have received your message.',
          'Thank you for your email.',
        ],
      };

      const closers = da ? {
        friendly: 'Tøv endelig ikke med at kontakte os, hvis du har spørgsmål eller ønsker at høre mere. Vi glæder os til at hjælpe dig videre.',
        formal: 'Vi ser frem til et godt samarbejde og vender tilbage hurtigst muligt med yderligere information, såfremt det måtte ønskes.',
        direct: 'Kontakt os, hvis du har spørgsmål. Vi vender hurtigt tilbage.',
      } : {
        friendly: 'Please don\'t hesitate to reach out if you have any questions or would like to know more. We look forward to helping you.',
        formal: 'We look forward to a productive collaboration and will provide further information upon request at the earliest opportunity.',
        direct: 'Contact us if you have any questions. We will respond promptly.',
      };

      const sign = company || (da ? '[Virksomhedsnavn]' : '[Company name]');

      return [
        greeting,
        '',
        randomPick(openers[toneStyle]),
        '',
        bodyParagraph,
        '',
        closers[toneStyle],
        '',
        da ? 'Med venlig hilsen' : 'Kind regards,',
        sign,
      ].join('\n');
    }

    // ── 2. Tilbudstekst ───────────────────────────────────────────────────
    case 'tilbud': {
      const sign = company || (da ? '[Virksomhedsnavn]' : '[Company name]');

      const introLines = da ? [
        `Vi takker for muligheden for at afgive tilbud og fremsender hermed vores tilbud på den ønskede opgave.`,
        `Med reference til din forespørgsel fremsender vi hermed vores tilbud.`,
        `Vi er glade for at kunne fremsende følgende tilbud til dig.`,
      ] : [
        `Thank you for the opportunity to submit a quotation. Please find our offer below.`,
        `With reference to your enquiry, we are pleased to submit the following quotation.`,
        `We are glad to present the following offer for the requested work.`,
      ];

      const scopeLines = sentences.map(s => `  • ${s}`);

      const terms = da ? [
        price ? `Pris: ${price} (ekskl. moms)` : '• Pris aftales nærmere efter godkendelse',
        deadline ? `Tilbuddet er gyldigt til: ${deadline}` : '• Tilbud er gyldigt i 30 dage fra dags dato',
        '• Eventuelle tillægsopgaver aftales og faktureres særskilt',
        '• Arbejdet igangsættes efter skriftlig accept',
        '• Betaling: 8 dage netto efter fakturadato',
      ] : [
        price ? `Price: ${price} (excl. VAT)` : '• Price to be agreed after approval',
        deadline ? `Quotation valid until: ${deadline}` : '• Quotation valid for 30 days from today',
        '• Any additional work will be agreed and invoiced separately',
        '• Work commences upon written acceptance',
        '• Payment: net 8 days from invoice date',
      ];

      const outro = da ? {
        friendly: 'Vi håber, at ovenstående lever op til dine forventninger. Kontakt os gerne, hvis du har spørgsmål eller ønsker justeringer — vi finder altid en god løsning.',
        formal: 'Vi fremsender gerne yderligere dokumentation eller afholder et møde for at gennemgå tilbuddet i detaljer.',
        direct: `Bekræft venligst tilbuddet${deadline ? ' inden ' + deadline : ' hurtigst muligt'}.`,
      } : {
        friendly: 'We hope this quotation meets your expectations. Feel free to reach out if you have questions or would like any adjustments.',
        formal: 'We are happy to provide further documentation or arrange a meeting to review the quotation in detail.',
        direct: `Please confirm the quotation${deadline ? ' by ' + deadline : ' as soon as possible'}.`,
      };

      return [
        da ? `TILBUD${company ? ' — ' + company.toUpperCase() : ''}` : `QUOTATION${company ? ' — ' + company.toUpperCase() : ''}`,
        da ? `Dato: ${today()}` : `Date: ${today()}`,
        customer ? (da ? `Att.: ${customer}` : `Att.: ${customer}`) : '',
        '',
        '══════════════════════════════════════',
        da ? 'OPGAVEBESKRIVELSE' : 'SCOPE OF WORK',
        '══════════════════════════════════════',
        '',
        randomPick(introLines),
        '',
        da ? 'Opgaven omfatter:' : 'The work includes:',
        ...scopeLines,
        '',
        '══════════════════════════════════════',
        da ? 'BETINGELSER' : 'TERMS',
        '══════════════════════════════════════',
        '',
        ...terms,
        '',
        '══════════════════════════════════════',
        '',
        outro[toneStyle],
        '',
        da ? 'Med venlig hilsen' : 'Kind regards,',
        sign,
      ].filter(l => l !== '').join('\n');
    }

    // ── 3. Rykkermail ─────────────────────────────────────────────────────
    case 'rykker': {
      const greeting = customer
        ? (da ? `Kære ${customer},` : `Dear ${customer},`)
        : (da ? 'Kære kunde,' : 'Dear customer,');

      const sign = company || (da ? '[Virksomhedsnavn]' : '[Company name]');

      // Try to detect invoice number from notes
      const invoiceMatch = notes.match(/(?:faktura|invoice|fakt\.?|inv\.?)\s*[#nr.]*\s*([\w-]+)/i);
      const invoiceRef = invoiceMatch ? invoiceMatch[1] : null;

      const priceStr = price
        ? (da ? ` på kr. ${price}` : ` for ${price}`)
        : '';
      const invoiceStr = invoiceRef
        ? (da ? ` (faktura ${invoiceRef})` : ` (invoice ${invoiceRef})`)
        : '';
      const dueStr = deadline
        ? (da ? ` med forfaldsdato ${deadline}` : ` with a due date of ${deadline}`)
        : '';

      const openers = da ? {
        friendly: `Vi tillader os venligst at minde dig om en udestående betaling${priceStr}${invoiceStr}${dueStr}.`,
        formal: `I henhold til vores betalingsbetingelser henleder vi opmærksomheden på en forfalden betaling${priceStr}${invoiceStr}${dueStr}.`,
        direct: `Vi rykker hermed for betaling${priceStr}${invoiceStr}${dueStr}.`,
      } : {
        friendly: `We kindly remind you of an outstanding payment${priceStr}${invoiceStr}${dueStr}.`,
        formal: `In accordance with our payment terms, we draw your attention to an overdue payment${priceStr}${invoiceStr}${dueStr}.`,
        direct: `We hereby chase payment${priceStr}${invoiceStr}${dueStr}.`,
      };

      const extras = sentences.filter(s => !s.toLowerCase().includes('faktura') && !s.toLowerCase().includes('invoice'));
      const extraPara = extras.length > 0 ? buildParagraph(extras, currentLang, toneStyle) : '';

      const closers = da ? {
        friendly: 'Hvis betalingen allerede er afsendt, beder vi dig venligst se bort fra denne påmindelse. Kontakt os endelig, hvis der er spørgsmål til fakturaen — vi finder gerne en løsning.',
        formal: 'Såfremt betalingen allerede er effektueret, bedes dette meddeles. I modsat fald beder vi om betaling inden for 5 hverdage.',
        direct: 'Overførsel bedes foretaget snarest. Kontakt os ved spørgsmål.',
      } : {
        friendly: 'If payment has already been sent, please disregard this reminder. Feel free to contact us if you have any questions about the invoice — we\'re happy to find a solution.',
        formal: 'If payment has already been made, please notify us accordingly. Otherwise, we kindly request payment within 5 business days.',
        direct: 'Please arrange payment immediately. Contact us if you have questions.',
      };

      return [
        greeting,
        '',
        openers[toneStyle],
        '',
        extraPara || '',
        extraPara ? '' : null,
        closers[toneStyle],
        '',
        da ? 'Med venlig hilsen' : 'Kind regards,',
        sign,
      ].filter(l => l !== null).join('\n');
    }

    // ── 4. Facebook-opslag ────────────────────────────────────────────────
    case 'facebook': {
      const co = company || (da ? 'os' : 'us');
      const coNamed = company || (da ? 'Vi' : 'We');

      // Build an engaging hook from the first sentence
      const hook = sentences[0] || notes.split('\n')[0];
      const body = sentences.slice(1);

      const hooks = da ? {
        friendly: [`🔥 ${hook}`, `✨ ${hook}`, `👉 ${hook}`],
        formal: [`${coNamed} er glade for at kunne tilbyde: ${hook.toLowerCase().replace(/\.$/, '')}`, `Ny mulighed hos ${co}: ${hook}`],
        direct: [`${hook}`],
      } : {
        friendly: [`🔥 ${hook}`, `✨ ${hook}`, `👉 ${hook}`],
        formal: [`${coNamed} is pleased to offer: ${hook.toLowerCase().replace(/\.$/, '')}`, `New opportunity at ${co}: ${hook}`],
        direct: [`${hook}`],
      };

      const bodyText = body.length > 0
        ? buildParagraph(body, currentLang, toneStyle)
        : '';

      const ctas = da ? {
        friendly: [`Skriv til os i dag — vi er klar til at hjælpe! 😊`, `Ring eller skriv til os — vi glæder os til at høre fra dig! 📞`, `Book tid hos ${co} allerede i dag — det er nemt og uforpligtende! 👇`],
        formal: [`Kontakt ${co} for yderligere information.`, `Vi besvarer gerne henvendelser om ovenstående.`],
        direct: [`Kontakt os nu. 👇`, `Ring eller skriv i dag.`],
      } : {
        friendly: [`Message us today — we\'re ready to help! 😊`, `Call or message us — we\'d love to hear from you! 📞`, `Book with ${co} today — easy and no obligation! 👇`],
        formal: [`Contact ${co} for further information.`, `We are happy to respond to enquiries about the above.`],
        direct: [`Contact us now. 👇`, `Call or write today.`],
      };

      // Generate relevant hashtags from content keywords
      const allText = notes.toLowerCase();
      const hashtagsDa = ['#lokalterhvervsliv', '#småvirksomheder'];
      const hashtagsEn = ['#localbusiness', '#smallbusiness'];
      if (company) {
        const tag = '#' + company.replace(/[\s\W]+/g, '');
        if (da) hashtagsDa.push(tag); else hashtagsEn.push(tag);
      }
      const hashtags = da ? hashtagsDa : hashtagsEn;

      return [
        randomPick(hooks[toneStyle]),
        '',
        bodyText || '',
        bodyText ? '' : null,
        randomPick(ctas[toneStyle]),
        '',
        `📍 ${company || (da ? '[Bynavn]' : '[City]')}`,
        `📞 ${da ? '[Tlf. nummer]' : '[Phone number]'}`,
        `🌐 ${da ? '[Hjemmeside]' : '[Website]'}`,
        '',
        hashtags.join(' '),
      ].filter(l => l !== null).join('\n');
    }

    // ── 5. SOP / Arbejdsinstruktion ───────────────────────────────────────
    case 'sop': {
      const title = sentences[0]
        ? sentences[0].replace(/\.$/, '')
        : (da ? 'Arbejdsinstruktion' : 'Work Instruction');
      const steps = notesToSteps(sentences, currentLang);

      // Flag sentences with safety/quality keywords
      const stepsFormatted = steps.map(step => {
        const lower = step.toLowerCase();
        const isSafety = /sikker|advar|pas på|forbudt|obs|vigtigt|safety|warning|caution|important|forbidden/i.test(lower);
        return isSafety ? step + (da ? '  ⚠️ Vigtigt!' : '  ⚠️ Important!') : step;
      });

      return [
        da ? 'STANDARD ARBEJDSINSTRUKTION (SOP)' : 'STANDARD OPERATING PROCEDURE (SOP)',
        company ? (da ? `Virksomhed: ${company}` : `Company: ${company}`) : '',
        da ? `Dato: ${today()}  |  Version: 1.0` : `Date: ${today()}  |  Version: 1.0`,
        '',
        '══════════════════════════════════════',
        da ? '1. FORMÅL' : '1. PURPOSE',
        '══════════════════════════════════════',
        da
          ? `Denne instruktion beskriver den korrekte fremgangsmåde for: ${title.toLowerCase()}.`
          : `This instruction describes the correct procedure for: ${title.toLowerCase()}.`,
        '',
        '══════════════════════════════════════',
        da ? '2. ANSVARSFORDELING' : '2. RESPONSIBILITIES',
        '══════════════════════════════════════',
        da ? '• Ansvarlig for udførelse:  [Navn / stilling]' : '• Responsible for execution:  [Name / position]',
        da ? '• Godkendt af:              [Leder / navn]' : '• Approved by:              [Manager / name]',
        da ? '• Gælder for:               [Afdeling / alle]' : '• Applies to:               [Department / all]',
        '',
        '══════════════════════════════════════',
        da ? '3. FREMGANGSMÅDE' : '3. PROCEDURE',
        '══════════════════════════════════════',
        '',
        ...stepsFormatted,
        '',
        '══════════════════════════════════════',
        da ? '4. KVALITET OG SIKKERHED' : '4. QUALITY & SAFETY',
        '══════════════════════════════════════',
        da ? '• Kontrollér resultatet, inden opgaven afleveres' : '• Verify the result before handing over the task',
        da ? '• Overhold gældende sikkerhedsforskrifter og arbejdsmiljøregler' : '• Follow applicable safety and work environment regulations',
        da ? '• Rapportér straks afvigelser til nærmeste leder' : '• Report deviations immediately to the nearest manager',
        da ? '• Brug altid godkendt udstyr og materialer' : '• Always use approved equipment and materials',
        '',
        '══════════════════════════════════════',
        da ? '5. AFSLUTNINGSKONTROL' : '5. COMPLETION CHECKLIST',
        '══════════════════════════════════════',
        da ? '[ ] Opgaven er udført korrekt og kontrolleret' : '[ ] Task completed correctly and verified',
        da ? '[ ] Arbejdsplads efterladt i ordentlig stand' : '[ ] Workplace left in proper condition',
        da ? '[ ] Afvigelser registreret (hvis relevant)' : '[ ] Deviations recorded (if applicable)',
        da ? '[ ] Næste ansvarlige informeret' : '[ ] Next responsible person informed',
        da ? '[ ] Dokumentation udfyldt og arkiveret' : '[ ] Documentation completed and filed',
      ].filter(l => l !== '').join('\n');
    }

    // ── 6. Tjekliste ──────────────────────────────────────────────────────
    case 'tjekliste': {
      const rawLines = notes.split('\n').map(l => l.replace(/^[-–•*\d.)>\s]+/, '').trim()).filter(Boolean);
      const groups = [];
      let currentGroup = { header: '', items: [] };

      rawLines.forEach(line => {
        // Line ending with ':' or matching all-caps short text = section header
        if ((line.endsWith(':') && line.length < 60) || /^[A-ZÆØÅ\s]{3,30}$/.test(line)) {
          if (currentGroup.items.length > 0 || currentGroup.header) {
            groups.push(currentGroup);
          }
          currentGroup = { header: line.replace(/:$/, ''), items: [] };
        } else {
          currentGroup.items.push(capitalizeFirst(line));
        }
      });
      if (currentGroup.items.length > 0) groups.push(currentGroup);

      const totalItems = rawLines.filter(l => !l.endsWith(':') && !/^[A-ZÆØÅ\s]{3,30}$/.test(l)).length;

      const out = [
        da ? 'TJEKLISTE' : 'CHECKLIST',
        da ? `Oprettet: ${today()}` : `Created: ${today()}`,
        da ? `Samlet antal punkter: ${totalItems}` : `Total items: ${totalItems}`,
        '',
      ];

      if (groups.length === 0 || (groups.length === 1 && !groups[0].header)) {
        // No grouping — simple flat list
        const items = groups[0]?.items || [];
        items.forEach(item => out.push(`[ ] ${item}`));
      } else {
        groups.forEach(g => {
          if (g.header) {
            out.push('');
            out.push(`▸ ${g.header.toUpperCase()}`);
          }
          g.items.forEach(item => out.push(`[ ] ${item}`));
        });
      }

      out.push('');
      out.push('─────────────────────────────');
      out.push(da ? `Afkrydsede punkter: ___ / ${totalItems}` : `Checked items: ___ / ${totalItems}`);

      return out.join('\n');
    }

    // ── 7. Medarbejder-onboarding ─────────────────────────────────────────
    case 'onboarding': {
      const emp = customer || (da ? 'den nye medarbejder' : 'the new employee');
      const co = company || (da ? '[Virksomhedsnavn]' : '[Company name]');
      const startDate = deadline || (da ? '[indsæt startdato]' : '[insert start date]');

      // Sort notes into onboarding phases if possible
      const practicalNotes = sentences.filter(s =>
        /system|adgang|login|kode|kort|nøgle|bil|telefon|pc|computer|access|key|phone|car|password/i.test(s)
      );
      const trainingNotes = sentences.filter(s =>
        /kursus|oplæring|træning|lær|certificer|uddannelse|training|course|learn|certif/i.test(s)
      );
      const taskNotes = sentences.filter(s =>
        !practicalNotes.includes(s) && !trainingNotes.includes(s)
      );

      return [
        da ? 'ONBOARDINGPLAN' : 'ONBOARDING PLAN',
        da ? `Medarbejder: ${emp}` : `Employee: ${emp}`,
        da ? `Virksomhed: ${co}` : `Company: ${co}`,
        da ? `Startdato: ${startDate}` : `Start date: ${startDate}`,
        da ? `Udarbejdet: ${today()}` : `Created: ${today()}`,
        '',
        '══════════════════════════════════════',
        da ? 'DAG 1 — VELKOMMEN' : 'DAY 1 — WELCOME',
        '══════════════════════════════════════',
        da ? `[ ] Velkomst og introduktion hos ${co}` : `[ ] Welcome and introduction at ${co}`,
        da ? '[ ] Rundvisning på arbejdspladsen' : '[ ] Tour of the workplace',
        da ? '[ ] Præsentation for kollegerne' : '[ ] Introduction to colleagues',
        da ? '[ ] Gennemgang af praktiske regler og politikker' : '[ ] Overview of practical rules and policies',
        da ? `[ ] Remis: ${emp} introduceres til sin primære kontaktperson` : `[ ] Note: ${emp} is introduced to their primary contact`,
        '',
        '══════════════════════════════════════',
        da ? 'PRAKTISK OPSÆTNING' : 'PRACTICAL SETUP',
        '══════════════════════════════════════',
        da ? '[ ] Login og adgangskoder til relevante systemer' : '[ ] Logins and passwords for relevant systems',
        da ? '[ ] Email, kalender og kommunikationsværktøjer' : '[ ] Email, calendar and communication tools',
        da ? '[ ] Nødvendigt udstyr og arbejdsredskaber' : '[ ] Required equipment and tools',
        da ? '[ ] Nøgler, adgangskort og parkeringspladser' : '[ ] Keys, access cards and parking',
        ...practicalNotes.map(s => `[ ] ${s}`),
        '',
        '══════════════════════════════════════',
        da ? 'FØRSTE UGE — INTRODUKTION' : 'FIRST WEEK — INTRODUCTION',
        '══════════════════════════════════════',
        da ? '[ ] Introduktion til arbejdsopgaver og ansvarsområder' : '[ ] Introduction to tasks and responsibilities',
        da ? '[ ] Introduktion til vigtige samarbejdspartnere og kunder' : '[ ] Introduction to key partners and customers',
        da ? '[ ] Gennemgang af processer og arbejdsgange' : '[ ] Overview of processes and workflows',
        ...taskNotes.map(s => `[ ] ${s}`),
        '',
        '══════════════════════════════════════',
        da ? 'OPLÆRING OG KURSER' : 'TRAINING & COURSES',
        '══════════════════════════════════════',
        da ? '[ ] Introduktion til interne systemer og platforme' : '[ ] Introduction to internal systems and platforms',
        da ? '[ ] Nødvendig faglig oplæring aftalt med leder' : '[ ] Required professional training agreed with manager',
        ...trainingNotes.map(s => `[ ] ${s}`),
        '',
        '══════════════════════════════════════',
        da ? 'OPFØLGNING — FØRSTE MÅNED' : 'FOLLOW-UP — FIRST MONTH',
        '══════════════════════════════════════',
        da ? '[ ] Check-in møde med leder (uge 2)' : '[ ] Check-in meeting with manager (week 2)',
        da ? '[ ] Faglig evaluering og feedback (uge 4)' : '[ ] Professional evaluation and feedback (week 4)',
        da ? '[ ] Evt. justeringer til onboardingplanen' : '[ ] Any adjustments to the onboarding plan',
        da ? `[ ] ${emp} bekræfter at have modtaget og forstået onboardingplanen` : `[ ] ${emp} confirms receipt and understanding of the onboarding plan`,
        '',
        '─────────────────────────────',
        da ? `Underskrift (${emp}): _________________________  Dato: _______` : `Signature (${emp}): _________________________  Date: _______`,
        da ? `Underskrift (leder): _________________________  Dato: _______` : `Signature (manager): _________________________  Date: _______`,
      ].filter(l => l !== '').join('\n');
    }

    // ── 8. Gør tekst professionel ─────────────────────────────────────────
    case 'professionel': {
      // Split original into sentences
      const originalSentences = notes
        .split(/(?<=[.!?\n])\s+|[\n\r]+/)
        .map(s => s.trim())
        .filter(Boolean);

      // Rewrite each sentence
      const rewritten = originalSentences.map(s =>
        rewriteSentenceProfessionally(s, currentLang, toneStyle)
      );

      // Build into flowing paragraph(s)
      const paragraphs = [];
      let chunk = [];
      rewritten.forEach((s, i) => {
        chunk.push(s);
        if (chunk.length === 3 || i === rewritten.length - 1) {
          paragraphs.push(chunk.join(' '));
          chunk = [];
        }
      });

      const versionLabel = da
        ? toneStyle === 'formal' ? 'FORMEL VERSION' : toneStyle === 'direct' ? 'KORT OG DIREKTE VERSION' : 'PROFESSIONEL VERSION'
        : toneStyle === 'formal' ? 'FORMAL VERSION' : toneStyle === 'direct' ? 'SHORT & DIRECT VERSION' : 'PROFESSIONAL VERSION';

      const disclaimer = da
        ? '── Gennemgå og tilpas teksten. Dette er et udkast. ──'
        : '── Review and adjust the text. This is a draft. ──';

      return [
        da ? '── ORIGINALTEKST ──' : '── ORIGINAL TEXT ──',
        '',
        notes,
        '',
        '',
        `── ${versionLabel} ──`,
        '',
        ...paragraphs,
        '',
        disclaimer,
      ].join('\n');
    }

    default:
      return da ? 'Vælg venligst et gyldigt værktøj.' : 'Please select a valid tool.';
  }
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
  if (!selectedTool) { ws.classList.remove('visible'); return; }

  ws.classList.add('visible');

  document.getElementById('wsToolIcon').textContent = selectedTool.icon;
  document.getElementById('wsToolTitle').textContent = toolTitle(selectedTool);

  // Notes label + placeholder (per-tool hint)
  document.querySelector('.form-label[for="notesInput"]').textContent = t('notesLabel');
  document.getElementById('notesInput').placeholder = toolHint(selectedTool) || t('notesPlaceholder');

  // Optional fields visibility
  const fields = selectedTool.fields;
  document.getElementById('fieldCustomer').style.display  = fields.includes('customer')  ? '' : 'none';
  document.getElementById('fieldCompany').style.display   = fields.includes('company')   ? '' : 'none';
  document.getElementById('fieldPrice').style.display     = fields.includes('price')     ? '' : 'none';
  document.getElementById('fieldDeadline').style.display  = fields.includes('deadline')  ? '' : 'none';
  document.getElementById('fieldTone').style.display      = fields.includes('tone')      ? '' : 'none';
  document.getElementById('optionalFieldsSection').style.display = fields.length > 0 ? '' : 'none';
  document.getElementById('optionalLabel').textContent = t('optionalFields');

  // Field labels
  document.querySelector('.form-label[for="customerInput"]').textContent = t('customerLabel');
  document.querySelector('.form-label[for="companyInput"]').textContent  = t('companyLabel');
  document.querySelector('.form-label[for="priceInput"]').textContent    = t('priceLabel');
  document.querySelector('.form-label[for="deadlineInput"]').textContent = t('deadlineLabel');
  document.querySelector('.form-label[for="toneSelect"]').textContent    = t('toneLabel');

  // Tone options
  const toneSelect = document.getElementById('toneSelect');
  const tones = t('tones');
  toneSelect.innerHTML = tones.map(tone => `<option value="${tone}">${tone}</option>`).join('');

  // Buttons / labels
  document.getElementById('generateBtn').textContent  = t('generateBtn');
  document.getElementById('outputLabel').textContent  = t('outputLabel');
  document.getElementById('copyBtn').textContent      = `📋 ${t('copyBtn')}`;
  document.getElementById('saveBtn').textContent      = `💾 ${t('saveBtn')}`;
  document.getElementById('clearBtn').textContent     = `🗑 ${t('clearBtn')}`;
  document.getElementById('downloadBtn').textContent  = `⬇ ${t('downloadBtn')}`;
  document.getElementById('changeToolBtn').textContent = `← ${t('changeToolBtn')}`;

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
  document.getElementById('appName').textContent   = t('appName');
  document.getElementById('appSub').textContent    = t('appSub');
  document.getElementById('introTitle').textContent = t('introTitle');
  document.getElementById('introText').textContent  = t('introText');
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
    setTimeout(() => { textarea.classList.remove('input-error'); errMsg.textContent = ''; }, 3000);
    return;
  }

  const btn = document.getElementById('generateBtn');
  btn.textContent = t('generating');
  btn.disabled = true;
  btn.classList.add('btn-loading');

  // Small delay for perceived responsiveness (remove when using real API)
  setTimeout(() => {
    const formData = {
      notes,
      customer: document.getElementById('customerInput').value.trim(),
      company:  document.getElementById('companyInput').value.trim(),
      price:    document.getElementById('priceInput').value.trim(),
      deadline: document.getElementById('deadlineInput').value.trim(),
      tone:     document.getElementById('toneSelect').value,
    };

    currentOutput = generateDraft(selectedTool.id, formData);
    document.getElementById('outputBox').textContent = currentOutput;
    document.getElementById('outputSection').classList.add('visible');
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth', block: 'start' });

    btn.textContent = t('generateBtn');
    btn.disabled = false;
    btn.classList.remove('btn-loading');
  }, 320);
}

function copyOutput() {
  if (!currentOutput) return;
  navigator.clipboard.writeText(currentOutput).then(() => {
    showToast(t('copiedMsg'), 'success');
  }).catch(() => {
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
  drafts.push({ toolId: selectedTool.id, text: currentOutput, ts: Date.now() });
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
  document.documentElement.lang = lang;
  updateAllText();
}

function updateCharCount() {
  const len = document.getElementById('notesInput').value.length;
  document.getElementById('charCount').textContent = `${len} ${currentLang === 'da' ? 'tegn' : 'characters'}`;
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  loadDrafts();

  const savedLang = localStorage.getItem('smv_lang');
  if (savedLang === 'da' || savedLang === 'en') currentLang = savedLang;

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

  document.documentElement.lang = currentLang;
  updateAllText();
  renderDrafts();
}

document.addEventListener('DOMContentLoaded', init);
