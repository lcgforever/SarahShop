import _ from 'lodash';
import { UPDATE_ORDER_ITEM, DELETE_ORDER_ITEM } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_ORDER_ITEM:
    case DELETE_ORDER_ITEM:
    let currentOrderItemList = [];
    if (localStorage.orderItemList) {
      currentOrderItemList = JSON.parse(localStorage.orderItemList);
    }
    const orderItem = action.payload;
    const newOrderItemListAfterDeletion = _.filter(currentOrderItemList, (savedOrderItem) => {
      return savedOrderItem.id != orderItem.id;
    });
    if (action.type == UPDATE_ORDER_ITEM) {
      const newOrderItemListAfterUpdate = _.concat(newOrderItemListAfterDeletion, orderItem);
      localStorage.orderItemList = JSON.stringify(newOrderItemListAfterUpdate);
    } else {
      localStorage.orderItemList = JSON.stringify(newOrderItemListAfterDeletion);
    }
    return state;

    default:
    return state;
  }
}
