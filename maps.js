/* ─────────────────────────────────────────────────────────────
   Maps — 10×10 grid
   O = 🚪  player spawn
   I = 🍗  goal (collect to advance)
   X = 💣  bomb (kills player)
   - = empty/safe cell
   ───────────────────────────────────────────────────────────── */

const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣',
  'I': '🍗',
  'PLAYER': '🐶',
  'BOMB_COLLISION': '💥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART': '🐕‍🦺',
};

const maps = [];

/* ── Level 1: Straight corridor (tutorial) ───────────────── */
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);

/* ── Level 2: First turns ─────────────────────────────────── */
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
`);

/* ── Level 3: Zigzag path ─────────────────────────────────── */
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);

/* ── Level 4: Reverse zigzag ──────────────────────────────── */
maps.push(`
  I-XXXXXXXX
  --XXXXXXXX
  -XXXXXXXXX
  ---------X
  XXXXXXXX-X
  XXXXXXXX-X
  X--------X
  X-XXXXXXXX
  X-XXXXXXXX
  XOXXXXXXXX
`);

/* ── Level 5: The Room ────────────────────────────────────── */
maps.push(`
  I---------
  -XXXXXXXX-
  -X------X-
  -X-XXXX-X-
  -X-X--X-X-
  -X-X--X-X-
  -X-XXXX-X-
  -X------X-
  -XXXXXXXX-
  ----O-----
`);

/* ── Level 6: Snake maze ──────────────────────────────────── */
maps.push(`
  O---------
  -XXXXXXXXX
  ----------
  XXXXXXXXX-
  ----------
  -XXXXXXXXX
  ----------
  XXXXXXXXX-
  ----------
  ---------I
`);

/* ── Level 7: Crossroads ──────────────────────────────────── */
maps.push(`
  O-X-X-X-X-
  --X-X-X-X-
  X---------
  XXXXXXXXX-
  ----------
  -XXXXXXXXX
  -X--------
  -X-XXXXXXX
  -X--------
  ---------I
`);

/* ── Level 8: Gauntlet (hardest) ──────────────────────────── */
maps.push(`
  I-X-XXXXXX
  --X-XXXXXX
  -XX-------
  -XXXXXXXXX
  ----------
  XXXXXXXXX-
  X---------
  X-XXXXXXXX
  X---------
  XXXXXXXXXO
`);

/* ── Level 9: Interlocking corridors ─────────────────────── */
/*
   Path: O(r9,c9) → up r8 col9 → left r8 → up col1 →
         up col0 → right along r6 → up col0 → right r4
         (long corridor) → up col0 → up r2,r1 → left to I
   Dead end: the branch in r2 (col2-3) baits the player
*/
maps.push(`
  I-XXXXXXXX
  --XXXXXXXX
  -X--XXXXXX
  -X-XXXXXXX
  -X--------
  -XXXXXXXXX
  ----------
  XXXXXXXXX-
  X---------
  X-XXXXXXXO
`);

/* ── Level 10: The Final Gauntlet ────────────────────────── */
/*
   Snake maze with a hidden fake path:
   Gap at row5 col8 looks passable but leads to a dead end
   at row7 col8 (X). Real exit is row7 col7.
   Path: O(r0,c0) → snake right/left × 4 turns →
         row6 go to col7 → down r7,c7 → right to I(r9,c9)
*/
maps.push(`
  O---------
  -XXXXXXXXX
  ----------
  XXXXXXXXX-
  ----------
  -XXXXXXX-X
  ----------
  XXXXXXX-XX
  ----------
  ---------I
`);