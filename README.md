# Squared Circle Manager

Free wrestling promotion manager. One self-contained HTML game, packaged with Electron.

## Layout
- `src/` – game source (`p*.js` concatenated by `src/build.sh` in order) → `build/game.html`
- `electron/` – desktop wrapper; `shim.js` makes the game's `localStorage` file-backed (saves live in the user-data folder, `saves/`)
- `scripts/prepare.js` – builds `app/index.html` (game + shim)
- `.github/workflows/build.yml` – builds Windows/macOS/Linux installers

## Commands
```
npm install
npm start        # build and run
npm run dist     # build installer into dist/
```
Release: push a tag like `v1.0.0` (or run the workflow manually) and download the installers from Actions / Releases, then upload to itch.io.

Saves: Windows `%APPDATA%/Squared Circle Manager/saves`, macOS `~/Library/Application Support/Squared Circle Manager/saves`, Linux `~/.config/Squared Circle Manager/saves`.

## Credits
- Music: "Cyberpunk Moonlight Sonata" (CC0 / public domain), supplied by the game author.
