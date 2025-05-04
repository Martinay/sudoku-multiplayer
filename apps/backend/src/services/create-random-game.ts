import type { SudokuCell, SudokuGame } from '../schema/types.generated';

let lines: string[] = [];

const allGames = async (): Promise<string[]> => {
  if (lines.length) return lines;
  const filePath = Bun.env.SUDOKU_GAMES_FILE_PATH;
  if (!filePath) {
    throw new Error('SUDOKU_GAMES_FILE_PATH environment variable is not set');
  }
  const file = await Bun.file(filePath);
  const text = await file.text();
  lines = text.split('\n').slice(1, -1); // Skip header line
  console.log('Loaded games from CSV file:', lines.length);
  return lines;
};

export const createRandomGame = async (): Promise<SudokuGame> => {
  const gameId = Math.floor(Math.random() * 3_000_000);
  const rawGame = (await allGames())[gameId];

  if (!rawGame) throw new Error('Game not found');
  const [id, puzzle, solution, , difficulty] = rawGame.split(',');
  if (!puzzle || !solution || !difficulty) throw new Error('Invalid game data');

  console.log('Loading game with csv id:', { id });
  const board = puzzle.split('').map((value, index) => {
    const valueParsed = value === '.' ? null : parseInt(value, 10);
    const solutionValue = solution[index];
    if (solutionValue === undefined) throw new Error('Invalid solution data');
    const solutionValueParsed = parseInt(solutionValue, 10);
    return {
      row: Math.floor(index / 9),
      column: index % 9,
      value: valueParsed,
      solution: solutionValueParsed,
      isEditable: valueParsed === null,
      isValid:
        valueParsed === null ? undefined : valueParsed === solutionValueParsed,
    } as SudokuCell;
  });

  return {
    id: Bun.randomUUIDv7(),
    difficulty,
    board,
  };
};
