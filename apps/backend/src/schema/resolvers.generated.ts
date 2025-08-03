/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { game as Query_game } from './game/resolvers/Query/game';
import    { createNewGame as Mutation_createNewGame } from './game/resolvers/Mutation/createNewGame';
import    { updateCellAnnotations as Mutation_updateCellAnnotations } from './game/resolvers/Mutation/updateCellAnnotations';
import    { updateCellValue as Mutation_updateCellValue } from './game/resolvers/Mutation/updateCellValue';
import    { onCellAnnotationsUpdated as Subscription_onCellAnnotationsUpdated } from './game/resolvers/Subscription/onCellAnnotationsUpdated';
import    { onCellValueUpdated as Subscription_onCellValueUpdated } from './game/resolvers/Subscription/onCellValueUpdated';
import    { CellAnnotationsUpdateData } from './game/resolvers/CellAnnotationsUpdateData';
import    { CellValueUpdateData } from './game/resolvers/CellValueUpdateData';
import    { SudokuCell } from './game/resolvers/SudokuCell';
import    { SudokuCellAnnotations } from './game/resolvers/SudokuCellAnnotations';
import    { SudokuGame } from './game/resolvers/SudokuGame';
    export const resolvers: Resolvers = {
      Query: { game: Query_game },
      Mutation: { createNewGame: Mutation_createNewGame,updateCellAnnotations: Mutation_updateCellAnnotations,updateCellValue: Mutation_updateCellValue },
      Subscription: { onCellAnnotationsUpdated: Subscription_onCellAnnotationsUpdated,onCellValueUpdated: Subscription_onCellValueUpdated },
      CellAnnotationsUpdateData: CellAnnotationsUpdateData,
CellValueUpdateData: CellValueUpdateData,
SudokuCell: SudokuCell,
SudokuCellAnnotations: SudokuCellAnnotations,
SudokuGame: SudokuGame
    }