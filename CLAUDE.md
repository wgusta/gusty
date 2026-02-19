# CLAUDE.md — gusty.ch

## Project Identity

- **Name:** Gusty
- **Domain:** gusty.ch
- **Repo:** github.com/wgusta/gusty
- **Purpose:** Personal portfolio of Güney Usta (design, writing, AI engineering)
- **Projects shown:** BadenLEG, Penpot Design System, User Story Map, ATS Templates, Linux Cachy
- **NOT:** sihliconvalley.ch, not a community project site

## Tech

Next.js 16, React 19, Tailwind 3, TypeScript. react-markdown for rich content. Deployed on Vercel.

## Git

Remote: `origin → github.com/wgusta/gusty.git`

GitHub Actions bot commits to README.md on every push. Resolve conflicts:
```
git pull --rebase
git checkout --ours README.md && git add README.md && git rebase --continue
git push
```
