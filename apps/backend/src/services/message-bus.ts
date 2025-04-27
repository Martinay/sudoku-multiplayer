import { createPubSub } from 'graphql-yoga';

export const messageBus = createPubSub<{
  'sudoku:CellValueUpdated': [
    gameId: string,
    payload: { column: number; row: number; value?: number; isValid?: boolean },
  ];
}>();
