import type { SudokuGame } from '../schema/types.generated';

export const loadGame = async (gameId: string): Promise<SudokuGame> => {
  const file = await Bun.file(`./games/${gameId}.json`);
  const game = (await file.json()) as SudokuGame;
  return game;
};
