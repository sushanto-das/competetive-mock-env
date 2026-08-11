# SBI Clerk Prelims Mock CBT

Single-user local practice app that simulates the SBI Clerk Prelims computer-based test (CBT) interface:

- 3 sections × 20 minutes (English, Numerical Ability, Reasoning Ability)
- Color-coded question palette
- **Save & Next** / **Mark for Review & Next** / **Clear Response**
- Negative marking (+1 / −0.25 / 0)
- Auto-advance on section timeout; auto-submit on final timeout
- Mid-exam resume via `localStorage`

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build   # production build
npm run preview # preview production build
```

## Deploy to GitHub Pages

This repo is set up for Pages with:

- `base: '/competetive-mock-env/'` in `vite.config.ts` (must match the repo name)
- `HashRouter` in `src/main.tsx`
- `.github/workflows/deploy.yml`

**After you upload/push to GitHub:**

1. Repo → **Settings** → **Pages** → Source: **GitHub Actions**
2. Wait for the workflow under the **Actions** tab to finish
3. Open: `https://YOUR_USERNAME.github.io/competetive-mock-env/`

Do **not** upload `node_modules/` or `dist/` (they are in `.gitignore`).

## Adding a new question paper

Each paper is **one TypeScript file** under [`src/data/papers/`](src/data/papers/). All of that paper’s questions live in that single file.

1. Copy the sample as a starting point:

```bash
# example
cp src/data/papers/sbi-clerk-prelims-sample.ts src/data/papers/sbi-clerk-prelims-mock-2.ts
```

2. Edit the new file: change `id`, `title`, and the `questions` arrays.

```ts
import type { Paper } from '../../types/exam'
import { q } from './helpers'

export const myPaper: Paper = {
  id: 'sbi-clerk-prelims-mock-2',
  exam: 'sbi-clerk-prelims',
  title: 'SBI Clerk Prelims — Mock 2',
  sections: [
    {
      id: 'english',
      name: 'English Language',
      durationSeconds: 20 * 60,
      questions: [
        q('eng-1', 'Question text?', ['A', 'B', 'C', 'D', 'E'], 0),
        // ...
      ],
    },
    // numerical + reasoning sections...
  ],
}
```

`q(id, text, options, correctIndex, figure?)` sets marks to `+1` / `−0.25` automatically.

Optional 5th argument `figure` can be a **line chart**, **bar chart**, or **table** (see `QuestionFigure` in `src/types/exam.ts`) for DI / pictorial questions.

3. Register it in [`src/data/papers/index.ts`](src/data/papers/index.ts):

```ts
import { sbiClerkPrelimsSample } from './sbi-clerk-prelims-sample'
import { myPaper } from './sbi-clerk-prelims-mock-2'

export const papers: Paper[] = [sbiClerkPrelimsSample, myPaper]
```

The home page will list every paper in that array.

## Exam flow

1. **Home** — pick a paper (or resume an in-progress attempt)
2. **Instructions** — read rules, check the box, start
3. **Exam** — CBT shell with sectional timer and palette (no switching between sections)
4. **Result** — score card, section breakdown, optional answer review

## Notes

- Sample questions are original practice/mock content for the UI, not official past papers.
- Designed for one local user; there is no login or backend.
