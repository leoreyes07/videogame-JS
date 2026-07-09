# 🐶 Bela Game - Vanilla JS Arcade

A lightweight, **Vanilla JavaScript** puzzle-arcade game built entirely on HTML5 Canvas. Guide your dog (`🐶`) through 10 challenging mazes, dodge hidden explosives (`💣`), collect food (`🍗`), and try to unlock the exit door (`🚪`) in record time!

---

## 🎮 How to Play

* **Desktop:** Move using **Arrow Keys** or **WASD**.
* **Mobile / Touch:** Swipe anywhere on the Canvas or use the on-screen **D-Pad**.
* **Goal:** Reach the food (`🍗`) on each map without hitting the bombs (`💣`). Completing all 10 maps wins the game!

---

## 🚀 Key Features

* **10 Progressive Maps:** Dificulty scales from simple tutorials to complex snake mazes and tactical gauntlets with decoy routes.
* **Dual Input Systems:** Full support for desktop keyboards and mobile touch events (swipe + custom grid D-pad layout).
* **Premium Game UI:**
  * Dark mode premium gradient backgrounds.
  * Retro arcade aesthetics powered by Google's **Press Start 2P** typography.
  * Real-time HUD showing current **Level**, **Lives**, **Formatted Time (MM:SS.cc)**, and personal **Record**.
* **Immersive Visual Feedback:**
  * HTML5 Canvas screen shake animations on collision.
  * Green flash transitions when clearing levels.
  * Custom Glassmorphism-style modals for **Win / Game Over** screens.
* **Persistent Records:** High-scores are saved locally in the browser's `localStorage` across gaming sessions.

---

## 🛠️ Tech Stack & Concepts

* **Engine:** Pure HTML5 Canvas & Vanilla JS (no third-party frameworks).
* **Styling:** CSS3 variables, flexbox/grid responsive scaling, glassmorphism filters, and CSS keyframe animations.
* **Game State:** Coordinate mapping, swipe delta calculation, collision zones, and request-animation equivalents.

---

## 📂 File Architecture

* [index.html](./index.html) - Structured game container and HUD layout.
* [games.js](./games.js) - Physics engine, timers, collision logic, and event listeners.
* [maps.js](./maps.js) - Hardcoded 10x10 ASCII matrix arrays representing the levels.
* [styles.css](./styles.css) - Responsive grid layouts, animations, and modal overlays.

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/leoreyes07/videogame-JS.git
   ```
2. Navigate to the project folder:
   ```bash
   cd videogame-JS
   ```
3. Open `index.html` in your web browser (or serve it using VS Code's Live Server extension).
