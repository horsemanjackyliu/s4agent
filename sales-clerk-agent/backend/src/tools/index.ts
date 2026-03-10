import { salesorderGetList } from './getOrders';
import { salesorderGetByKey } from './getOrderByKey';
import { salesorderCreate } from './createOrder';
import { salesorderUpdateItem } from './updateOrderItem';
import { salesorderUpdateHeader } from './updateOrderHeader';
import { salesorderDelete } from './deleteOrder';

export const allTools = [
    salesorderGetList,
    salesorderGetByKey,
    salesorderCreate,
    salesorderUpdateItem,
    salesorderUpdateHeader,
    salesorderDelete
];
