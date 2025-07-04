import { produce } from 'immer';
import {IData} from "./data";

export type ShopActions =
    |{type: 'add-item' | 'delete-item', item: IData}
    |{type: 'set-initial-state', items: IData[]};

function reducer(state: IData[] | null, action: ShopActions) {
  return produce(state, (draftState) => {
    switch (action.type) {

      case 'set-initial-state': {
        draftState.push(...action.items);
        return;
      }

      case 'add-item': {
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
          return;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });
        return;
      }

      case 'delete-item': {
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.splice(itemIndex, 1);
        return;
      }
    }
  });
}

export default reducer;
