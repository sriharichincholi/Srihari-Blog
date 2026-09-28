import React, { useEffect, useRef } from 'react';

interface TetrisCanvasProps {
  darkMode: boolean;
}

const COLS = 10;
const ROWS = 20;

// Standard Tetrominoes: I, J, L, O, S, T, Z
const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]], // L
  [[1, 1], [1, 1]], // O
  [[0, 1, 1], [1, 1, 0]], // S
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // Z
];

type Grid = number[][];

function createGrid(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function rotateMatrix(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = matrix[r][c];
    }
  }
  return rotated;
}

function isValidMove(grid: Grid, piece: number[][], x: number, y: number): boolean {
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece[r].length; c++) {
      if (piece[r][c]) {
        const newX = x + c;
        const newY = y + r;
        if (newX < 0 || newX >= COLS || newY >= ROWS) return false;
        if (newY >= 0 && grid[newY][newX]) return false;
      }
    }
  }
  return true;
}

function evaluateBoard(grid: Grid): number {
  let aggregateHeight = 0;
  let completeLines = 0;
  let holes = 0;
  let bumpiness = 0;

  const columnHeights = new Array(COLS).fill(0);

  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      if (grid[r][c]) {
        columnHeights[c] = ROWS - r;
        break;
      }
    }
  }

  for (let r = 0; r < ROWS; r++) {
    if (grid[r].every(cell => cell > 0)) {
      completeLines++;
    }
  }

  for (let c = 0; c < COLS; c++) {
    let blockFound = false;
    for (let r = 0; r < ROWS; r++) {
      if (grid[r][c]) {
        blockFound = true;
      } else if (blockFound) {
        holes++;
      }
    }
  }

  for (let c = 0; c < COLS - 1; c++) {
    bumpiness += Math.abs(columnHeights[c] - columnHeights[c + 1]);
  }

  for (let c = 0; c < COLS; c++) {
    aggregateHeight += columnHeights[c];
  }

  return (-0.51 * aggregateHeight) + (0.76 * completeLines) - (0.35 * holes) - (0.18 * bumpiness);
}

function findBestMove(grid: Grid, shapeIndex: number): { x: number; rotationCount: number } {
  let bestScore = -Infinity;
  let bestX = 0;
  let bestRot = 0;

  let currentPiece = SHAPES[shapeIndex];

  for (let rot = 0; rot < 4; rot++) {
    const pieceWidth = currentPiece[0].length;
    for (let x = 0; x <= COLS - pieceWidth; x++) {
      if (isValidMove(grid, currentPiece, x, 0)) {
        // Drop piece
        let y = 0;
        while (isValidMove(grid, currentPiece, x, y + 1)) {
          y++;
        }

        // Simulate board
        const tempGrid = grid.map(row => [...row]);
        for (let r = 0; r < currentPiece.length; r++) {
          for (let c = 0; c < currentPiece[r].length; c++) {
            if (currentPiece[r][c] && y + r >= 0) {
              tempGrid[y + r][x + c] = shapeIndex + 1;
            }
          }
        }

        const score = evaluateBoard(tempGrid);
        if (score > bestScore) {
          bestScore = score;
          bestX = x;
          bestRot = rot;
        }
      }
    }
    currentPiece = rotateMatrix(currentPiece);
  }

  return { x: bestX, rotationCount: bestRot };
}

export const TetrisCanvas: React.FC<TetrisCanvasProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    let dropCounter = 0;
    const dropInterval = 120; // drop tick in ms

    let grid = createGrid();
    let lineClearCount = 0;
    let clearingRows: number[] = [];
    let clearFlashTimer = 0;

    let currentShapeIndex = Math.floor(Math.random() * SHAPES.length);
    let currentPiece = SHAPES[currentShapeIndex];
    let currentX = Math.floor((COLS - currentPiece[0].length) / 2);
    let currentY = 0;

    let targetMove = findBestMove(grid, currentShapeIndex);
    for (let i = 0; i < targetMove.rotationCount; i++) {
      currentPiece = rotateMatrix(currentPiece);
    }

    const resetGame = () => {
      grid = createGrid();
      clearingRows = [];
      spawnNewPiece();
    };

    const spawnNewPiece = () => {
      currentShapeIndex = Math.floor(Math.random() * SHAPES.length);
      currentPiece = SHAPES[currentShapeIndex];
      targetMove = findBestMove(grid, currentShapeIndex);
      for (let i = 0; i < targetMove.rotationCount; i++) {
        currentPiece = rotateMatrix(currentPiece);
      }
      currentX = Math.max(0, Math.min(targetMove.x, COLS - currentPiece[0].length));
      currentY = 0;

      if (!isValidMove(grid, currentPiece, currentX, currentY)) {
        resetGame();
      }
    };

    const handleLineClears = () => {
      const fullRows: number[] = [];
      for (let r = 0; r < ROWS; r++) {
        if (grid[r].every(cell => cell > 0)) {
          fullRows.push(r);
        }
      }

      if (fullRows.length > 0) {
        clearingRows = fullRows;
        clearFlashTimer = 4; // flash duration frames
        lineClearCount += fullRows.length;
      } else {
        spawnNewPiece();
      }
    };

    const update = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (clearingRows.length > 0) {
        clearFlashTimer--;
        if (clearFlashTimer <= 0) {
          // Process actual clear
          const newGrid = grid.filter((_, idx) => !clearingRows.includes(idx));
          while (newGrid.length < ROWS) {
            newGrid.unshift(Array(COLS).fill(0));
          }
          grid = newGrid;
          clearingRows = [];
          spawnNewPiece();
        }
      } else {
        dropCounter += delta;
        if (dropCounter > dropInterval) {
          dropCounter = 0;

          // Move x closer to target
          if (currentX < targetMove.x && isValidMove(grid, currentPiece, currentX + 1, currentY)) {
            currentX++;
          } else if (currentX > targetMove.x && isValidMove(grid, currentPiece, currentX - 1, currentY)) {
            currentX--;
          }

          if (isValidMove(grid, currentPiece, currentX, currentY + 1)) {
            currentY++;
          } else {
            // Lock piece
            for (let r = 0; r < currentPiece.length; r++) {
              for (let c = 0; c < currentPiece[r].length; c++) {
                if (currentPiece[r][c] && currentY + r >= 0) {
                  grid[currentY + r][currentX + c] = currentShapeIndex + 1;
                }
              }
            }
            handleLineClears();
          }
        }
      }

      // Draw
      draw();
      animId = requestAnimationFrame(update);
    };

    const draw = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const cellW = width / COLS;
      const cellH = height / ROWS;

      // Background
      ctx.fillStyle = darkMode ? '#050705' : '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = darkMode ? 'rgba(0, 255, 102, 0.08)' : 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let c = 0; c <= COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellW, 0);
        ctx.lineTo(c * cellW, height);
        ctx.stroke();
      }
      for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellH);
        ctx.lineTo(width, r * cellH);
        ctx.stroke();
      }

      // Colors
      const activeStroke = darkMode ? '#00ff66' : '#8b5cf6';
      const activeFill = darkMode ? 'rgba(0, 255, 102, 0.25)' : 'rgba(139, 92, 246, 0.2)';
      const lockedStroke = darkMode ? '#00cc52' : '#7c3aed';
      const lockedFill = darkMode ? 'rgba(0, 204, 82, 0.15)' : 'rgba(124, 58, 237, 0.15)';

      // Draw Grid Blocks
      for (let r = 0; r < ROWS; r++) {
        const isClearing = clearingRows.includes(r);
        for (let c = 0; c < COLS; c++) {
          if (grid[r][c]) {
            if (isClearing) {
              ctx.fillStyle = darkMode ? '#ffffff' : '#a78bfa';
              ctx.fillRect(c * cellW + 1, r * cellH + 1, cellW - 2, cellH - 2);
            } else {
              ctx.fillStyle = lockedFill;
              ctx.fillRect(c * cellW + 1, r * cellH + 1, cellW - 2, cellH - 2);
              ctx.strokeStyle = lockedStroke;
              ctx.strokeRect(c * cellW + 1.5, r * cellH + 1.5, cellW - 3, cellH - 3);
            }
          }
        }
      }

      // Draw Current Falling Piece
      if (clearingRows.length === 0) {
        for (let r = 0; r < currentPiece.length; r++) {
          for (let c = 0; c < currentPiece[r].length; c++) {
            if (currentPiece[r][c]) {
              const px = (currentX + c) * cellW;
              const py = (currentY + r) * cellH;

              ctx.fillStyle = activeFill;
              ctx.fillRect(px + 1, py + 1, cellW - 2, cellH - 2);
              ctx.strokeStyle = activeStroke;
              ctx.strokeRect(px + 1.5, py + 1.5, cellW - 3, cellH - 3);
            }
          }
        }
      }
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(update);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [darkMode]);

  return (
    <div className={`relative w-full h-[380px] md:h-[420px] rounded border p-4 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur ${
      darkMode
        ? 'bg-[#050705]/90 border-emerald-500/30 text-emerald-400'
        : 'bg-white/90 border-violet-200 text-violet-700'
    }`}>
      {/* Top Header Label */}
      <div className="flex items-center justify-between text-[11px] font-mono border-b pb-2 mb-2 border-emerald-500/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold tracking-wider">TETRIS_ENGINE</span>
        </div>
        <span className="text-gray-400 opacity-80">ROW_SCAN: ACTIVE</span>
      </div>

      {/* Canvas Area */}
      <div ref={containerRef} className="relative flex-1 w-full my-1 rounded overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Bottom Status Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono pt-2 mt-1 border-t border-emerald-500/20 text-gray-400">
        <span>STATUS: AUTONOMOUS</span>
        <span>CLEAR: RUNNING</span>
      </div>
    </div>
  );
};
