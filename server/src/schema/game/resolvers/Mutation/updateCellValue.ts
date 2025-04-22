import { loadGame } from '../../../../services/load-game';
import { saveGame } from '../../../../services/save-game';
import type { MutationResolvers } from './../../../types.generated';
export const updateCellValue: NonNullable<
  MutationResolvers['updateCellValue']
> = async (_parent, _arg, _ctx) => {
  const game = await loadGame(_arg.gameId);
  const { column, row, value } = _arg;
  const cellToUpdate = game.board.find(
    (cell) => cell && cell.row === row && cell.column === column
  );
  if (!cellToUpdate) {
    throw new Error(`Cell at row ${row} and column ${column} not found`);
  }
  cellToUpdate.value = value;
  cellToUpdate.isValid = !!value && value === cellToUpdate.solution;
  await saveGame(game);
  return true;
};
