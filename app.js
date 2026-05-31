/* ============================================================
   SMV Kontorhjælper — app.js v3
   ============================================================ */

// ── Language strings ──────────────────────────────────────────

const LANG = {
  da: {
    appName: 'SMV Kontorhjælper',
    appSub: 'Praktiske tekster og skabeloner til små virksomheder',
    greeting: name => `Velkommen tilbage${name ? ', ' + name : ''} 👋`,
    greetingSub: 'Hvad har du brug for i dag?',
    toolsLabel: 'Vælg et værktøj',
    notesLabel: 'Dine rå noter',
    customerLabel: 'Kundenavn',
    companyLabel: 'Firmanavn',
    priceLabel: 'Pris',
    deadlineLabel: 'Frist / dato',
    toneLabel: 'Tone',
    tones: ['Venlig', 'Professionel', 'Kort og direkte'],
    generateBtn: 'Lav udkast',
    generating: 'Genererer...',
    outputLabel: 'Dit udkast',
    copyBtn: 'Kopiér',
    saveBtn: 'Gem',
    clearBtn: 'Ryd',
    downloadBtn: 'Download',
    draftsLabel: 'Gemte udkast',
    draftsEmpty: 'Ingen gemte udkast endnu.\nBrug et af de 8 værktøjer til at lave dit første udkast.',
    openBtn: 'Åbn',
    copyDraftBtn: 'Kopiér',
    deleteBtn: 'Slet',
    copiedMsg: 'Kopieret!',
    savedMsg: 'Gemt!',
    deletedMsg: 'Udkast slettet.',
    validationMsg: 'Skriv venligst dine noter inden du genererer.',
    clearConfirm: 'Er du sikker på, at du vil rydde udkastet?',
    clearAllConfirm: 'Er du sikker på, at du vil slette ALLE udkast? Dette kan ikke fortrydes.',
    optionalFields: 'Ekstra oplysninger',
    recentLabel: 'Seneste udkast',
    settingsSaved: 'Indstillinger gemt!',
    backBtn: 'Tilbage til overblik',
  },
  en: {
    appName: 'SMV Office Helper',
    appSub: 'Practical texts and templates for small businesses',
    greeting: name => `Welcome back${name ? ', ' + name : ''} 👋`,
    greetingSub: 'What do you need today?',
    toolsLabel: 'Choose a tool',
    notesLabel: 'Your rough notes',
    customerLabel: 'Customer name',
    companyLabel: 'Company name',
    priceLabel: 'Price',
    deadlineLabel: 'Deadline / date',
    toneLabel: 'Tone',
    tones: ['Friendly', 'Professional', 'Short & direct'],
    generateBtn: 'Generate draft',
    generating: 'Generating...',
    outputLabel: 'Your draft',
    copyBtn: 'Copy',
    saveBtn: 'Save',
    clearBtn: 'Clear',
    downloadBtn: 'Download',
    draftsLabel: 'Saved drafts',
    draftsEmpty: 'No saved drafts yet.\nUse one of the 8 tools to create your first draft.',
    openBtn: 'Open',
    copyDraftBtn: 'Copy',
    deleteBtn: 'Delete',
    copiedMsg: 'Copied!',
    savedMsg: 'Saved!',
    deletedMsg: 'Draft deleted.',
    validationMsg: 'Please write your notes before generating.',
    clearConfirm: 'Are you sure you want to clear the draft?',
    clearAllConfirm: 'Are you sure you want to delete ALL drafts? This cannot be undone.',
    optionalFields: 'Extra details',
    recentLabel: 'Recent drafts',
    settingsSaved: 'Settings saved!',
    backBtn: 'Back to overview',
  }
};

// ── Tool definitions ──────────────────────────────────────────

const TOOLS = [
  {
    id: 'kundemail',
    icon: '✉️',
    titleDa: 'Kundemail',
    titleEn: 'Customer Email',
    descDa: 'Lav en professionel kundemail fra dine noter',
    descEn: 'Turn rough notes into a professional customer email',
    hintDa: 'F.eks: kundens forespørgsel om pris på hjemmeside. vi tilbyder design og vedligehold. pris ca 15.000 kr. vi sender tilbud inden for 2 dage',
    hintEn: 'E.g: customer asked about website price. we offer design and maintenance. price approx 15,000. we will send quote within 2 days',
    fields: ['customer', 'company', 'tone'],
  },
  {
    id: 'tilbud',
    icon: '📋',
    titleDa: 'Tilbudstekst',
    titleEn: 'Quotation Text',
    descDa: 'Struktureret tilbudsbrev med betingelser og priser',
    descEn: 'Structured quotation with terms and prices',
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
    hintEn: 'E.g: invoice 2024-047 sent April 15th. amount 8,500. no payment received. second reminder. payment terms were 30 days',
    fields: ['customer', 'company', 'price', 'deadline', 'tone'],
  },
  {
    id: 'facebook',
    icon: '📣',
    titleDa: 'Facebook-opslag',
    titleEn: 'Facebook Post',
    descDa: 'Engagerende opslag til din virksomhedsside med hashtags',
    descEn: 'Engaging post for your business page with hashtags',
    hintDa: 'F.eks: sommertilbud på vinduespudsning. 20% rabat hele juli. gratis tilbud på stedet. betjener hele nordsjælland',
    hintEn: 'E.g: summer offer on window cleaning. 20% discount all of July. free quote on site. serving all of north zealand',
    fields: ['company', 'tone'],
  },
  {
    id: 'sop',
    icon: '📄',
    titleDa: 'SOP / Arbejdsinstruktion',
    titleEn: 'SOP / Work Instruction',
    descDa: 'Officiel arbejdsprocedure med ansvar og kvalitetskontrol',
    descEn: 'Official work procedure with responsibilities and quality control',
    hintDa: 'F.eks: modtagelse af varer. kontroller antal mod følgeseddel. registrer i lager-system. afvigelser meldes til leder. varer sættes i reol A-C efter kategori',
    hintEn: 'E.g: receiving goods. check quantity against delivery note. register in stock system. deviations reported to manager. goods placed on shelf A-C by category',
    fields: ['company'],
  },
  {
    id: 'tjekliste',
    icon: '✅',
    titleDa: 'Tjekliste',
    titleEn: 'Checklist',
    descDa: 'Struktureret tjekliste med grupperinger og tæller',
    descEn: 'Structured checklist with groupings and counter',
    hintDa: 'F.eks: åbning af butik:\nnøgler og alarm\nkasse tænd\nvarmer tænd\nkaffemaskine\nfacebook opslag\nhent post\nflyt borde ud',
    hintEn: 'E.g: opening the shop:\nkeys and alarm\ncash register on\nheating on\ncoffee machine\nfacebook post\ncollect mail\nmove tables outside',
    fields: [],
  },
  {
    id: 'onboarding',
    icon: '👋',
    titleDa: 'Medarbejder-onboarding',
    titleEn: 'Employee Onboarding',
    descDa: 'Komplet onboardingplan for ny medarbejder med underskrift',
    descEn: 'Complete onboarding plan for new employee with signature',
    hintDa: 'F.eks: ny elektriker. skal lære vores sagsstyringssystem. introduceres til faste kunder. sikkerhedskursus uge 2. kørekort klasse B nødvendigt',
    hintEn: 'E.g: new electrician. needs to learn our case management system. introduce to regular customers. safety course week 2. class B driving license required',
    fields: ['customer', 'company', 'deadline'],
  },
  {
    id: 'professionel',
    icon: '✨',
    titleDa: 'Gør tekst professionel',
    titleEn: 'Make Text Professional',
    descDa: 'Omskriv ufærdig tekst til poleret, professionelt sprog',
    descEn: 'Rewrite unfinished text into polished, professional language',
    hintDa: 'Indsæt din ufærdige tekst her — stikord, halvfærdige sætninger eller bare noget du vil have til at lyde mere professionelt.',
    hintEn: 'Paste your unfinished text here — bullet points, half-finished sentences, or anything you want to sound more professional.',
    fields: ['tone'],
  },
];

// ── Tool colours ──────────────────────────────────────────────

const TOOL_COLORS = {
  kundemail:    { bg: '#eff6ff', icon: '#3b82f6' },
  tilbud:       { bg: '#fff7ed', icon: '#f97316' },
  rykker:       { bg: '#fef2f2', icon: '#ef4444' },
  facebook:     { bg: '#eef2ff', icon: '#6366f1' },
  sop:          { bg: '#f0fdfa', icon: '#0d9488' },
  tjekliste:    { bg: '#f0fdf4', icon: '#22c55e' },
  onboarding:   { bg: '#fffbeb', icon: '#f59e0b' },
  professionel: { bg: '#faf5ff', icon: '#8b5cf6' },
};

// ── Dashboard tips ─────────────────────────────────────────────

const TIPS = [
  {
    da: 'Du behøver ikke skrive perfekte sætninger. SMV Kontorhjælper tager dine stikord og gør dem til professionel tekst. Jo mere du skriver, jo bedre resultatet.',
    en: 'You don\'t need to write perfect sentences. SMV Office Helper takes your notes and turns them into professional text. The more you write, the better the result.',
  },
  {
    da: 'Brug "Tone"-indstillingen strategisk: "Venlig" til kunder du kender, "Professionel" til formelle situationer, og "Kort og direkte" til interne beskeder.',
    en: 'Use the "Tone" setting strategically: "Friendly" for customers you know, "Professional" for formal situations, and "Short & direct" for internal messages.',
  },
  {
    da: 'Gem dine bedste udkast og genbrug dem! Åbn et gemt udkast og tilpas det til en ny situation — det sparer dig for meget tid i det daglige.',
    en: 'Save your best drafts and reuse them! Open a saved draft and adapt it to a new situation — it saves you a lot of time day-to-day.',
  },
  {
    da: 'SOP og Tjekliste er guld for virksomheder med ansatte. Brug dem til at dokumentere arbejdsgange og sikre ensartet kvalitet — hver gang.',
    en: 'SOP and Checklist are gold for businesses with employees. Use them to document workflows and ensure consistent quality — every time.',
  },
  {
    da: 'Tilbudsteksten inkluderer automatisk betingelser med betalingsfrist og gyldighed. Tilpas dem inden du sender — og husk altid at kræve skriftlig accept.',
    en: 'The quotation text automatically includes terms with payment deadline and validity. Adjust them before sending — and always require written acceptance.',
  },
  {
    da: 'Facebook-opslaget genererer relevante hashtags fra dit indhold. Tilpas dem i udkastet — og overvej at lave 3-4 varianter med forskellig tone.',
    en: 'The Facebook post generates relevant hashtags from your content. Adjust them in the draft — and consider making 3-4 variations with different tones.',
  },
];

// ── Per-tool tips ─────────────────────────────────────────────

const TOOL_TIPS = {
  kundemail: {
    da: [
      'Skriv kundens forespørgsel med dine egne ord — grammatik er ligegyldigt her',
      'Angiv kundenavnet i feltet nedenfor for at personalisere hilsenen automatisk',
      'Tonen "Venlig" passer til langt de fleste kundemails og skaber bedre relationer',
      'Gennemlæs altid udkastet — tilpas kontaktoplysninger og næste skridt til din situation',
    ],
    en: [
      'Write the customer\'s enquiry in your own words — grammar doesn\'t matter here',
      'Enter the customer name below to automatically personalise the greeting',
      '"Friendly" tone suits most customer emails and builds better relationships',
      'Always review the draft — adjust contact details and next steps to your situation',
    ],
  },
  tilbud: {
    da: [
      'Beskriv alle elementer opgaven indeholder — materialer, arbejde, transport osv.',
      'Angiv pris og frist for at generere komplette tilbudsbetingelser automatisk',
      'Tilbuddet inkluderer automatisk betalingsbetingelser — 8 dage netto',
      'Gyldighed er 30 dage fra i dag. Angiv en anden frist i "Frist"-feltet om nødvendigt',
    ],
    en: [
      'Describe all elements the job includes — materials, labour, transport etc.',
      'Enter price and deadline to automatically generate complete quotation terms',
      'The quotation automatically includes payment terms — net 8 days',
      'Validity is 30 days from today. Enter a different deadline in the "Deadline" field if needed',
    ],
  },
  rykker: {
    da: [
      'Inkludér fakturanummeret i dine noter — det opdages og indsættes automatisk',
      'Angiv det skyldige beløb og forfaldsdatoen for et komplet rykkerbrev',
      '"Venlig" tone er altid bedst til første rykker — bevarer kunderelationen',
      'Anden og tredje rykker kan med fordel have tone "Professionel" eller "Kort og direkte"',
    ],
    en: [
      'Include the invoice number in your notes — it\'s automatically detected and inserted',
      'Enter the outstanding amount and due date for a complete reminder letter',
      '"Friendly" tone is always best for the first reminder — preserves the customer relationship',
      'Second and third reminders can benefit from "Professional" or "Short & direct" tone',
    ],
  },
  facebook: {
    da: [
      'Start med det mest interessante — den første sætning afgør om folk læser videre',
      'Angiv firmanavnet for automatisk at tilpasse indhold og relevante hashtags',
      'Emojis tilføjes automatisk — fjern dem, hvis din virksomheds stil er mere formel',
      'Husk at tilføje din telefon, link og åbningstider inden du poster',
    ],
    en: [
      'Start with the most interesting part — the first sentence decides if people read on',
      'Enter the company name to automatically tailor content and relevant hashtags',
      'Emojis are added automatically — remove them if your business style is more formal',
      'Remember to add your phone, link and opening hours before posting',
    ],
  },
  sop: {
    da: [
      'Skriv processen trin for trin — hvert linjeskift bliver automatisk et nyt trin',
      'Brug ord som "vigtigt", "advarsel" eller "obs" for at markere sikkerhedspunkter med ⚠️',
      'Angiv firmanavnet for at gøre SOP\'en officiel med virksomhedens navn og dato',
      'SOP\'en inkluderer automatisk: ansvar, kvalitetskrav og afslutningskontrol',
    ],
    en: [
      'Write the process step by step — each line break automatically becomes a new step',
      'Use words like "important", "warning" or "caution" to flag safety points with ⚠️',
      'Enter the company name to make the SOP official with the company name and date',
      'The SOP automatically includes: responsibilities, quality requirements and completion checklist',
    ],
  },
  tjekliste: {
    da: [
      'Brug overskrifter med kolon (f.eks. "Morgenrutine:") til at gruppere punkter automatisk',
      'Hvert linjeskift bliver et afkrydsningspunkt — hold det kort og handlingsorienteret',
      'Tjeklisten tæller automatisk det totale antal punkter for dig',
      'Udskriv, del som PDF, eller brug den digitalt på din telefon under arbejdet',
    ],
    en: [
      'Use headings with a colon (e.g. "Morning routine:") to automatically group items',
      'Each line break becomes a checkbox — keep it short and action-oriented',
      'The checklist automatically counts the total number of items for you',
      'Print, share as PDF, or use it digitally on your phone during work',
    ],
  },
  onboarding: {
    da: [
      'Skriv hvad den nye medarbejder skal lære, have adgang til og gennemgå',
      'Angiv medarbejderens navn i "Kundenavn"-feltet for at personalisere planen',
      'Brug "Frist"-feltet til startdatoen — den indsættes direkte i dokumentet',
      'Planen inkluderer automatisk: dag 1, første uge, oplæring og opfølgning måned 1',
    ],
    en: [
      'Write what the new employee needs to learn, get access to and go through',
      'Enter the employee\'s name in the "Customer name" field to personalise the plan',
      'Use the "Deadline" field for the start date — it\'s inserted directly in the document',
      'The plan automatically includes: day 1, first week, training and month 1 follow-up',
    ],
  },
  professionel: {
    da: [
      'Indsæt tekst der lyder for uformelt, rodet eller ufærdigt — selv sms-sprog virker',
      'Tone "Professionel" tilføjer officielle formuleringer — perfekt til breve og kontrakter',
      'Tone "Kort og direkte" holder essensen, men gør sproget skarpere og mere præcist',
      'Originalteksten vises øverst i udkastet — sammenlign og justér som du ønsker',
    ],
    en: [
      'Paste text that sounds too informal, messy or unfinished — even SMS language works',
      '"Professional" tone adds formal phrasing — perfect for letters and contracts',
      '"Short & direct" tone keeps the essence but sharpens and clarifies the language',
      'Original text is shown at the top of the draft — compare and adjust as you wish',
    ],
  },
};

// ── Help content ──────────────────────────────────────────────

const HELP_CONTENT = [
  {
    titleDa: '🚀 Kom godt i gang',
    titleEn: '🚀 Getting started',
    itemsDa: [
      'Vælg et af de 8 værktøjer fra overblikket eller sidemenuen',
      'Skriv dine rå noter i tekstfeltet — stikord og halve sætninger er nok',
      'Udfyld de ekstra felter (navn, pris, frist) for et endnu bedre resultat',
      'Tryk "Lav udkast" eller brug genvejen Ctrl+Enter',
    ],
    itemsEn: [
      'Choose one of the 8 tools from the overview or sidebar menu',
      'Write your rough notes in the text field — bullet points and half sentences are enough',
      'Fill in the extra fields (name, price, deadline) for an even better result',
      'Press "Generate draft" or use the shortcut Ctrl+Enter',
    ],
  },
  {
    titleDa: '💡 Tips til bedre resultater',
    titleEn: '💡 Tips for better results',
    itemsDa: [
      'Jo mere du skriver i notefeltet, desto mere præcist bliver udkastet',
      'Brug linjeskift til at adskille forskellige punkter og emner',
      'Inkludér navne, konkrete priser og datoer i dine noter',
      'Prøv alle tre toner på det samme indhold — de giver vidt forskellige resultater',
    ],
    itemsEn: [
      'The more you write in the notes field, the more precise the draft',
      'Use line breaks to separate different points and topics',
      'Include names, concrete prices and dates in your notes',
      'Try all three tones on the same content — they give very different results',
    ],
  },
  {
    titleDa: '📁 Gem og genbrug udkast',
    titleEn: '📁 Save and reuse drafts',
    itemsDa: [
      'Tryk "Gem" for at gemme udkastet lokalt i din browser',
      'Åbn et gemt udkast og tilpas det til en ny lignende situation',
      'Download udkastet som .txt-fil til arkivering eller videre redigering',
      'Alle dine data gemmes kun lokalt — intet sendes til en server',
    ],
    itemsEn: [
      'Press "Save" to save the draft locally in your browser',
      'Open a saved draft and adapt it to a new similar situation',
      'Download the draft as a .txt file for archiving or further editing',
      'All your data is stored locally only — nothing is sent to a server',
    ],
  },
  {
    titleDa: '🛡️ Sikkerhed & data',
    titleEn: '🛡️ Security & data',
    itemsDa: [
      'Alle udkast gemmes udelukkende i din browsers localStorage',
      'Ingen data sendes til nogen server — din information forbliver privat',
      'Ryd alle udkast under Indstillinger, hvis du skifter computer',
      'Brug Download-funktionen til at sikkerhedskopiere vigtige udkast',
    ],
    itemsEn: [
      'All drafts are stored exclusively in your browser\'s localStorage',
      'No data is sent to any server — your information remains private',
      'Clear all drafts under Settings if you switch computers',
      'Use the Download feature to back up important drafts',
    ],
  },
];

// ── Word replacement dictionaries ─────────────────────────────

const WORD_REPLACEMENTS = {
  da: [
    [/\bbare\b/gi, 'blot'],
    [/\blige\b(?= \w)/gi, 'venligst'],
    [/\bproblem(et|er|erne)?\b/gi, (_, s) => 'udfordring' + (s || '')],
    [/\bting(ene)?\b/gi, (_, s) => 'forhold' + (s ? 'ene' : 'et')],
    [/\bhurtigt\b/gi, 'rettidigt'],
    [/\bsnart\b/gi, 'inden for kort tid'],
    [/\bmeget\b/gi, 'særdeles'],
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
    [/\bgood\b/gi, 'satisfactory'],
    [/\bbad\b/gi, 'unsatisfactory'],
    [/\bcheap\b/gi, 'cost-effective'],
    [/\bokay\b|\bok\b/gi, 'acceptable'],
    [/\bcool\b/gi, 'excellent'],
    [/\bnice\b/gi, 'commendable'],
  ]
};

// ── Smart input correction dictionaries ────────────────────────
// Handles: æøå missing, common misspellings, abbreviations,
// SMS language, dyslexia patterns, phonetic spelling, lazy input

const SMART_CORRECTIONS_DA = {

  // ╔══ DANISH SPECIAL CHARS — aa/ae/oe typed instead of å/æ/ø ══╗

  // å (written as aa)
  'aar': 'år', 'aaret': 'året', 'aarene': 'årene', 'aarlig': 'årlig',
  'aarlige': 'årlige', 'aarligt': 'årligt', 'aars': 'års',
  'baade': 'både', 'baad': 'båd', 'baaden': 'båden',
  'gaa': 'gå', 'gaar': 'går', 'gaaet': 'gået', 'gaaende': 'gående',
  'staa': 'stå', 'staar': 'står', 'staaet': 'stået', 'staende': 'stående',
  'faa': 'få', 'faar': 'får', 'faaet': 'fået',
  'forstaa': 'forstå', 'forstaar': 'forstår', 'forstaaet': 'forstået',
  'haar': 'hår', 'haaret': 'håret',
  'laan': 'lån', 'laane': 'låne', 'laaner': 'låner', 'laant': 'lånt', 'laaned': 'lånet',
  'maaned': 'måned', 'maaneder': 'måneder', 'maanedlig': 'månedlig', 'maanedligt': 'månedligt',
  'raad': 'råd', 'raadgiver': 'rådgiver', 'raadgivning': 'rådgivning', 'raadgivere': 'rådgivere',
  'saadan': 'sådan', 'saadant': 'sådant', 'saadanne': 'sådanne',
  'taale': 'tåle', 'taaler': 'tåler', 'taalt': 'tålt',
  'paa': 'på', 'paavirke': 'påvirke', 'paavirkede': 'påvirkede',
  'naa': 'nå', 'naar': 'når', 'naaet': 'nået', 'naede': 'nåede',
  'aaben': 'åben', 'aabne': 'åbne', 'aabner': 'åbner', 'aabent': 'åbent', 'aabning': 'åbning',
  'aarsag': 'årsag', 'aarsager': 'årsager', 'aarsagen': 'årsagen',
  'taarn': 'tårn', 'taarnet': 'tårnet',
  'maanederne': 'månederne', 'halvaar': 'halvår', 'halvaarlig': 'halvårlig',
  'indkob': 'indkøb', // ø
  'korektur': 'korrektur',

  // ø (written as oe)
  'oekonomi': 'økonomi', 'oekonomisk': 'økonomisk', 'oekonomen': 'økonomen',
  'oejeblik': 'øjeblik', 'oejeblikket': 'øjeblikket', 'oejeblikkeligt': 'øjeblikkeligt',
  'oel': 'øl',
  'oere': 'øre', 'oeret': 'øret',
  'oenske': 'ønske', 'oensker': 'ønsker', 'oensket': 'ønsket', 'oenskede': 'ønskede',
  'loesning': 'løsning', 'loesninger': 'løsninger', 'loest': 'løst', 'loese': 'løse', 'loeser': 'løser',
  'moede': 'møde', 'moeder': 'møder', 'moedet': 'mødet', 'moedes': 'mødes', 'moedet': 'mødet',
  'koere': 'køre', 'koerer': 'kører', 'koert': 'kørt',
  'stoerrelse': 'størrelse', 'stoerre': 'større', 'stoerst': 'størst',
  'boern': 'børn', 'boernene': 'børnene', 'boernehave': 'børnehave',
  'hoere': 'høre', 'hoerer': 'hører', 'hoert': 'hørt',
  'groen': 'grøn', 'groent': 'grønt', 'groenne': 'grønne',
  'bloed': 'blød', 'boejer': 'bøjer',
  'foede': 'føde', 'foedes': 'fødes', 'foedt': 'født',
  'noedvendig': 'nødvendig', 'noedvendigt': 'nødvendigt', 'noedvendigvis': 'nødvendigvis',
  'spoergsmaal': 'spørgsmål', 'spoergsmaalet': 'spørgsmålet',
  'spoerge': 'spørge', 'spoerger': 'spørger', 'spoerges': 'spørges',
  'stoette': 'støtte', 'stoetter': 'støtter', 'stoettet': 'støttet',
  'loen': 'løn', 'loennen': 'lønnen', 'loenninger': 'lønninger', 'loenstigning': 'lønstigning',
  'oevrigt': 'øvrigt', 'oevre': 'øvre',
  'indkoeb': 'indkøb', 'indkoebet': 'indkøbet',
  'tilbagekoeb': 'tilbagekøb',
  'vedroerende': 'vedrørende', 'vedroerer': 'vedrører',
  'udfoere': 'udføre', 'udfoerer': 'udfører', 'udfoert': 'udført',
  'genfoere': 'genføre', 'gennemfoere': 'gennemføre',

  // æ (written as ae)
  'aendre': 'ændre', 'aendrer': 'ændrer', 'aendring': 'ændring', 'aendringer': 'ændringer', 'aendret': 'ændret',
  'aerlig': 'ærlig', 'aerligt': 'ærligt', 'aerlighed': 'ærlighed',
  'aeldre': 'ældre', 'aeldste': 'ældste', 'aeldre': 'ældre',
  'aeg': 'æg', 'aegget': 'ægget',
  'aergerlig': 'ærgerlig', 'aergrelse': 'ærgrelse',
  'laese': 'læse', 'laeser': 'læser', 'laest': 'læst', 'laesning': 'læsning',
  'naevne': 'nævne', 'naevner': 'nævner', 'naevnt': 'nævnt', 'naevnes': 'nævnes',
  'saette': 'sætte', 'saetter': 'sætter', 'saetning': 'sætning',
  'taenke': 'tænke', 'taenker': 'tænker', 'taenkt': 'tænkt', 'taenkes': 'tænkes',
  'traeffe': 'træffe', 'traeffer': 'træffer', 'traeffes': 'træffes',
  'vaelge': 'vælge', 'vaelger': 'vælger', 'vaelges': 'vælges',
  'haeve': 'hæve', 'haever': 'hæver', 'haevet': 'hævet',
  'maengde': 'mængde', 'maengder': 'mængder', 'maengden': 'mængden',
  'gaeld': 'gæld', 'gaeldende': 'gældende', 'gaeldsbreve': 'gældsbreve',
  'kaere': 'kære', 'kaereste': 'kæreste',
  'graense': 'grænse', 'graenser': 'grænser', 'graensende': 'grænsende',
  'traening': 'træning', 'traener': 'træner', 'traenede': 'trænede',
  'haendle': 'handle', 'haendelse': 'hændelse', 'haendelser': 'hændelser',
  'aedru': 'ædru',
  'naeste': 'næste', 'naermest': 'nærmest', 'naermer': 'nærmer',

  // ╔══ COMMON BUSINESS TERM MISSPELLINGS ══╗
  'faktua': 'faktura', 'fakturra': 'faktura', 'fatura': 'faktura',
  'fakturea': 'faktura', 'faktureat': 'faktura', 'faktura': 'faktura',
  'levring': 'levering', 'levreing': 'levering', 'leverign': 'levering',
  'levereing': 'levering',
  'betalng': 'betaling', 'betalig': 'betaling', 'betlaing': 'betaling',
  'betalning': 'betaling',
  'kontrakt': 'kontrakt', 'kontarkt': 'kontrakt', 'konrakt': 'kontrakt',
  'arbeje': 'arbejde', 'arbejdsgnage': 'arbejdsgange', 'arbjede': 'arbejde',
  'leverandor': 'leverandør', 'leverandoer': 'leverandør',
  'opagve': 'opgave', 'opgavet': 'opgaven', 'opgaver': 'opgaver',
  'medabejder': 'medarbejder', 'medrabejder': 'medarbejder', 'medarbjeder': 'medarbejder',
  'medabrjeder': 'medarbejder', 'medarbjeder': 'medarbejder',
  'godkendlese': 'godkendelse', 'godkenelse': 'godkendelse',
  'foresporgsel': 'forespørgsel', 'forespoergsel': 'forespørgsel',
  'bekraefte': 'bekræfte', 'bekraefter': 'bekræfter', 'bekraeftelse': 'bekræftelse',
  'tilbude': 'tilbud', 'tilbuddet': 'tilbuddet',
  'afleveing': 'aflevering', 'afleverign': 'aflevering',
  'indkob': 'indkøb', 'indkoeb': 'indkøb',
  'okonomi': 'økonomi', 'okonomisk': 'økonomisk',
  'regnskab': 'regnskab', 'regnksab': 'regnskab',
  'rekaning': 'regning', 'regning': 'regning',
  'klienten': 'klienten', 'kleitn': 'klient',
  'forsyning': 'forsyning', 'forsynging': 'forsyning',
  'aftlaen': 'aftalen', 'afatale': 'aftale',
  'akseptere': 'acceptere', 'aksepter': 'accepter',
  'projektet': 'projektet', 'proejkt': 'projekt', 'projekt': 'projekt',
  'milesten': 'milepæl', 'milepael': 'milepæl',
  'buget': 'budget', 'buget': 'budget', 'budgtet': 'budget',
  'kalkulaiton': 'kalkulation', 'kalkulasjon': 'kalkulation',
  'prsentere': 'præsentere', 'prasentere': 'præsentere',
  'praesentation': 'præsentation', 'prasentation': 'præsentation',

  // ╔══ EVERYDAY LANGUAGE CORRECTIONS ══╗
  'ogsa': 'også', 'ogsaa': 'også', 'ogsåa': 'også',
  'mget': 'meget', 'meegt': 'meget', 'mgete': 'meget', 'meeget': 'meget',
  'selvfolgelig': 'selvfølgelig', 'selvfoelgelig': 'selvfølgelig', 'selvfolglig': 'selvfølgelig',
  'naturligvsi': 'naturligvis', 'natruligvis': 'naturligvis',
  'venlist': 'venligst', 'venligs': 'venligst',
  'allerde': 'allerede', 'allreede': 'allerede', 'alledere': 'allerede',
  'desvaere': 'desværre', 'desvare': 'desværre', 'desvaerre': 'desværre',
  'imidlertdi': 'imidlertid', 'imiidlertid': 'imidlertid',
  'eksmeplvis': 'eksempelvis', 'eksamplvis': 'eksempelvis',
  'information': 'information', 'imformation': 'information', 'informaiton': 'information',
  'kommunikaiton': 'kommunikation', 'kommuikation': 'kommunikation',
  'organisaiton': 'organisation', 'organisasjon': 'organisation',
  'situaiton': 'situation', 'sitiuaiton': 'situation',
  'processen': 'processen', 'proecssen': 'processen',
  'kontakten': 'kontakten', 'konktaen': 'kontakten',
  'adgangen': 'adgangen', 'adgnagen': 'adgangen',
  'systemet': 'systemet', 'systemmet': 'systemet', 'systmet': 'systemet',
  'platformen': 'platformen', 'platfomren': 'platformen',

  // ╔══ ABBREVIATIONS & SMS LANGUAGE → FULL WORDS ══╗
  'mvh': 'Med venlig hilsen',
  'kh': 'Kærlig hilsen',
  'vh': 'Venlig hilsen',
  'mvhilsen': 'Med venlig hilsen',
  'evt': 'eventuelt', 'evt.': 'eventuelt',
  'ca': 'cirka', 'ca.': 'cirka',
  'osv': 'og så videre', 'osv.': 'og så videre',
  'dvs': 'det vil sige', 'dvs.': 'det vil sige',
  'fx': 'for eksempel', 'feks': 'for eksempel', 'f.eks': 'for eksempel',
  'inkl': 'inklusive', 'inkl.': 'inklusive',
  'ekskl': 'eksklusive', 'ekskl.': 'eksklusive',
  'tlf': 'telefon', 'tlf.': 'telefon',
  'pct': 'procent', 'pct.': 'procent',
  'mfl': 'med flere', 'mfl.': 'med flere',
  'iht': 'i henhold til', 'iht.': 'i henhold til',
  'jf': 'jævnfør', 'jf.': 'jævnfør',
  'hhv': 'henholdsvis', 'hhv.': 'henholdsvis',
  'bla': 'blandt andet', 'bl.a': 'blandt andet',
  'stk': 'styk', 'stk.': 'styk',
  'nr': 'nummer', 'nr.': 'nummer',
  'idag': 'i dag', 'imorgen': 'i morgen', 'igaar': 'i går', 'igaares': 'i går',
  'pga': 'på grund af', 'pga.': 'på grund af',
  'ift': 'i forhold til', 'ift.': 'i forhold til',
  'mht': 'med hensyn til', 'mht.': 'med hensyn til',
  'asap': 'hurtigst muligt',
  'ok': 'okay', 'okay': 'okay',
  'lol': '',  // remove
  'haha': '',
  'kk': 'okay',
  'tbh': 'for at være ærlig',
  'imo': 'efter min mening',
  'fyi': 'til orientering',
  'ps': 'P.S.',
  'dkk': 'DKK',
  'kr.': 'kr.', 'kr': 'kr.',

  // ╔══ DAYS & TIME ══╗
  'manddag': 'mandag', 'maandag': 'mandag',
  'tirsdag': 'tirsdag', 'tirsdsag': 'tirsdag',
  'ondsdag': 'onsdag', 'onsdag': 'onsdag',
  'tordag': 'torsdag', 'thorsdag': 'torsdag',
  'freddag': 'fredag',
  'lordag': 'lørdag', 'loerdag': 'lørdag', 'lawerdag': 'lørdag',
  'sondag': 'søndag', 'soendag': 'søndag',
  'mandag': 'mandag', 'tirsdag': 'tirsdag', 'fredag': 'fredag',
  'imorgen tidlig': 'i morgen tidlig',
  'naeste uge': 'næste uge', 'naeste maaned': 'næste måned',
};

const SMART_CORRECTIONS_EN = {

  // ╔══ VERY COMMON MISSPELLINGS ══╗
  'recieve': 'receive', 'recieved': 'received', 'reciept': 'receipt',
  'seperate': 'separate', 'seperation': 'separation',
  'occured': 'occurred', 'occuring': 'occurring',
  'begining': 'beginning', 'beginner': 'beginner',
  'belive': 'believe', 'beleive': 'believe', 'believ': 'believe',
  'definately': 'definitely', 'definetely': 'definitely', 'definitly': 'definitely',
  'existance': 'existence', 'existense': 'existence',
  'goverment': 'government', 'govermnet': 'government',
  'grammer': 'grammar', 'gramer': 'grammar',
  'independant': 'independent', 'independance': 'independence',
  'liason': 'liaison', 'liasion': 'liaison',
  'maintainance': 'maintenance', 'maintainence': 'maintenance',
  'millenium': 'millennium', 'milennium': 'millennium',
  'misspell': 'misspell', 'mispell': 'misspell',
  'necesary': 'necessary', 'neccessary': 'necessary', 'necesarry': 'necessary',
  'occassion': 'occasion', 'occacion': 'occasion',
  'persue': 'pursue', 'persuing': 'pursuing',
  'privelege': 'privilege', 'priviledge': 'privilege',
  'publically': 'publicly',
  'reccommend': 'recommend', 'recomend': 'recommend', 'recommand': 'recommend',
  'relevent': 'relevant', 'relevnt': 'relevant',
  'restaraunt': 'restaurant', 'restarant': 'restaurant',
  'rythm': 'rhythm', 'rythem': 'rhythm',
  'schedual': 'schedule', 'shedule': 'schedule',
  'sincerly': 'sincerely', 'sinceraly': 'sincerely',
  'successfull': 'successful', 'successfuly': 'successfully',
  'suprise': 'surprise', 'supprize': 'surprise',
  'tommorow': 'tomorrow', 'tomoro': 'tomorrow', 'tomorow': 'tomorrow',
  'unfortunatly': 'unfortunately', 'unfortunatley': 'unfortunately',
  'wierd': 'weird', 'wied': 'weird',
  'writting': 'writing', 'writng': 'writing',
  'accomodate': 'accommodate', 'acommodate': 'accommodate',
  'aquire': 'acquire', 'aquired': 'acquired',
  'arguement': 'argument', 'arguemnt': 'argument',
  'assocciate': 'associate', 'asociate': 'associate',
  'calender': 'calendar',
  'collegue': 'colleague', 'collaegue': 'colleague', 'collegaue': 'colleague',
  'comittee': 'committee', 'commitee': 'committee',
  'commision': 'commission',
  'concious': 'conscious', 'concsious': 'conscious',
  'curiousity': 'curiosity',
  'dissapear': 'disappear', 'dissapoint': 'disappoint',
  'embarass': 'embarrass', 'embarrasment': 'embarrassment',
  'enviroment': 'environment', 'enviornment': 'environment',
  'expierence': 'experience', 'experiance': 'experience',
  'foriegn': 'foreign', 'foregin': 'foreign',
  'fourty': 'forty',
  'freind': 'friend',
  'gurantee': 'guarantee', 'guarentee': 'guarantee',
  'harrass': 'harass',
  'hieght': 'height',
  'humourous': 'humorous',
  'ignorance': 'ignorance', 'ignorence': 'ignorance',
  'immedietly': 'immediately', 'immediatly': 'immediately',
  'incidently': 'incidentally',
  'knive': 'knife',
  'knowlege': 'knowledge', 'knowledege': 'knowledge',
  'liberry': 'library', 'libary': 'library',
  'lisense': 'license', 'lisence': 'license',
  'literaly': 'literally', 'litterally': 'literally',
  'medeval': 'medieval',
  'mischievious': 'mischievous',
  'neice': 'niece',
  'nieghbor': 'neighbor', 'neighbour': 'neighbour',
  'noticable': 'noticeable',
  'paralel': 'parallel',
  'perseverence': 'perseverance',
  'posession': 'possession',
  'preceed': 'precede',
  'propogate': 'propagate',
  'recieve': 'receive',
  'responsability': 'responsibility', 'responsibilty': 'responsibility',
  'seize': 'seize', 'sieze': 'seize',
  'temperment': 'temperament',
  'thier': 'their', 'thre': 'their', 'ther': 'their',
  'truely': 'truly',
  'untill': 'until', 'unntil': 'until',
  'wilfull': 'willful',
  'youre': 'you\'re', 'ur': 'your',

  // ╔══ BUSINESS TERM MISSPELLINGS ══╗
  'invoce': 'invoice', 'invocie': 'invoice', 'inovoice': 'invoice',
  'contarct': 'contract', 'conrtact': 'contract',
  'delievery': 'delivery', 'deleivery': 'delivery',
  'paymant': 'payment', 'payement': 'payment',
  'qoutation': 'quotation', 'quoatation': 'quotation',
  'propseal': 'proposal', 'propsal': 'proposal',
  'requirment': 'requirement', 'requirments': 'requirements',
  'implemantation': 'implementation', 'implementaiton': 'implementation',
  'organazation': 'organization', 'organasation': 'organisation',
  'custommer': 'customer', 'cusotmer': 'customer', 'custumer': 'customer',
  'employe': 'employee', 'emploiyee': 'employee', 'emploeey': 'employee',
  'collegue': 'colleague', 'colleauge': 'colleague',
  'managment': 'management', 'mangement': 'management',
  'departmant': 'department', 'departament': 'department',
  'recrutment': 'recruitment', 'recruitement': 'recruitment',
  'purchace': 'purchase', 'purcase': 'purchase',
  'aqusition': 'acquisition', 'acqusition': 'acquisition',
  'negociate': 'negotiate', 'negociation': 'negotiation',
  'prosedure': 'procedure', 'procedre': 'procedure',
  'sertificate': 'certificate', 'certicifate': 'certificate',
  'authorazation': 'authorization', 'authoization': 'authorization',
  'acounnt': 'account', 'acount': 'account',
  'buisness': 'business', 'bussiness': 'business', 'busines': 'business',
  'catagory': 'category', 'catagories': 'categories',
  'comapny': 'company', 'compnay': 'company',
  'stategy': 'strategy', 'stratgey': 'strategy',
  'professionl': 'professional', 'proffessional': 'professional',
  'responsbility': 'responsibility',
  'colaborate': 'collaborate', 'colaberate': 'collaborate',
  'feedbackk': 'feedback',
  'calander': 'calendar',
  'meetting': 'meeting', 'metting': 'meeting',

  // ╔══ ABBREVIATIONS & SMS ══╗
  'asap': 'as soon as possible',
  'fyi': 'for your information',
  'imo': 'in my opinion',
  'btw': 'by the way',
  'lmk': 'let me know',
  'tbh': 'to be honest',
  'ngl': 'not going to lie',
  'eta': 'estimated time of arrival',
  'eod': 'end of day',
  'eow': 'end of week',
  'ooo': 'out of office',
  'wfh': 'working from home',
  'pls': 'please', 'plz': 'please', 'pleas': 'please',
  'thx': 'thanks', 'tnx': 'thanks', 'thnx': 'thanks',
  'u': 'you', 'ur': 'your',
  'r': 'are',
  'w/': 'with',
  'w/o': 'without',
  'b/c': 'because', 'bc': 'because',
  'approx': 'approximately',
  'dept': 'department',
  'mgmt': 'management',
  'ref': 'reference',
  'qty': 'quantity',
  'incl': 'including',
  'excl': 'excluding',
  'est': 'estimated',
  'asap': 'as soon as possible',
  'ps': 'P.S.',
  'etc': 'etc.', 'ect': 'etc.',
  'ie': 'i.e.',
  'eg': 'e.g.',

  // ╔══ PHONETIC/DYSLEXIA PATTERNS ══╗
  'acheive': 'achieve', 'achive': 'achieve',
  'aggreement': 'agreement', 'agreemnt': 'agreement',
  'bussines': 'business',
  'committe': 'committee',
  'correspondance': 'correspondence', 'correspondense': 'correspondence',
  'diferent': 'different', 'diffrent': 'different',
  'efficiant': 'efficient', 'efficent': 'efficient',
  'enegry': 'energy', 'enregy': 'energy',
  'excede': 'exceed',
  'flexable': 'flexible',
  'genious': 'genius',
  'happenned': 'happened',
  'interupt': 'interrupt',
  'judgement': 'judgment',
  'keybord': 'keyboard',
  'langauge': 'language', 'languige': 'language',
  'manageable': 'manageable', 'managable': 'manageable',
  'nineth': 'ninth',
  'ocasion': 'occasion',
  'ofcourse': 'of course',
  'performence': 'performance', 'performnce': 'performance',
  'questionaire': 'questionnaire',
  'reaminder': 'reminder', 'remaineder': 'remainder',
  'schdule': 'schedule',
  'specail': 'special', 'speical': 'special',
  'throguh': 'through', 'throught': 'through',
  'wether': 'whether', 'wheather': 'weather',
  'yeild': 'yield',
};

// ── Language detection ─────────────────────────────────────────

const LANG_HINTS_DA = ['og', 'er', 'det', 'en', 'at', 'ikke', 'med', 'til', 'fra', 'jeg', 'vi', 'de', 'den', 'han', 'hun', 'sig', 'sin', 'som', 'for', 'på', 'af', 'om', 'men', 'har', 'eller', 'hvis', 'når', 'men', 'skal', 'kan', 'vil', 'var', 'er', 'der'];
const LANG_HINTS_EN = ['the', 'and', 'is', 'are', 'was', 'were', 'have', 'has', 'will', 'would', 'should', 'could', 'can', 'for', 'with', 'this', 'that', 'from', 'they', 'their', 'our', 'your', 'we', 'you', 'it', 'he', 'she', 'not', 'but', 'if', 'when'];

function detectLanguageHint(text) {
  const words = text.toLowerCase().split(/\s+/);
  let da = 0, en = 0;
  words.forEach(w => {
    if (LANG_HINTS_DA.includes(w)) da++;
    if (LANG_HINTS_EN.includes(w)) en++;
  });
  if (en > da * 2) return 'en';
  if (da > en * 2) return 'da';
  return null;
}

// ── Smart input normalizer ─────────────────────────────────────
// Runs before draft generation. Returns { text, count } where
// count = number of corrections applied.

function normalizeInput(rawText, lang) {
  if (!rawText || !rawText.trim()) return { text: rawText, count: 0 };

  // Auto-detect language if the input seems different from UI language
  const detectedLang = detectLanguageHint(rawText);
  const effectiveLang = detectedLang || lang;

  let text = rawText;
  let count = 0;

  // ── Step 1: Whitespace cleanup ──────────────────────────────
  text = text.replace(/[ \t]{2,}/g, ' ');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  // ── Step 2: Remove double words ("og og", "er er") ─────────
  text = text.replace(/\b(\w{2,})\s+\1\b/gi, (match, w) => { count++; return w; });

  // ── Step 3: Word-level corrections ─────────────────────────
  const corrMap = effectiveLang === 'en' ? SMART_CORRECTIONS_EN : SMART_CORRECTIONS_DA;

  text = text.split('\n').map(line =>
    line.split(' ').map(token => {
      // Separate leading/trailing punctuation from the word
      const leading  = token.match(/^[^\wÀ-ɏ]*/)?.[0] || '';
      const trailing = token.match(/[^\wÀ-ɏ]*$/)?.[0] || '';
      const word     = token.slice(leading.length, token.length - trailing.length);
      const key      = word.toLowerCase();

      if (!key || key.length < 2) return token;

      const corrected = corrMap[key];
      if (corrected === undefined) return token;
      if (corrected === '') { count++; return ''; } // remove filler words
      if (corrected === key) return token; // no change needed

      count++;
      // Preserve original capitalisation style
      if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
        return leading + capitalizeFirst(corrected) + trailing;
      }
      if (word === word.toUpperCase() && word.length > 1) {
        return leading + corrected.toUpperCase() + trailing;
      }
      return leading + corrected + trailing;
    }).filter(t => t !== '').join(' ')
  ).join('\n');

  // ── Step 4: Fix run-together words / missing spaces ────────
  // e.g. "vihar" → "vi har", "detgår" → "det går" (basic heuristics)
  // Only apply for common Danish compound errors
  if (effectiveLang === 'da') {
    const runTogetherDA = [
      [/\bidag\b/gi, 'i dag'],
      [/\bimorgen\b/gi, 'i morgen'],
      [/\bigaar\b/gi, 'i går'],
      [/\bihvert\b/gi, 'i hvert'],
      [/\bpaagrund\b/gi, 'på grund'],
      [/\bogsa\b/gi, 'også'],
    ];
    runTogetherDA.forEach(([pattern, replacement]) => {
      const before = text;
      text = text.replace(pattern, replacement);
      if (text !== before) count++;
    });
  }

  // ── Step 5: Punctuation normalization ──────────────────────
  // Fix spaces before punctuation: "hej , verden" → "hej, verden"
  text = text.replace(/\s+([,;:.!?])/g, '$1');
  // Ensure space after punctuation before a letter
  text = text.replace(/([,;:.!?])([A-ZÆØÅa-zæøå])/g, '$1 $2');
  // Remove leading dots/dashes from lines (clean up stray punctuation)
  text = text.replace(/^[.\-–—]+\s*/gm, '');
  // Fix "..." to proper ellipsis
  text = text.replace(/\.{3,}/g, '…');

  // ── Step 6: Number/currency formatting ─────────────────────
  // "1000 kr" → "1.000 kr." for Danish
  if (effectiveLang === 'da') {
    text = text.replace(/\b(\d{4,})\s*(kr\.?|dkk)\b/gi, (_, num, cur) => {
      const formatted = parseInt(num, 10).toLocaleString('da-DK');
      count++;
      return `${formatted} ${cur.toLowerCase().replace(/\.?$/, '.')}`;
    });
  }

  // ── Step 7: Clean up empty lines left by removed tokens ────
  text = text.replace(/^\s*$/gm, '').replace(/\n{2,}/g, '\n');

  return { text: text.trim(), count };
}

// ── State ──────────────────────────────────────────────────────

let currentLang  = 'da';
let selectedTool = null;
let currentOutput = '';
let drafts       = [];
let tipIndex     = 0;
let currentView  = 'dashboard';
let userName     = '';

// ── Core helpers ───────────────────────────────────────────────

function t(key) {
  const v = LANG[currentLang][key];
  return v !== undefined ? v : (LANG['da'][key] ?? key);
}

function toolTitle(tool)  { return currentLang === 'en' ? tool.titleEn  : tool.titleDa; }
function toolDesc(tool)   { return currentLang === 'en' ? tool.descEn   : tool.descDa; }
function toolHint(tool)   { return currentLang === 'en' ? tool.hintEn   : tool.hintDa; }

function tipText(i) {
  const tip = TIPS[i % TIPS.length];
  return currentLang === 'en' ? tip.en : tip.da;
}

function formatDate(ts) {
  const d = new Date(ts);
  const pad = n => String(n).padStart(2, '0');
  if (currentLang === 'en') {
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
}

function today() {
  const d = new Date(), pad = n => String(n).padStart(2,'0');
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
}

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ── Note processing (unchanged logic) ─────────────────────────

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
    if (connector.endsWith(' ') && !connector.endsWith(': ')) {
      return connector + s.charAt(0).toLowerCase() + s.slice(1);
    }
    return connector + s;
  }).join(' ');
}

function notesToSteps(sentences, lang) {
  if (sentences.length === 0) {
    return [lang === 'da' ? '1. [Beskriv første trin]' : '1. [Describe first step]'];
  }
  return sentences.map((s, i) => `${i + 1}. ${s}`);
}

// ── Word replacement ───────────────────────────────────────────

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
  s = applyWordReplacements(s, lang);
  if (!/[.!?]$/.test(s)) s += '.';
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
    if (Math.random() > 0.5 && s.length < 120) {
      const starter = randomPick(starters);
      s = starter + s.charAt(0).toLowerCase() + s.slice(1);
    }
  }
  return capitalizeFirst(s);
}

// ── Draft generation (all 8 tools, unchanged) ─────────────────

function generateDraft(toolId, formData) {
  const { notes, customer, company, price, deadline, tone } = formData;
  const da = currentLang === 'da';
  const toneStyle = tone === t('tones')[2] ? 'direct'
    : tone === t('tones')[1] ? 'formal' : 'friendly';
  const sentences = processNotes(notes);
  const bodyParagraph = buildParagraph(sentences, currentLang, toneStyle);

  switch (toolId) {

    case 'kundemail': {
      const greeting = customer
        ? (da ? `Kære ${customer},` : `Dear ${customer},`)
        : (da ? 'Kære kunde,' : 'Dear customer,');
      const openers = da ? {
        friendly: ['Mange tak for din henvendelse — det var en fornøjelse at høre fra dig.', 'Tak for din mail. Vi sætter stor pris på din interesse.', 'Mange tak for, at du kontaktede os. Vi er glade for at høre fra dig.'],
        formal:   ['Vi bekræfter hermed modtagelsen af din henvendelse og takker for din interesse.', 'Vi har modtaget din forespørgsel og vender tilbage med det samme.', 'Tak for din henvendelse. Vi behandler den med høj prioritet.'],
        direct:   ['Tak for din henvendelse.', 'Vi har modtaget din besked.', 'Tak for din mail.'],
      } : {
        friendly: ['Thank you for reaching out — it\'s great to hear from you.', 'Thank you for your message. We really appreciate your interest.', 'Many thanks for contacting us. We\'re happy to hear from you.'],
        formal:   ['We hereby confirm receipt of your enquiry and thank you for your interest.', 'We have received your request and will respond promptly.', 'Thank you for your enquiry. We are treating it with high priority.'],
        direct:   ['Thank you for your enquiry.', 'We have received your message.', 'Thank you for your email.'],
      };
      const closers = da ? {
        friendly: 'Tøv endelig ikke med at kontakte os, hvis du har spørgsmål eller ønsker at høre mere. Vi glæder os til at hjælpe dig videre.',
        formal:   'Vi ser frem til et godt samarbejde og vender tilbage hurtigst muligt med yderligere information, såfremt det måtte ønskes.',
        direct:   'Kontakt os, hvis du har spørgsmål. Vi vender hurtigt tilbage.',
      } : {
        friendly: 'Please don\'t hesitate to reach out if you have any questions or would like to know more. We look forward to helping you.',
        formal:   'We look forward to a productive collaboration and will provide further information upon request at the earliest opportunity.',
        direct:   'Contact us if you have any questions. We will respond promptly.',
      };
      const sign = company || (da ? '[Virksomhedsnavn]' : '[Company name]');
      return [greeting, '', randomPick(openers[toneStyle]), '', bodyParagraph, '', closers[toneStyle], '', da ? 'Med venlig hilsen' : 'Kind regards,', sign].join('\n');
    }

    case 'tilbud': {
      const sign = company || (da ? '[Virksomhedsnavn]' : '[Company name]');
      const introLines = da
        ? ['Vi takker for muligheden for at afgive tilbud og fremsender hermed vores tilbud på den ønskede opgave.', 'Med reference til din forespørgsel fremsender vi hermed vores tilbud.', 'Vi er glade for at kunne fremsende følgende tilbud til dig.']
        : ['Thank you for the opportunity to submit a quotation. Please find our offer below.', 'With reference to your enquiry, we are pleased to submit the following quotation.', 'We are glad to present the following offer for the requested work.'];
      const scopeLines = sentences.map(s => `  • ${s}`);
      const terms = da
        ? [price ? `Pris: ${price} (ekskl. moms)` : '• Pris aftales nærmere efter godkendelse', deadline ? `Tilbuddet er gyldigt til: ${deadline}` : '• Tilbud er gyldigt i 30 dage fra dags dato', '• Eventuelle tillægsopgaver aftales og faktureres særskilt', '• Arbejdet igangsættes efter skriftlig accept', '• Betaling: 8 dage netto efter fakturadato']
        : [price ? `Price: ${price} (excl. VAT)` : '• Price to be agreed after approval', deadline ? `Quotation valid until: ${deadline}` : '• Quotation valid for 30 days from today', '• Any additional work will be agreed and invoiced separately', '• Work commences upon written acceptance', '• Payment: net 8 days from invoice date'];
      const outro = da ? {
        friendly: 'Vi håber, at ovenstående lever op til dine forventninger. Kontakt os gerne, hvis du har spørgsmål eller ønsker justeringer — vi finder altid en god løsning.',
        formal:   'Vi fremsender gerne yderligere dokumentation eller afholder et møde for at gennemgå tilbuddet i detaljer.',
        direct:   `Bekræft venligst tilbuddet${deadline ? ' inden ' + deadline : ' hurtigst muligt'}.`,
      } : {
        friendly: 'We hope this quotation meets your expectations. Feel free to reach out if you have questions or would like any adjustments.',
        formal:   'We are happy to provide further documentation or arrange a meeting to review the quotation in detail.',
        direct:   `Please confirm the quotation${deadline ? ' by ' + deadline : ' as soon as possible'}.`,
      };
      return [
        da ? `TILBUD${company ? ' — ' + company.toUpperCase() : ''}` : `QUOTATION${company ? ' — ' + company.toUpperCase() : ''}`,
        da ? `Dato: ${today()}` : `Date: ${today()}`,
        customer ? (da ? `Att.: ${customer}` : `Att.: ${customer}`) : '',
        '', '══════════════════════════════════════',
        da ? 'OPGAVEBESKRIVELSE' : 'SCOPE OF WORK',
        '══════════════════════════════════════', '',
        randomPick(introLines), '',
        da ? 'Opgaven omfatter:' : 'The work includes:',
        ...scopeLines, '',
        '══════════════════════════════════════',
        da ? 'BETINGELSER' : 'TERMS',
        '══════════════════════════════════════', '',
        ...terms, '',
        '══════════════════════════════════════', '',
        outro[toneStyle], '',
        da ? 'Med venlig hilsen' : 'Kind regards,', sign,
      ].filter(l => l !== '').join('\n');
    }

    case 'rykker': {
      const greeting = customer ? (da ? `Kære ${customer},` : `Dear ${customer},`) : (da ? 'Kære kunde,' : 'Dear customer,');
      const sign = company || (da ? '[Virksomhedsnavn]' : '[Company name]');
      const invoiceMatch = notes.match(/(?:faktura|invoice|fakt\.?|inv\.?)\s*[#nr.]*\s*([\w-]+)/i);
      const invoiceRef = invoiceMatch ? invoiceMatch[1] : null;
      const priceStr   = price    ? (da ? ` på kr. ${price}` : ` for ${price}`)           : '';
      const invoiceStr = invoiceRef ? (da ? ` (faktura ${invoiceRef})` : ` (invoice ${invoiceRef})`) : '';
      const dueStr     = deadline  ? (da ? ` med forfaldsdato ${deadline}` : ` with a due date of ${deadline}`) : '';
      const openers = da ? {
        friendly: `Vi tillader os venligst at minde dig om en udestående betaling${priceStr}${invoiceStr}${dueStr}.`,
        formal:   `I henhold til vores betalingsbetingelser henleder vi opmærksomheden på en forfalden betaling${priceStr}${invoiceStr}${dueStr}.`,
        direct:   `Vi rykker hermed for betaling${priceStr}${invoiceStr}${dueStr}.`,
      } : {
        friendly: `We kindly remind you of an outstanding payment${priceStr}${invoiceStr}${dueStr}.`,
        formal:   `In accordance with our payment terms, we draw your attention to an overdue payment${priceStr}${invoiceStr}${dueStr}.`,
        direct:   `We hereby chase payment${priceStr}${invoiceStr}${dueStr}.`,
      };
      const extras = sentences.filter(s => !s.toLowerCase().includes('faktura') && !s.toLowerCase().includes('invoice'));
      const extraPara = extras.length > 0 ? buildParagraph(extras, currentLang, toneStyle) : '';
      const closers = da ? {
        friendly: 'Hvis betalingen allerede er afsendt, beder vi dig venligst se bort fra denne påmindelse. Kontakt os endelig, hvis der er spørgsmål til fakturaen — vi finder gerne en løsning.',
        formal:   'Såfremt betalingen allerede er effektueret, bedes dette meddeles. I modsat fald beder vi om betaling inden for 5 hverdage.',
        direct:   'Overførsel bedes foretaget snarest. Kontakt os ved spørgsmål.',
      } : {
        friendly: 'If payment has already been sent, please disregard this reminder. Feel free to contact us if you have any questions about the invoice.',
        formal:   'If payment has already been made, please notify us accordingly. Otherwise, we kindly request payment within 5 business days.',
        direct:   'Please arrange payment immediately. Contact us if you have questions.',
      };
      return [greeting, '', openers[toneStyle], '', extraPara || '', extraPara ? '' : null, closers[toneStyle], '', da ? 'Med venlig hilsen' : 'Kind regards,', sign].filter(l => l !== null).join('\n');
    }

    case 'facebook': {
      const co = company || (da ? 'os' : 'us');
      const coNamed = company || (da ? 'Vi' : 'We');
      const hook = sentences[0] || notes.split('\n')[0];
      const body = sentences.slice(1);
      const hooks = da ? {
        friendly: [`🔥 ${hook}`, `✨ ${hook}`, `👉 ${hook}`],
        formal:   [`${coNamed} er glade for at kunne tilbyde: ${hook.toLowerCase().replace(/\.$/, '')}`, `Ny mulighed hos ${co}: ${hook}`],
        direct:   [`${hook}`],
      } : {
        friendly: [`🔥 ${hook}`, `✨ ${hook}`, `👉 ${hook}`],
        formal:   [`${coNamed} is pleased to offer: ${hook.toLowerCase().replace(/\.$/, '')}`, `New opportunity at ${co}: ${hook}`],
        direct:   [`${hook}`],
      };
      const bodyText = body.length > 0 ? buildParagraph(body, currentLang, toneStyle) : '';
      const ctas = da ? {
        friendly: [`Skriv til os i dag — vi er klar til at hjælpe! 😊`, `Ring eller skriv til os — vi glæder os til at høre fra dig! 📞`, `Book tid hos ${co} allerede i dag — det er nemt og uforpligtende! 👇`],
        formal:   [`Kontakt ${co} for yderligere information.`, `Vi besvarer gerne henvendelser om ovenstående.`],
        direct:   [`Kontakt os nu. 👇`, `Ring eller skriv i dag.`],
      } : {
        friendly: [`Message us today — we're ready to help! 😊`, `Call or message us — we'd love to hear from you! 📞`, `Book with ${co} today — easy and no obligation! 👇`],
        formal:   [`Contact ${co} for further information.`, `We are happy to respond to enquiries about the above.`],
        direct:   [`Contact us now. 👇`, `Call or write today.`],
      };
      const hashtagsDa = ['#lokalterhvervsliv', '#småvirksomheder'];
      const hashtagsEn = ['#localbusiness', '#smallbusiness'];
      if (company) {
        const tag = '#' + company.replace(/[\s\W]+/g, '');
        if (da) hashtagsDa.push(tag); else hashtagsEn.push(tag);
      }
      const hashtags = da ? hashtagsDa : hashtagsEn;
      return [randomPick(hooks[toneStyle]), '', bodyText || '', bodyText ? '' : null, randomPick(ctas[toneStyle]), '', `📍 ${company || (da ? '[Bynavn]' : '[City]')}`, `📞 ${da ? '[Tlf. nummer]' : '[Phone number]'}`, `🌐 ${da ? '[Hjemmeside]' : '[Website]'}`, '', hashtags.join(' ')].filter(l => l !== null).join('\n');
    }

    case 'sop': {
      const title = sentences[0] ? sentences[0].replace(/\.$/, '') : (da ? 'Arbejdsinstruktion' : 'Work Instruction');
      const steps = notesToSteps(sentences, currentLang);
      const stepsFormatted = steps.map(step => {
        const isSafety = /sikker|advar|pas på|forbudt|obs|vigtigt|safety|warning|caution|important|forbidden/i.test(step);
        return isSafety ? step + (da ? '  ⚠️ Vigtigt!' : '  ⚠️ Important!') : step;
      });
      return [
        da ? 'STANDARD ARBEJDSINSTRUKTION (SOP)' : 'STANDARD OPERATING PROCEDURE (SOP)',
        company ? (da ? `Virksomhed: ${company}` : `Company: ${company}`) : '',
        da ? `Dato: ${today()}  |  Version: 1.0` : `Date: ${today()}  |  Version: 1.0`,
        '', '══════════════════════════════════════',
        da ? '1. FORMÅL' : '1. PURPOSE',
        '══════════════════════════════════════',
        da ? `Denne instruktion beskriver den korrekte fremgangsmåde for: ${title.toLowerCase()}.` : `This instruction describes the correct procedure for: ${title.toLowerCase()}.`,
        '', '══════════════════════════════════════',
        da ? '2. ANSVARSFORDELING' : '2. RESPONSIBILITIES',
        '══════════════════════════════════════',
        da ? '• Ansvarlig for udførelse:  [Navn / stilling]' : '• Responsible for execution:  [Name / position]',
        da ? '• Godkendt af:              [Leder / navn]' : '• Approved by:              [Manager / name]',
        da ? '• Gælder for:               [Afdeling / alle]' : '• Applies to:               [Department / all]',
        '', '══════════════════════════════════════',
        da ? '3. FREMGANGSMÅDE' : '3. PROCEDURE',
        '══════════════════════════════════════', '',
        ...stepsFormatted,
        '', '══════════════════════════════════════',
        da ? '4. KVALITET OG SIKKERHED' : '4. QUALITY & SAFETY',
        '══════════════════════════════════════',
        da ? '• Kontrollér resultatet, inden opgaven afleveres' : '• Verify the result before handing over the task',
        da ? '• Overhold gældende sikkerhedsforskrifter og arbejdsmiljøregler' : '• Follow applicable safety and work environment regulations',
        da ? '• Rapportér straks afvigelser til nærmeste leder' : '• Report deviations immediately to the nearest manager',
        da ? '• Brug altid godkendt udstyr og materialer' : '• Always use approved equipment and materials',
        '', '══════════════════════════════════════',
        da ? '5. AFSLUTNINGSKONTROL' : '5. COMPLETION CHECKLIST',
        '══════════════════════════════════════',
        da ? '[ ] Opgaven er udført korrekt og kontrolleret' : '[ ] Task completed correctly and verified',
        da ? '[ ] Arbejdsplads efterladt i ordentlig stand' : '[ ] Workplace left in proper condition',
        da ? '[ ] Afvigelser registreret (hvis relevant)' : '[ ] Deviations recorded (if applicable)',
        da ? '[ ] Næste ansvarlige informeret' : '[ ] Next responsible person informed',
        da ? '[ ] Dokumentation udfyldt og arkiveret' : '[ ] Documentation completed and filed',
      ].filter(l => l !== '').join('\n');
    }

    case 'tjekliste': {
      const rawLines = notes.split('\n').map(l => l.replace(/^[-–•*\d.)>\s]+/, '').trim()).filter(Boolean);
      const groups = [];
      let currentGroup = { header: '', items: [] };
      rawLines.forEach(line => {
        if ((line.endsWith(':') && line.length < 60) || /^[A-ZÆØÅ\s]{3,30}$/.test(line)) {
          if (currentGroup.items.length > 0 || currentGroup.header) groups.push(currentGroup);
          currentGroup = { header: line.replace(/:$/, ''), items: [] };
        } else {
          currentGroup.items.push(capitalizeFirst(line));
        }
      });
      if (currentGroup.items.length > 0) groups.push(currentGroup);
      const totalItems = rawLines.filter(l => !l.endsWith(':') && !/^[A-ZÆØÅ\s]{3,30}$/.test(l)).length;
      const out = [da ? 'TJEKLISTE' : 'CHECKLIST', da ? `Oprettet: ${today()}` : `Created: ${today()}`, da ? `Samlet antal punkter: ${totalItems}` : `Total items: ${totalItems}`, ''];
      if (groups.length === 0 || (groups.length === 1 && !groups[0].header)) {
        const items = groups[0]?.items || [];
        items.forEach(item => out.push(`[ ] ${item}`));
      } else {
        groups.forEach(g => {
          if (g.header) { out.push(''); out.push(`▸ ${g.header.toUpperCase()}`); }
          g.items.forEach(item => out.push(`[ ] ${item}`));
        });
      }
      out.push('', '─────────────────────────────', da ? `Afkrydsede punkter: ___ / ${totalItems}` : `Checked items: ___ / ${totalItems}`);
      return out.join('\n');
    }

    case 'onboarding': {
      const emp = customer || (da ? 'den nye medarbejder' : 'the new employee');
      const co  = company  || (da ? '[Virksomhedsnavn]'  : '[Company name]');
      const startDate = deadline || (da ? '[indsæt startdato]' : '[insert start date]');
      const practicalNotes = sentences.filter(s => /system|adgang|login|kode|kort|nøgle|bil|telefon|pc|computer|access|key|phone|car|password/i.test(s));
      const trainingNotes  = sentences.filter(s => /kursus|oplæring|træning|lær|certificer|uddannelse|training|course|learn|certif/i.test(s));
      const taskNotes      = sentences.filter(s => !practicalNotes.includes(s) && !trainingNotes.includes(s));
      return [
        da ? 'ONBOARDINGPLAN' : 'ONBOARDING PLAN',
        da ? `Medarbejder: ${emp}` : `Employee: ${emp}`,
        da ? `Virksomhed: ${co}` : `Company: ${co}`,
        da ? `Startdato: ${startDate}` : `Start date: ${startDate}`,
        da ? `Udarbejdet: ${today()}` : `Created: ${today()}`,
        '', '══════════════════════════════════════',
        da ? 'DAG 1 — VELKOMMEN' : 'DAY 1 — WELCOME',
        '══════════════════════════════════════',
        da ? `[ ] Velkomst og introduktion hos ${co}` : `[ ] Welcome and introduction at ${co}`,
        da ? '[ ] Rundvisning på arbejdspladsen' : '[ ] Tour of the workplace',
        da ? '[ ] Præsentation for kollegerne' : '[ ] Introduction to colleagues',
        da ? '[ ] Gennemgang af praktiske regler og politikker' : '[ ] Overview of practical rules and policies',
        da ? `[ ] Notits: ${emp} introduceres til sin primære kontaktperson` : `[ ] Note: ${emp} is introduced to their primary contact`,
        '', '══════════════════════════════════════',
        da ? 'PRAKTISK OPSÆTNING' : 'PRACTICAL SETUP',
        '══════════════════════════════════════',
        da ? '[ ] Login og adgangskoder til relevante systemer' : '[ ] Logins and passwords for relevant systems',
        da ? '[ ] Email, kalender og kommunikationsværktøjer' : '[ ] Email, calendar and communication tools',
        da ? '[ ] Nødvendigt udstyr og arbejdsredskaber' : '[ ] Required equipment and tools',
        da ? '[ ] Nøgler, adgangskort og parkeringspladser' : '[ ] Keys, access cards and parking',
        ...practicalNotes.map(s => `[ ] ${s}`),
        '', '══════════════════════════════════════',
        da ? 'FØRSTE UGE — INTRODUKTION' : 'FIRST WEEK — INTRODUCTION',
        '══════════════════════════════════════',
        da ? '[ ] Introduktion til arbejdsopgaver og ansvarsområder' : '[ ] Introduction to tasks and responsibilities',
        da ? '[ ] Introduktion til vigtige samarbejdspartnere og kunder' : '[ ] Introduction to key partners and customers',
        da ? '[ ] Gennemgang af processer og arbejdsgange' : '[ ] Overview of processes and workflows',
        ...taskNotes.map(s => `[ ] ${s}`),
        '', '══════════════════════════════════════',
        da ? 'OPLÆRING OG KURSER' : 'TRAINING & COURSES',
        '══════════════════════════════════════',
        da ? '[ ] Introduktion til interne systemer og platforme' : '[ ] Introduction to internal systems and platforms',
        da ? '[ ] Nødvendig faglig oplæring aftalt med leder' : '[ ] Required professional training agreed with manager',
        ...trainingNotes.map(s => `[ ] ${s}`),
        '', '══════════════════════════════════════',
        da ? 'OPFØLGNING — FØRSTE MÅNED' : 'FOLLOW-UP — FIRST MONTH',
        '══════════════════════════════════════',
        da ? '[ ] Check-in møde med leder (uge 2)' : '[ ] Check-in meeting with manager (week 2)',
        da ? '[ ] Faglig evaluering og feedback (uge 4)' : '[ ] Professional evaluation and feedback (week 4)',
        da ? '[ ] Evt. justeringer til onboardingplanen' : '[ ] Any adjustments to the onboarding plan',
        da ? `[ ] ${emp} bekræfter at have modtaget og forstået onboardingplanen` : `[ ] ${emp} confirms receipt and understanding of the onboarding plan`,
        '', '─────────────────────────────',
        da ? `Underskrift (${emp}): _________________________  Dato: _______` : `Signature (${emp}): _________________________  Date: _______`,
        da ? `Underskrift (leder): _________________________  Dato: _______` : `Signature (manager): _________________________  Date: _______`,
      ].filter(l => l !== '').join('\n');
    }

    case 'professionel': {
      const originalSentences = notes.split(/(?<=[.!?\n])\s+|[\n\r]+/).map(s => s.trim()).filter(Boolean);
      const rewritten = originalSentences.map(s => rewriteSentenceProfessionally(s, currentLang, toneStyle));
      const paragraphs = [];
      let chunk = [];
      rewritten.forEach((s, i) => {
        chunk.push(s);
        if (chunk.length === 3 || i === rewritten.length - 1) { paragraphs.push(chunk.join(' ')); chunk = []; }
      });
      const versionLabel = da
        ? toneStyle === 'formal' ? 'FORMEL VERSION' : toneStyle === 'direct' ? 'KORT OG DIREKTE VERSION' : 'PROFESSIONEL VERSION'
        : toneStyle === 'formal' ? 'FORMAL VERSION'  : toneStyle === 'direct' ? 'SHORT & DIRECT VERSION'  : 'PROFESSIONAL VERSION';
      return [
        da ? '── ORIGINALTEKST ──' : '── ORIGINAL TEXT ──', '', notes, '', '',
        `── ${versionLabel} ──`, '',
        ...paragraphs, '',
        da ? '── Gennemgå og tilpas teksten. Dette er et udkast. ──' : '── Review and adjust the text. This is a draft. ──',
      ].join('\n');
    }

    default:
      return da ? 'Vælg venligst et gyldigt værktøj.' : 'Please select a valid tool.';
  }
}

// ── LocalStorage ───────────────────────────────────────────────

function loadDrafts() {
  try { drafts = JSON.parse(localStorage.getItem('smv_drafts') || '[]'); }
  catch { drafts = []; }
}

function saveDraftsToStorage() {
  localStorage.setItem('smv_drafts', JSON.stringify(drafts));
}

function loadSettings() {
  currentLang = localStorage.getItem('smv_lang') || 'da';
  userName    = localStorage.getItem('smv_user') || '';
}

function saveSettings() {
  localStorage.setItem('smv_lang', currentLang);
  localStorage.setItem('smv_user', userName);
}

// ── Navigation ──────────────────────────────────────────────────

function showView(viewId) {
  currentView = viewId;
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById('view-' + viewId);
  if (el) el.classList.remove('hidden');

  document.querySelectorAll('.nav-item[data-nav]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === viewId);
  });
}

// ── Sidebar tool nav ────────────────────────────────────────────

function renderSidebarToolNav() {
  const container = document.getElementById('toolsNav');
  container.innerHTML = '';
  TOOLS.forEach(tool => {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.dataset.toolId = tool.id;
    btn.innerHTML = `<span class="nav-tool-emoji">${tool.icon}</span><span class="nav-label">${toolTitle(tool)}</span>`;
    btn.addEventListener('click', () => openTool(tool));
    container.appendChild(btn);
  });
}

// ── Dashboard rendering ─────────────────────────────────────────

function renderDashboardGreeting() {
  const el = document.getElementById('dashGreeting');
  const sub = document.getElementById('dashSub');
  if (el) el.textContent = t('greeting')(userName);
  if (sub) sub.textContent = t('greetingSub');
}

function renderDashboardTools() {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  TOOLS.forEach(tool => {
    const colors = TOOL_COLORS[tool.id] || { bg: '#f3f4f6', icon: '#6b7280' };
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', toolTitle(tool));
    card.innerHTML = `
      <div class="tool-card-icon-wrap" style="background:${colors.bg};">
        <span style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));">${tool.icon}</span>
      </div>
      <div class="tool-card-name">${toolTitle(tool)}</div>
      <div class="tool-card-desc">${toolDesc(tool)}</div>
      <span class="tool-card-arrow">→</span>
    `;
    card.addEventListener('click', () => openTool(tool));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTool(tool); }
    });
    grid.appendChild(card);
  });
}

function renderRecentDrafts() {
  const container = document.getElementById('recentDraftsList');
  if (!container) return;
  container.innerHTML = '';
  if (drafts.length === 0) {
    container.innerHTML = `<p class="recent-empty">${currentLang === 'da' ? 'Ingen gemte udkast endnu — brug et af de 8 værktøjer til at lave det første.' : 'No saved drafts yet — use one of the 8 tools to create the first one.'}</p>`;
    return;
  }
  const recent = [...drafts].reverse().slice(0, 4);
  recent.forEach((draft, ri) => {
    const realIndex = drafts.length - 1 - ri;
    const tool   = TOOLS.find(t => t.id === draft.toolId);
    const colors = TOOL_COLORS[draft.toolId] || { bg: '#f3f4f6', icon: '#6b7280' };
    const name   = tool ? toolTitle(tool) : draft.toolId;
    const icon   = tool?.icon || '📝';
    const preview = draft.text.replace(/\n/g, ' ').substring(0, 80) + (draft.text.length > 80 ? '…' : '');
    const item = document.createElement('div');
    item.className = 'recent-draft-item';
    item.innerHTML = `
      <div class="recent-draft-icon" style="background:${colors.bg};">${icon}</div>
      <div class="recent-draft-info">
        <div class="recent-draft-tool">${name}</div>
        <div class="recent-draft-preview">${preview}</div>
      </div>
      <div class="recent-draft-date">${formatDate(draft.ts)}</div>
    `;
    item.addEventListener('click', () => openDraft(realIndex));
    container.appendChild(item);
  });
}

// ── Tips cycling ────────────────────────────────────────────────

function renderTip() {
  const body = document.getElementById('tipBody');
  const prog = document.getElementById('tipProgress');
  if (body) body.textContent = tipText(tipIndex);
  if (prog) {
    prog.innerHTML = '';
    TIPS.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'tip-dot' + (i === tipIndex % TIPS.length ? ' active' : '');
      prog.appendChild(dot);
    });
  }
}

// ── Tool view ────────────────────────────────────────────────────

function openTool(tool) {
  selectedTool  = tool;
  currentOutput = '';
  showView('tool');
  updateToolNav();
  renderToolWorkspace();
  renderToolTips();

  const outputCard = document.getElementById('outputCard');
  if (outputCard) outputCard.classList.add('hidden');
  currentOutput = '';

  document.getElementById('notesInput').value = '';
  document.getElementById('customerInput').value = '';
  document.getElementById('companyInput').value = '';
  document.getElementById('priceInput').value = '';
  document.getElementById('deadlineInput').value = '';
  document.getElementById('charCount').textContent = currentLang === 'da' ? '0 tegn' : '0 characters';

  window.scrollTo({ top: 0 });
}

function updateToolNav() {
  document.querySelectorAll('.nav-item[data-tool-id]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.toolId === selectedTool?.id);
  });
}

function renderToolWorkspace() {
  if (!selectedTool) return;
  const colors = TOOL_COLORS[selectedTool.id] || { bg: '#f3f4f6', icon: '#6b7280' };

  // Topbar
  const tbIcon  = document.getElementById('toolbarIcon');
  const tbTitle = document.getElementById('toolbarTitle');
  if (tbIcon)  tbIcon.textContent  = selectedTool.icon;
  if (tbTitle) tbTitle.textContent = toolTitle(selectedTool);

  // Card header
  const hIcon = document.getElementById('toolHeaderIconWrap');
  const hHead = document.getElementById('toolCardHeading');
  const hSub  = document.getElementById('toolCardSubtext');
  if (hIcon) {
    hIcon.style.background = colors.bg;
    hIcon.innerHTML = `<span style="font-size:1.4rem;">${selectedTool.icon}</span>`;
  }
  if (hHead) hHead.textContent = toolTitle(selectedTool);
  if (hSub)  hSub.textContent  = toolDesc(selectedTool);

  // Notes
  document.getElementById('notesInput').placeholder = toolHint(selectedTool);
  document.getElementById('notesLabel').textContent  = t('notesLabel');

  // Optional fields
  const fields = selectedTool.fields;
  setFieldVisible('fieldCustomer', fields.includes('customer'));
  setFieldVisible('fieldCompany',  fields.includes('company'));
  setFieldVisible('fieldPrice',    fields.includes('price'));
  setFieldVisible('fieldDeadline', fields.includes('deadline'));
  setFieldVisible('fieldTone',     fields.includes('tone'));
  document.getElementById('optionalFieldsSection').style.display = fields.length > 0 ? '' : 'none';

  // Labels
  setLabelText('customerLabel', t('customerLabel'));
  setLabelText('companyLabel',  t('companyLabel'));
  setLabelText('priceLabel',    t('priceLabel'));
  setLabelText('deadlineLabel', t('deadlineLabel'));
  setLabelText('toneLabel',     t('toneLabel'));
  const optTitle = document.getElementById('optionalTitle');
  if (optTitle) optTitle.textContent = t('optionalFields');

  // Tone pills
  renderTonePills();

  // Buttons
  setTextById('generateBtnText', t('generateBtn'));
  setTextById('copyBtnText',     t('copyBtn'));
  setTextById('saveBtnText',     t('saveBtn'));
  setTextById('downloadBtnText', t('downloadBtn'));
  setTextById('outputLabel',     t('outputLabel'));
}

function renderTonePills() {
  const container = document.getElementById('tonePills');
  const select    = document.getElementById('toneSelect');
  if (!container) return;
  container.innerHTML = '';
  const tones = t('tones');
  tones.forEach((tone, i) => {
    const btn = document.createElement('button');
    btn.className = 'tone-pill' + (i === 0 ? ' active' : '');
    btn.textContent = tone;
    btn.type = 'button';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tone-pill').forEach((p, pi) => {
        p.classList.toggle('active', pi === i);
        p.setAttribute('aria-checked', pi === i ? 'true' : 'false');
      });
      if (select) select.selectedIndex = i;
    });
    container.appendChild(btn);
  });
  // Sync select options
  if (select) {
    select.innerHTML = tones.map(tone => `<option value="${tone}">${tone}</option>`).join('');
  }
}

function renderToolTips() {
  if (!selectedTool) return;
  const tips = TOOL_TIPS[selectedTool.id];
  if (!tips) return;
  const items = document.getElementById('toolTipItems');
  const icon  = document.getElementById('toolTipWidgetIcon');
  if (icon)  icon.textContent = selectedTool.icon;
  if (!items) return;
  items.innerHTML = '';
  const list = currentLang === 'en' ? tips.en : tips.da;
  list.forEach(tip => {
    const div = document.createElement('div');
    div.className = 'tool-tip-item';
    div.textContent = tip;
    items.appendChild(div);
  });
}

// ── Drafts view ──────────────────────────────────────────────────

function renderDraftsList() {
  const container = document.getElementById('draftsList');
  if (!container) return;
  const badge = document.getElementById('draftsCount');
  if (badge) {
    if (drafts.length > 0) {
      badge.textContent = drafts.length;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  }

  if (drafts.length === 0) {
    container.innerHTML = `<div class="drafts-empty">${t('draftsEmpty').replace('\n', '<br>')}</div>`;
    return;
  }

  container.innerHTML = '';
  [...drafts].reverse().forEach((draft, ri) => {
    const realIndex = drafts.length - 1 - ri;
    const tool   = TOOLS.find(t => t.id === draft.toolId);
    const colors = TOOL_COLORS[draft.toolId] || { bg: '#f3f4f6', icon: '#6b7280' };
    const name   = tool ? toolTitle(tool) : draft.toolId;
    const icon   = tool?.icon || '📝';
    const preview = draft.text.replace(/\n/g, ' ').substring(0, 100) + (draft.text.length > 100 ? '…' : '');

    const item = document.createElement('div');
    item.className = 'draft-item';
    item.innerHTML = `
      <div class="draft-icon" style="background:${colors.bg};">${icon}</div>
      <div class="draft-content">
        <div class="draft-top">
          <span class="draft-tool-name">${name}</span>
          <span class="draft-date">${formatDate(draft.ts)}</span>
        </div>
        <div class="draft-preview">${preview}</div>
      </div>
      <div class="draft-actions">
        <button class="btn btn-sm btn-icon-text">${t('openBtn')}</button>
        <button class="btn btn-sm btn-success">${t('copyDraftBtn')}</button>
        <button class="btn btn-sm btn-danger-ghost">${t('deleteBtn')}</button>
      </div>
    `;
    const [openBtn, copyBtn, delBtn] = item.querySelectorAll('button');
    openBtn.addEventListener('click', () => openDraft(realIndex));
    copyBtn.addEventListener('click', () => copyDraft(realIndex));
    delBtn.addEventListener('click',  () => deleteDraft(realIndex));
    container.appendChild(item);
  });
}

// ── Help view ────────────────────────────────────────────────────

function renderHelpView() {
  const grid = document.getElementById('helpGrid');
  if (!grid) return;
  grid.innerHTML = '';
  HELP_CONTENT.forEach(section => {
    const title = currentLang === 'en' ? section.titleEn : section.titleDa;
    const items = currentLang === 'en' ? section.itemsEn : section.itemsDa;
    const card = document.createElement('div');
    card.className = 'help-card';
    card.innerHTML = `
      <div class="help-card-title">${title}</div>
      <div class="help-card-body">
        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Actions ───────────────────────────────────────────────────────

function showCorrectionBadge(count) {
  let badge = document.getElementById('correctionBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'correctionBadge';
    badge.className = 'correction-badge';
    const wrap = document.getElementById('notesInput')?.parentNode;
    if (wrap) wrap.appendChild(badge);
  }
  if (count > 0) {
    badge.textContent = currentLang === 'da'
      ? `✓ Rettede ${count} stavefejl automatisk`
      : `✓ Auto-corrected ${count} spelling ${count === 1 ? 'error' : 'errors'}`;
    badge.classList.add('visible');
    clearTimeout(badge._t);
    badge._t = setTimeout(() => badge.classList.remove('visible'), 5000);
  } else {
    badge.classList.remove('visible');
  }
}

function normalizeField(fieldId) {
  const el = document.getElementById(fieldId);
  if (!el || !el.value.trim()) return el?.value.trim() || '';
  const { text } = normalizeInput(el.value.trim(), currentLang);
  return text;
}

function handleGenerate() {
  const rawNotes = document.getElementById('notesInput').value.trim();
  if (!rawNotes) {
    const ta = document.getElementById('notesInput');
    ta.classList.add('input-error');
    showToast(t('validationMsg'), 'error');
    ta.focus();
    setTimeout(() => ta.classList.remove('input-error'), 3000);
    return;
  }

  const btn  = document.getElementById('generateBtn');
  const text = document.getElementById('generateBtnText');
  if (text) text.textContent = t('generating');
  btn.disabled = true;
  btn.classList.add('loading');

  setTimeout(() => {
    // ── Smart input normalization ──────────────────────────
    const { text: cleanNotes, count } = normalizeInput(rawNotes, currentLang);
    showCorrectionBadge(count);

    const tones = t('tones');
    const toneIndex = document.getElementById('toneSelect').selectedIndex;
    const formData = {
      notes:    cleanNotes,
      customer: normalizeField('customerInput'),
      company:  normalizeField('companyInput'),
      price:    document.getElementById('priceInput').value.trim(),
      deadline: document.getElementById('deadlineInput').value.trim(),
      tone:     tones[toneIndex] || tones[0],
    };

    currentOutput = generateDraft(selectedTool.id, formData);
    document.getElementById('outputBox').textContent = currentOutput;
    const oc = document.getElementById('outputCard');
    oc.classList.remove('hidden');
    oc.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (text) text.textContent = t('generateBtn');
    btn.disabled = false;
    btn.classList.remove('loading');
  }, 300);
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
  renderDraftsList();
  renderRecentDrafts();
  showToast(t('savedMsg'), 'success');
}

function clearOutput() {
  if (!currentOutput) return;
  if (!confirm(t('clearConfirm'))) return;
  currentOutput = '';
  document.getElementById('outputBox').textContent = '';
  document.getElementById('outputCard').classList.add('hidden');
}

function downloadOutput() {
  if (!currentOutput || !selectedTool) return;
  const filename = toolTitle(selectedTool).replace(/[^a-zA-Z0-9æøåÆØÅ]/gi, '_') + '_' + Date.now() + '.txt';
  const blob = new Blob([currentOutput], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function openDraft(i) {
  const draft = drafts[i];
  if (!draft) return;
  const tool = TOOLS.find(t => t.id === draft.toolId);
  if (tool) openTool(tool);
  currentOutput = draft.text;
  document.getElementById('outputBox').textContent = currentOutput;
  document.getElementById('outputCard').classList.remove('hidden');
  document.getElementById('outputCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function copyDraft(i) {
  const draft = drafts[i];
  if (!draft) return;
  navigator.clipboard.writeText(draft.text).then(() => {
    showToast(t('copiedMsg'), 'success');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = draft.text;
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(t('copiedMsg'), 'success');
  });
}

function deleteDraft(i) {
  drafts.splice(i, 1);
  saveDraftsToStorage();
  renderDraftsList();
  renderRecentDrafts();
  showToast(t('deletedMsg'));
}

// ── Language ───────────────────────────────────────────────────────

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('smv_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  updateAll();
}

function updateAll() {
  renderSidebarToolNav();
  renderDashboardGreeting();
  renderDashboardTools();
  renderRecentDrafts();
  renderTip();
  renderDraftsList();
  renderHelpView();
  if (selectedTool && currentView === 'tool') {
    renderToolWorkspace();
    renderToolTips();
  }
}

// ── Settings ───────────────────────────────────────────────────────

function applyUserToUI() {
  const av   = document.getElementById('userAvatar');
  const name = document.getElementById('sidebarUserName');
  const input = document.getElementById('userNameInput');
  if (av)   av.textContent   = userName ? userName[0].toUpperCase() : 'P';
  if (name) name.textContent = userName || 'Patrice';
  if (input) input.value     = userName;
}

// ── Helpers ─────────────────────────────────────────────────────────

function setFieldVisible(id, visible) {
  const el = document.getElementById(id);
  if (el) el.style.display = visible ? '' : 'none';
}

function setLabelText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setTextById(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function updateCharCount() {
  const len = document.getElementById('notesInput').value.length;
  const el  = document.getElementById('charCount');
  if (el) el.textContent = `${len} ${currentLang === 'da' ? 'tegn' : 'characters'}`;
}

// ── Init ─────────────────────────────────────────────────────────────

function init() {
  loadSettings();
  loadDrafts();
  document.documentElement.lang = currentLang;

  // Initial render
  applyUserToUI();
  renderSidebarToolNav();
  renderDashboardGreeting();
  renderDashboardTools();
  renderRecentDrafts();
  renderTip();
  renderDraftsList();
  renderHelpView();

  // Navigation — sidebar nav items
  document.querySelectorAll('.nav-item[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.dataset.nav;
      if (nav === 'dashboard') {
        selectedTool = null;
        renderRecentDrafts();
        renderDraftsList();
      }
      showView(nav);
    });
  });

  // Link buttons (e.g. "Se alle →")
  document.querySelectorAll('[data-nav]').forEach(el => {
    if (el.classList.contains('link-btn')) {
      el.addEventListener('click', () => {
        showView(el.dataset.nav);
      });
    }
  });

  // Lang toggle (all instances)
  document.addEventListener('click', e => {
    if (e.target.classList.contains('lang-btn') && e.target.dataset.lang) {
      setLang(e.target.dataset.lang);
    }
  });

  // Back button
  document.getElementById('backBtn')?.addEventListener('click', () => {
    selectedTool = null;
    renderRecentDrafts();
    renderDraftsList();
    showView('dashboard');
  });

  // Generate
  document.getElementById('generateBtn')?.addEventListener('click', handleGenerate);

  // Ctrl+Enter
  document.getElementById('notesInput')?.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); handleGenerate(); }
  });

  // Char count
  document.getElementById('notesInput')?.addEventListener('input', updateCharCount);

  // Output actions
  document.getElementById('copyBtn')?.addEventListener('click', copyOutput);
  document.getElementById('saveBtn')?.addEventListener('click', saveDraft);
  document.getElementById('downloadBtn')?.addEventListener('click', downloadOutput);
  document.getElementById('clearBtn')?.addEventListener('click', clearOutput);

  // Tip cycling
  document.getElementById('tipNextBtn')?.addEventListener('click', () => {
    tipIndex = (tipIndex + 1) % TIPS.length;
    renderTip();
  });

  // Settings — save
  document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
    const input = document.getElementById('userNameInput');
    if (input) userName = input.value.trim();
    saveSettings();
    applyUserToUI();
    renderDashboardGreeting();
    showToast(t('settingsSaved'), 'success');
  });

  // Settings — clear all drafts
  document.getElementById('clearAllDraftsBtn')?.addEventListener('click', () => {
    if (!confirm(t('clearAllConfirm'))) return;
    drafts = [];
    saveDraftsToStorage();
    renderDraftsList();
    renderRecentDrafts();
    showToast(t('deletedMsg'));
  });

  // Show dashboard on load
  showView('dashboard');
}

document.addEventListener('DOMContentLoaded', init);
