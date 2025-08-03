import type { MutationResolvers } from './../../../types.generated';
import { loadGame } from '../../../../services/load-game';
import { saveGame } from '../../../../services/save-game';
import { messageBus } from '../../../../services/message-bus';

export const updateCellAnnotations: NonNullable<
  MutationResolvers['updateCellAnnotations']
> = async (_parent, { gameId, row, column, annotations }) => {
  const game = await loadGame(gameId);
  if (!game) {
    return false;
  }

  const cell = game.board.find((c) => c?.row === row && c.column === column);
  if (!cell || !cell.isEditable) {
    return false;
  }

  // Update cell annotations
  cell.annotations = {
    matrix: annotations.matrix,
  };

  await saveGame(game);

  // Notify subscribers
  messageBus.publish('sudoku:cellAnnotationsUpdated', gameId, {
    row,
    column,
    annotations: cell.annotations,
  });

  return true;
};
