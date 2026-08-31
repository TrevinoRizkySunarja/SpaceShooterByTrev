# SpaceShooterByTrev

Arcade-style space shooter built with JavaScript, Vite and Excalibur. The player controls a UFO, dodges enemies, shoots lasers, uses bombs and collects power-ups while trying to survive as long as possible.

## Live Demo

Play the game here: [SpaceShooterByTrev live demo](https://trevinorizkysunarja.github.io/SpaceShooterByTrev/)

## Features

- Full-screen Excalibur game canvas
- Player movement with keyboard controls
- Laser shooting with ammo tracking
- Bomb ability for clearing enemies
- Lives, score, laser and bomb counters
- Alien enemy spawning
- Planets, stars and scrolling space background
- Power-ups, batteries and repair kits
- Sprite-based visuals and game assets
- Production build stored in `docs/`

## Tech Stack

- JavaScript modules
- Excalibur game engine
- Vite
- HTML and CSS

## Controls

| Action | Keyboard |
| --- | --- |
| Move | `W`, `A`, `S`, `D` |
| Shoot laser | `Space` |
| Use bomb | `E` |

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run serve
```

## Project Structure

```text
src/css/       Game styling
src/js/        Game classes, player, enemies, projectiles and pickups
public/        Source image assets
docs/          Built version for GitHub Pages
index.html     App entry page
```

## Portfolio Notes

This project demonstrates game loops, collision handling, object spawning, score state, player abilities and asset-based JavaScript game development with Excalibur.