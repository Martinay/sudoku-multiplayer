import { messageBus } from '../../../../services/message-bus';
import type {
  CellValueUpdateData,
  SubscriptionResolvers,
} from './../../../types.generated';
export const onCellValueUpdated: NonNullable<
  SubscriptionResolvers['onCellValueUpdated']
> = {
  subscribe: async (_parent, _arg, _ctx) =>
    messageBus.subscribe('sudoku:CellValueUpdated', _arg.gameId),
  resolve: (payload: CellValueUpdateData) => payload,
};
