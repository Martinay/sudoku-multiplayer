import type { SudokuGame } from '../schema/types.generated';

export const saveGame = async (sudokuGame: SudokuGame): Promise<void> => {
  await Bun.write(
    `./games/${sudokuGame.id}.json`,
    JSON.stringify(sudokuGame, null, 2)
  );
};
