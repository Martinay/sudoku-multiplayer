import { loadGame } from '../../../../services/load-game';
import type { QueryResolvers } from './../../../types.generated';
export const game: NonNullable<QueryResolvers['game']> = async (
  _parent,
  _arg,
  _ctx
) => {
  const game = await loadGame(_arg.id);
  return game;
};
