/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { game as Query_game } from './game/resolvers/Query/game';
import    { createNewGame as Mutation_createNewGame } from './game/resolvers/Mutation/createNewGame';
import    { updateCellValue as Mutation_updateCellValue } from './game/resolvers/Mutation/updateCellValue';
import    { watchGame as Subscription_watchGame } from './game/resolvers/Subscription/watchGame';
import    { SudokuCell } from './game/resolvers/SudokuCell';
import    { SudokuGame } from './game/resolvers/SudokuGame';
    export const resolvers: Resolvers = {
      Query: { game: Query_game },
      Mutation: { createNewGame: Mutation_createNewGame,updateCellValue: Mutation_updateCellValue },
      Subscription: { watchGame: Subscription_watchGame },
      SudokuCell: SudokuCell,
SudokuGame: SudokuGame
    }