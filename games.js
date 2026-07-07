/* ═══════════════════════════════════════════════════════════
   Bela Game — Main logic
   ═══════════════════════════════════════════════════════════ */

// ─── DOM refs ────────────────────────────────────────────────
const canvas      = document.querySelector('#game');
const game        = canvas.getContext('2d');
const btnUp       = document.querySelector('#up');
const btnRight    = document.querySelector('#right');
const btnLeft     = document.querySelector('#left');
const btnDown     = document.querySelector('#down');
const spanLives   = document.querySelector('#lives');
const spanTime    = document.querySelector('#time');
const spanRecord  = document.querySelector('#record');
const spanLevel   = document.querySelector('#level');
const pResult     = document.querySelector('#result');

// ─── Modal refs ──────────────────────────────────────────────
const modalEl     = document.querySelector('#modal');
const modalEmoji  = document.querySelector('#modal-emoji');
const modalTitle  = document.querySelector('#modal-title');
const modalMsg    = document.querySelector('#modal-msg');
const modalStats  = document.querySelector('#modal-stats');
const modalBtn    = document.querySelector('#modal-btn');

/**
 * Display the result modal.
 * @param {'win'|'gameover'} type
 * @param {{ level?: number, playerTime?: string, recordTime?: string, isNewRecord?: boolean }} data
 */
function showModal(type, data = {}) {
  if (type === 'win') {
    modalEmoji.textContent  = '🏆';
    modalTitle.textContent  = 'YOU WON!';
    modalTitle.className    = 'modal-title win';
    modalMsg.textContent    = 'All 10 levels completed!';
    modalStats.innerHTML    = data.isNewRecord
      ? `Your time: ${data.playerTime}<br>🎉 NEW RECORD!`
      : `Your time: ${data.playerTime}<br>Record: ${data.recordTime}`;
    modalBtn.textContent    = '▶ Play Again';
  } else {
    modalEmoji.textContent  = '💀';
    modalTitle.textContent  = 'GAME OVER';
    modalTitle.className    = 'modal-title lose';
    modalMsg.textContent    = 'You ran out of lives!';
    modalStats.innerHTML    = `Reached level: ${data.level}`;
    modalBtn.textContent    = '↺ Try Again';
  }
  modalEl.removeAttribute('hidden');
}

function hideModal() {
  modalEl.setAttribute('hidden', '');
}

// Modal button — reset everything and restart
modalBtn.addEventListener('click', () => {
  hideModal();
  level            = 0;
  lives            = 3;
  clearInterval(timeInterval);
  timeStart        = undefined;
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  isAnimating      = false;
  startGame();
});

// Click outside the card also closes
modalEl.addEventListener('click', (e) => {
  if (e.target === modalEl) modalBtn.click();
});

// ─── State ───────────────────────────────────────────────────
let canvasSize;
let elementsSize;
let level       = 0;
let lives       = 3;
let timeStart;
let timeInterval;
let isAnimating = false;   // prevents input during animations

const playerPosition = { x: undefined, y: undefined };
const giftPosition   = { x: undefined, y: undefined };
let enemyPositions   = [];

// ─── Canvas sizing ───────────────────────────────────────────
window.addEventListener('load',   setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isPortrait = vh > vw;

  let size;
  if (isPortrait) {
    // Portrait: leave ~310 px for header + D-pad + gaps + padding
    size = Math.min(vw - 24, vh - 310);
  } else {
    // Landscape: constrain by height (leave room for header)
    size = Math.min(vh - 140, vw * 0.65);
  }

  // Clamp: never smaller than 160, never larger than 650
  canvasSize = Math.max(160, Math.min(Math.round(size), 650));

  canvas.setAttribute('width',  canvasSize);
  canvas.setAttribute('height', canvasSize);
  elementsSize = canvasSize / 10;

  // Reset player so the map re-places it correctly
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

// ─── Game flow ───────────────────────────────────────────────
function startGame() {
  game.font      = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];

  if (!map) {
    youWonAndShowRecord();
    return;
  }

  // Start timer on first move / first load of this run
  if (!timeStart) {
    timeStart    = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  showLevel();
  showLives();
  pResult.textContent = '';

  const mapRows = map.trim().split('\n');
  const mapCols = mapRows.map((row) => row.trim().split(''));

  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX  = elementsSize * (colI + 1);
      const posY  = elementsSize * (rowI + 1);

      // Register special cells
      if (col === 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col === 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col === 'X') {
        enemyPositions.push({ x: posX, y: posY });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  // ── Collect food (next level) ─────────────────────────────
  const giftCollision =
    playerPosition.x.toFixed(3) === giftPosition.x.toFixed(3) &&
    playerPosition.y.toFixed(3) === giftPosition.y.toFixed(3);

  if (giftCollision) {
    levelPassed();
    return;
  }

  // ── Hit a bomb ────────────────────────────────────────────
  const bombHit = enemyPositions.find(
    (e) =>
      e.x.toFixed(3) === playerPosition.x.toFixed(3) &&
      e.y.toFixed(3) === playerPosition.y.toFixed(3)
  );

  if (bombHit) {
    levelFail();
    return;
  }

  // ── Draw player ───────────────────────────────────────────
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

// ─── Level outcomes ──────────────────────────────────────────
function levelPassed() {
  if (isAnimating) return;
  isAnimating = true;

  canvas.classList.add('level-flash');
  level++;

  setTimeout(() => {
    canvas.classList.remove('level-flash');
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    isAnimating      = false;
    startGame();
  }, 480);
}

function levelFail() {
  if (isAnimating) return;
  isAnimating = true;

  // Show explosion at player position
  game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
  canvas.classList.add('shake');
  lives--;
  showLives();

  if (lives <= 0) {
    // Game over — show modal after shake, isAnimating stays true until modal btn
    const reachedLevel = level + 1;
    setTimeout(() => {
      canvas.classList.remove('shake');
      showModal('gameover', { level: reachedLevel });
    }, 600);
  } else {
    // Lost a life — restart current level after a brief pause
    setTimeout(() => {
      canvas.classList.remove('shake');
      playerPosition.x = undefined;
      playerPosition.y = undefined;
      isAnimating      = false;
      startGame();
    }, 500);
  }
}

function youWonAndShowRecord() {
  clearInterval(timeInterval);
  const playerTime = Date.now() - timeStart;
  const stored     = localStorage.getItem('record_Time');
  const recordTime = stored ? Number(stored) : Infinity;
  const isNewRecord = playerTime < recordTime;

  if (isNewRecord) {
    localStorage.setItem('record_Time', playerTime);
  }

  showRecord();

  // Reset state — modal button will call startGame()
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  level     = 0;
  lives     = 3;
  timeStart = undefined;

  showModal('win', {
    isNewRecord,
    playerTime: formatTime(playerTime),
    recordTime: formatTime(isNewRecord ? playerTime : recordTime),
  });
}

// ─── HUD helpers ─────────────────────────────────────────────
function showLevel() {
  spanLevel.textContent = level + 1;
}

function showLives() {
  spanLives.innerHTML = '';
  for (let i = 0; i < lives; i++) {
    spanLives.append(emojis['HEART']);
  }
}

function showTime() {
  if (!timeStart) return;
  spanTime.textContent = formatTime(Date.now() - timeStart);
}

function showRecord() {
  const r = localStorage.getItem('record_Time');
  spanRecord.textContent = r ? formatTime(Number(r)) : '--:--';
}

/**
 * Formats milliseconds as MM:SS.cc
 * @param {number} ms
 * @returns {string}
 */
function formatTime(ms) {
  const m  = Math.floor(ms / 60000);
  const s  = Math.floor((ms % 60000) / 1000);
  const cc = Math.floor((ms % 1000) / 10);
  return (
    String(m).padStart(2, '0')  + ':' +
    String(s).padStart(2, '0')  + '.' +
    String(cc).padStart(2, '0')
  );
}

// ─── Input: Keyboard ─────────────────────────────────────────
const KEY_MAP = {
  ArrowUp:    moveUp,    w: moveUp,    W: moveUp,
  ArrowDown:  moveDown,  s: moveDown,  S: moveDown,
  ArrowLeft:  moveLeft,  a: moveLeft,  A: moveLeft,
  ArrowRight: moveRight, d: moveRight, D: moveRight,
};

window.addEventListener('keydown', (e) => {
  const fn = KEY_MAP[e.key];
  if (fn) { e.preventDefault(); fn(); }
});

// ─── Input: D-Pad buttons ────────────────────────────────────
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

// ─── Input: Touch swipe on canvas ────────────────────────────
let touchStartX = 0;
let touchStartY = 0;
const SWIPE_MIN = 18;  // px — minimum gesture distance

canvas.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
  const dx    = e.changedTouches[0].clientX - touchStartX;
  const dy    = e.changedTouches[0].clientY - touchStartY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (Math.max(absDx, absDy) < SWIPE_MIN) return;  // too small, ignore

  if (absDx > absDy) {
    dx > 0 ? moveRight() : moveLeft();
  } else {
    dy > 0 ? moveDown() : moveUp();
  }
  e.preventDefault();
}, { passive: false });

// ─── Movement ────────────────────────────────────────────────
function moveUp() {
  if (isAnimating) return;
  // If no active game (post-win), restart
  if (!playerPosition.x || !playerPosition.y) { startGame(); return; }
  if (playerPosition.y - elementsSize < elementsSize) return;  // wall
  playerPosition.y -= elementsSize;
  startGame();
}

function moveDown() {
  if (isAnimating) return;
  if (!playerPosition.x || !playerPosition.y) { startGame(); return; }
  if (playerPosition.y + elementsSize > canvasSize) return;
  playerPosition.y += elementsSize;
  startGame();
}

function moveLeft() {
  if (isAnimating) return;
  if (!playerPosition.x || !playerPosition.y) { startGame(); return; }
  if (playerPosition.x - elementsSize < elementsSize) return;
  playerPosition.x -= elementsSize;
  startGame();
}

function moveRight() {
  if (isAnimating) return;
  if (!playerPosition.x || !playerPosition.y) { startGame(); return; }
  if (playerPosition.x + elementsSize > canvasSize) return;
  playerPosition.x += elementsSize;
  startGame();
}
