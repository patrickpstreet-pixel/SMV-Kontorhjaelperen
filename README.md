# SMV Kontorhjælper

**Praktiske tekster og skabeloner til små virksomheder**  
*Practical texts and templates for small businesses*

A clean, mobile-friendly web app that helps Danish small businesses, freelancers, and local companies turn rough notes into polished business texts — instantly, no login required.

---

## What it does

Select one of 8 tools, enter rough notes, and get a ready-to-use draft:

| Tool | Dansk | English |
|------|-------|---------|
| ✉️ | Kundemail | Customer Email |
| 📋 | Tilbudstekst | Quotation Text |
| 🔔 | Rykkermail | Payment Reminder |
| 📣 | Facebook-opslag | Facebook Post |
| 📄 | SOP / Arbejdsinstruktion | Work Instruction |
| ✅ | Tjekliste | Checklist |
| 👋 | Medarbejder-onboarding | Employee Onboarding |
| ✨ | Gør tekst professionel | Make Text Professional |

**Features:**
- Full Danish + English UI
- Optional fields: customer name, company, price, deadline, tone
- Copy, save locally, download as .txt
- Saved drafts via localStorage (survives page reload)
- Works fully offline — no backend, no API keys, no login
- Mobile-friendly responsive design

---

## How to run locally

Just open `index.html` in any modern browser. No build step, no server needed.

```
Double-click index.html
```

Or use a local server for best results:
```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8080`

---

## How to deploy on GitHub Pages

1. Create a new GitHub repository
2. Upload all files (`index.html`, `styles.css`, `app.js`) to the root of the `main` branch
3. Go to **Settings → Pages**
4. Set source to: **Deploy from a branch → main → / (root)**
5. Click Save — your app will be live at:
   `https://yourusername.github.io/your-repo-name`

No build step required. GitHub Pages serves static files directly.

---

## MVP Limitations

- **Templates only** — output is generated from local JavaScript templates, not real AI
- **No persistence across devices** — drafts are saved in browser localStorage only
- **No PDF export** — .txt download only
- **No user accounts** — anyone can use the app but nothing is synced
- **No custom templates** — template logic is hardcoded in `app.js`

---

## Future Roadmap

### Phase 1 — Real AI output
Replace local templates with actual AI generation via a secure serverless function (Vercel, Netlify, or AWS Lambda). The `generateDraft()` function in `app.js` is already structured for this — look for the `FUTURE AI HOOK` comment.

Target: **Claude API** (claude-sonnet-4-6 or newer) via a lightweight proxy endpoint.

### Phase 2 — User accounts
- Login with email or Google
- Sync drafts across devices
- Personal template library

### Phase 3 — Database
- Store all drafts server-side
- Search and filter history
- Team/company shared workspace

### Phase 4 — PDF export
- Proper PDF generation (letterhead, logo, formatting)
- Direct print layout
- Branded templates

### Phase 5 — Subscription / payment
- Free tier: limited drafts per month
- Pro tier: unlimited + advanced tools
- Stripe integration

### Phase 6 — Company-specific templates
- Upload your own tone of voice
- Company-specific phrases and sign-offs
- Logo and branding in outputs

---

## Project structure

```
index.html    — app shell, all HTML structure
styles.css    — all styles, CSS variables, responsive layout
app.js        — all logic: templates, state, localStorage, UI
README.md     — this file
```

---

## Tech stack

- Vanilla HTML / CSS / JavaScript
- No frameworks, no build tools, no dependencies
- GitHub Pages compatible (static, no server required)
- localStorage for draft persistence

---

*Built as MVP — designed to be extended.*
