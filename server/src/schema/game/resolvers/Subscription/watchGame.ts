import type { SubscriptionResolvers } from './../../../types.generated';
export const watchGame: NonNullable<SubscriptionResolvers['watchGame']> = {
  subscribe: async function* (_parent, _arg, _ctx) {
    for (let index = 0; index < 100; index++) {
      await Bun.sleep(1000);
      yield index;
    }
  },
  resolve: (payload: number) => payload,
};
