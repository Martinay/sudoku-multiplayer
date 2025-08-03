import type {
  CellAnnotationsUpdateData,
  SubscriptionResolvers,
} from './../../../types.generated';
import { messageBus } from '../../../../services/message-bus';

export const onCellAnnotationsUpdated: NonNullable<
  SubscriptionResolvers['onCellAnnotationsUpdated']
> = {
  subscribe: async (_parent, _arg, _ctx) =>
    messageBus.subscribe('sudoku:cellAnnotationsUpdated', _arg.gameId),
  resolve: (payload: CellAnnotationsUpdateData) => payload,
};
