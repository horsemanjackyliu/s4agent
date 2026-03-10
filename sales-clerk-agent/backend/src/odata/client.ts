import { ceSalesorder0001 } from '../services/CE_SALESORDER_0001/service';

const DESTINATION_NAME = process.env.S4_DESTINATION_NAME ?? 'S4_SALESORDER_DEST';
const SERVICE_PATH = '/sap/opu/odata4/sap/api_salesorder/srvd_a2x/sap/api_salesorder/0001/';
const destination = { destinationName: DESTINATION_NAME };

export async function getOrders(soldToParty?: string, salesOrganization?: string) {
    const { salesOrderApi } = ceSalesorder0001();
    const s = salesOrderApi.schema;
    let q = salesOrderApi
        .requestBuilder()
        .getAll()
        .select(
            s.SALES_ORDER,
            s.SALES_ORDER_TYPE,
            s.SOLD_TO_PARTY,
            s.SALES_ORGANIZATION,
            s.DISTRIBUTION_CHANNEL,
            s.ORGANIZATION_DIVISION,
            s.TOTAL_NET_AMOUNT,
            s.OVERALL_DELIVERY_STATUS,
            s.CUSTOMER_PAYMENT_TERMS
        )
        .top(20);
    if (soldToParty) q = q.filter(s.SOLD_TO_PARTY.equals(soldToParty));
    if (salesOrganization) q = q.filter(s.SALES_ORGANIZATION.equals(salesOrganization));
    return q.setBasePath(SERVICE_PATH).execute(destination);
}

export async function getOrderByKey(salesOrder: string) {
    const { salesOrderApi } = ceSalesorder0001();
    const s = salesOrderApi.schema;
    return salesOrderApi
        .requestBuilder()
        .getByKey(salesOrder)
        .select(
            s.SALES_ORDER,
            s.SALES_ORDER_TYPE,
            s.SOLD_TO_PARTY,
            s.SALES_ORGANIZATION,
            s.DISTRIBUTION_CHANNEL,
            s.ORGANIZATION_DIVISION,
            s.TOTAL_NET_AMOUNT,
            s.OVERALL_DELIVERY_STATUS,
            s.CUSTOMER_PAYMENT_TERMS
        )
        .expand(s.ITEM)
        .setBasePath(SERVICE_PATH)
        .execute(destination);
}

export interface CreateOrderInput {
    salesOrderType: string;
    salesOrganization: string;
    distributionChannel: string;
    organizationDivision: string;
    soldToParty: string;
    items: Array<{
        product: string;
        requestedQuantity: string;
        requestedQuantityUnit?: string;
    }>;
}

export async function createOrder(input: CreateOrderInput) {
    const { salesOrderApi, salesOrderItemApi } = ceSalesorder0001();

    const items = input.items.map(i =>
        salesOrderItemApi.entityBuilder().fromJson({
            product: i.product,
            requestedQuantity: i.requestedQuantity,
            requestedQuantityUnit: i.requestedQuantityUnit ?? 'EA'
        } as any)
    );

    const order = salesOrderApi.entityBuilder().fromJson({
        salesOrderType: input.salesOrderType,
        salesOrganization: input.salesOrganization,
        distributionChannel: input.distributionChannel,
        organizationDivision: input.organizationDivision,
        soldToParty: input.soldToParty,
        item: items
    } as any);

    return salesOrderApi.requestBuilder().create(order).setBasePath(SERVICE_PATH).execute(destination);
}

export interface UpdateItemInput {
    requestedQuantity?: string;
    requestedQuantityUnit?: string;
    requestedDeliveryDate?: string;
}

export async function updateOrderItem(
    salesOrder: string,
    salesOrderItem: string,
    patch: UpdateItemInput
) {
    const { salesOrderItemApi } = ceSalesorder0001();
    const entity = salesOrderItemApi.entityBuilder().fromJson({
        salesOrder,
        salesOrderItem,
        ...patch
    } as any);
    return salesOrderItemApi.requestBuilder().update(entity).setBasePath(SERVICE_PATH).execute(destination);
}

export interface UpdateHeaderInput {
    customerPaymentTerms?: string;
}

export async function updateOrderHeader(salesOrder: string, patch: UpdateHeaderInput) {
    const { salesOrderApi } = ceSalesorder0001();
    const entity = salesOrderApi.entityBuilder().fromJson({
        salesOrder,
        ...patch
    } as any);
    return salesOrderApi.requestBuilder().update(entity).setBasePath(SERVICE_PATH).execute(destination);
}

export async function deleteOrder(salesOrder: string) {
    const { salesOrderApi } = ceSalesorder0001();
    return salesOrderApi.requestBuilder().delete(salesOrder).setBasePath(SERVICE_PATH).execute(destination);
}
