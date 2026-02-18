# CLAUDE.md — gusty.ch project

## Git: README conflict on push

The GitHub Actions bot (`update-activity-log.yml`) commits to `README.md` on every push. This causes a rebase conflict whenever we also touch `README.md`.

**Always resolve by keeping our version:**

```bash
git pull --rebase
# if conflict on README.md:
git checkout --ours README.md
git add README.md
git rebase --continue
git push
```

If the commit doesn't touch `README.md`, `git pull --rebase && git push` is enough.
