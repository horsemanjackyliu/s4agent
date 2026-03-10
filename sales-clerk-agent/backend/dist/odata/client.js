"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = getOrders;
exports.getOrderByKey = getOrderByKey;
exports.createOrder = createOrder;
exports.updateOrderItem = updateOrderItem;
exports.updateOrderHeader = updateOrderHeader;
exports.deleteOrder = deleteOrder;
const service_1 = require("../services/CE_SALESORDER_0001/service");
const DESTINATION_NAME = process.env.S4_DESTINATION_NAME ?? 'S4_SALESORDER_DEST';
const SERVICE_PATH = '/sap/opu/odata4/sap/api_salesorder/srvd_a2x/sap/api_salesorder/0001/';
const destination = { destinationName: DESTINATION_NAME };
async function getOrders(soldToParty, salesOrganization) {
    const { salesOrderApi } = (0, service_1.ceSalesorder0001)();
    const s = salesOrderApi.schema;
    let q = salesOrderApi
        .requestBuilder()
        .getAll()
        .select(s.SALES_ORDER, s.SALES_ORDER_TYPE, s.SOLD_TO_PARTY, s.SALES_ORGANIZATION, s.DISTRIBUTION_CHANNEL, s.ORGANIZATION_DIVISION, s.TOTAL_NET_AMOUNT, s.OVERALL_DELIVERY_STATUS, s.CUSTOMER_PAYMENT_TERMS)
        .top(20);
    if (soldToParty)
        q = q.filter(s.SOLD_TO_PARTY.equals(soldToParty));
    if (salesOrganization)
        q = q.filter(s.SALES_ORGANIZATION.equals(salesOrganization));
    return q.setBasePath(SERVICE_PATH).execute(destination);
}
async function getOrderByKey(salesOrder) {
    const { salesOrderApi } = (0, service_1.ceSalesorder0001)();
    const s = salesOrderApi.schema;
    return salesOrderApi
        .requestBuilder()
        .getByKey(salesOrder)
        .select(s.SALES_ORDER, s.SALES_ORDER_TYPE, s.SOLD_TO_PARTY, s.SALES_ORGANIZATION, s.DISTRIBUTION_CHANNEL, s.ORGANIZATION_DIVISION, s.TOTAL_NET_AMOUNT, s.OVERALL_DELIVERY_STATUS, s.CUSTOMER_PAYMENT_TERMS)
        .expand(s.ITEM)
        .setBasePath(SERVICE_PATH)
        .execute(destination);
}
async function createOrder(input) {
    const { salesOrderApi, salesOrderItemApi } = (0, service_1.ceSalesorder0001)();
    const items = input.items.map(i => salesOrderItemApi.entityBuilder().fromJson({
        product: i.product,
        requestedQuantity: i.requestedQuantity,
        requestedQuantityUnit: i.requestedQuantityUnit ?? 'EA'
    }));
    const order = salesOrderApi.entityBuilder().fromJson({
        salesOrderType: input.salesOrderType,
        salesOrganization: input.salesOrganization,
        distributionChannel: input.distributionChannel,
        organizationDivision: input.organizationDivision,
        soldToParty: input.soldToParty,
        item: items
    });
    return salesOrderApi.requestBuilder().create(order).setBasePath(SERVICE_PATH).execute(destination);
}
async function updateOrderItem(salesOrder, salesOrderItem, patch) {
    const { salesOrderItemApi } = (0, service_1.ceSalesorder0001)();
    const entity = salesOrderItemApi.entityBuilder().fromJson({
        salesOrder,
        salesOrderItem,
        ...patch
    });
    return salesOrderItemApi.requestBuilder().update(entity).setBasePath(SERVICE_PATH).execute(destination);
}
async function updateOrderHeader(salesOrder, patch) {
    const { salesOrderApi } = (0, service_1.ceSalesorder0001)();
    const entity = salesOrderApi.entityBuilder().fromJson({
        salesOrder,
        ...patch
    });
    return salesOrderApi.requestBuilder().update(entity).setBasePath(SERVICE_PATH).execute(destination);
}
async function deleteOrder(salesOrder) {
    const { salesOrderApi } = (0, service_1.ceSalesorder0001)();
    return salesOrderApi.requestBuilder().delete(salesOrder).setBasePath(SERVICE_PATH).execute(destination);
}
