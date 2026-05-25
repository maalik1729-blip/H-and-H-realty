# Website-a Eppadi Build Panni Run Panrathu? (Step-by-Step Guide in Tanglish 🌟)

Vanakkam! Intha guide-la namma full website-a unga computer-la eppadi scratch-la irunthu run panni, final-a build panrathunu romba simple-a, oru **10th standard student**-ku puriyura mathiri step-by-step-a pakalam. 

Ungaluku coding-eh theriyalanalum kavalaiye padatheenga! Just intha steps-a apdiye follow pannunga.

---

## 🛠️ Step 0: Computer-la enna software irukkanum? (Prerequisites)

Website-a run panrathuku munnadi unga computer-la **Node.js** nu oru software irukkanum. 

> [!NOTE]
> **Node.js-na enna?**
> Train odurathuku engine evvlo mukkiyamo, athe mathiri namma React website computer-la run aagurathuku intha Node.js engine romba mukkiyam!
> - **Download Link**: [https://nodejs.org/](https://nodejs.org/) (Download panni standard setup mathiri double-click panni Next, Next, Finish nu install pannidunga).

---

## 🚀 Step 1: Open VS Code & Terminal (Black Screen)

1. First, intha **land-connect** folder-a unga VS Code editor-la open pannunga.
2. Ippo coding screen-ku keezha irukura black screen terminal-a open pannunga.
   - **Shortcut**: `Ctrl` + `~` keys-a keyboard-la senthu thattunga, terminal open aaidum.

---

## 📦 Step 2: Paththirangalai ready seithal (Install Dependencies)

Namma website-la neriya beautiful animations, map modules, and elements use pannirukom. Ithellam run aagurathuku thavaiyana backup files-a download panna intha command-a terminal-la type panni **Enter** thattunga:

```bash
npm install
```

> [!TIP]
> Ithu internet-la irunthu unga website-ku thevaiyana security and styling packages ellathaiyum background-la secure-a download panni `node_modules` nu oru folder-la pottudum. Oru 1-2 minutes wait pannunga, automatic-a complete aaidum.

---

## 💻 Step 3: Local-la Website-a run panni paarkalam (Development Mode)

Download mudinjathum, namma website eppadi unga browser-la visual-a theriyuthunu check panna intha command-a thattunga:

```bash
npm run dev
```

### Enna nadakkum?
Terminal-la black screen-la intha mathiri oru green line varum:
`➜  Local:   http://localhost:3000/`

**Ippo neenga enna pannanum:**
- Keyboard-la `Ctrl` key-a amthikkitte intha link-a mouse-la click pannunga (or browser open panni search bar-la `localhost:3000` nu type panni Enter thattunga).
- **Ta-da! 🎉** Unga beautiful H&H Realty website unga screen-la ready aagi open aaidum. Neenga scroll panni details elathaiyum live-a check pannikalam!

---

## 📦 Step 4: Full Website-a compress panni ready panrathu (Production Build)

Unga changes ellam mudinjathum, intha website-a internet-la public-a upload panna oru tiny, super-fast package-a ready pannanum. Athuku intha command-a terminal-la type pannunga:

```bash
npm run build
```

> [!IMPORTANT]
> **Build panna enna nadakkum?**
> Namma code-la ezhuthuna React, TypeScript, and CSS files ellathaiyum browser-ku puriyura mathiri clean-a pack panni, `dist` nu oru puthu folder structure create panni athukulla ellathaiyum compress panni pottudum. Ithu website-a lightning-fast speed-la load panna help pannum!

---

## 🔍 Step 5: Final output-a preview paarkalam (Preview Build)

Build panni mudicha code correct-a perfect-a irukannu final verification panna intha command-a run pannunga:

```bash
npm run preview
```

Ithu build aana speed-la website-a local-a run panni kaatum. Ellame super speed-la check panni verify pannikalam!

---

## 📝 Summary: Enna commands-a mathum memory-la vechukanum?

| Step | Enna Command? | Ethuku use aaguthu? |
| :--- | :--- | :--- |
| **Step 2** | `npm install` | First time thevaiyana setup files-a download panna. |
| **Step 3** | `npm run dev` | Website-a screen-la live-a run panni, test panna. |
| **Step 4** | `npm run build` | Final website-a lightweight packages-a compress panni pack panna. |
| **Step 5** | `npm run preview` | Pack panna website correct-a working-a irukannu check panna. |

Avvalavuthaan! Ungaluku ippo full website-a compile panni build panna therinjuduchu. Super cool, right? 😎
