import { createRandomGame } from '../../../../services/create-random-game';
import { saveGame } from '../../../../services/save-game';
import type { MutationResolvers } from './../../../types.generated';
export const createNewGame: NonNullable<
  MutationResolvers['createNewGame']
> = async (_parent, _arg, _ctx) => {
  const game = await createRandomGame();
  await saveGame(game);
  return game;
};
