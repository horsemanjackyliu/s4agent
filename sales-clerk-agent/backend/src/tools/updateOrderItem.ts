import { tool } from '@langchain/core/tools';
import * as z from 'zod/v4';
import { updateOrderItem } from '../odata/client';

export const salesorderUpdateItem = tool(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ salesOrder, salesOrderItem, requestedQuantity, requestedQuantityUnit, requestedDeliveryDate }: any) => {
        try {
            await updateOrderItem(salesOrder as string, salesOrderItem as string, {
                requestedQuantity: requestedQuantity as string | undefined,
                requestedQuantityUnit: requestedQuantityUnit as string | undefined,
                requestedDeliveryDate: requestedDeliveryDate as string | undefined
            });
            return `Sales order ${salesOrder} item ${salesOrderItem} updated successfully.`;
        } catch (err: any) {
            return `Error updating order item: ${err.message}`;
        }
    },
    {
        name: 'salesorder_update_item',
        description:
            'Updates a sales order line item in SAP S/4HANA. ' +
            'Can change the requested quantity (pass as string, e.g. "10"), ' +
            'quantity unit (e.g. "EA"), or requested delivery date (ISO format "YYYY-MM-DD"). ' +
            'Provide at least one of the optional patch fields.',
        schema: z.object({
            salesOrder: z
                .string()
                .meta({ description: 'Sales order number, e.g. "10000001"' }),
            salesOrderItem: z
                .string()
                .meta({ description: 'Line item number, e.g. "10" or "000010"' }),
            requestedQuantity: z
                .string()
                .meta({ description: 'New requested quantity as string, e.g. "10"' })
                .optional(),
            requestedQuantityUnit: z
                .string()
                .meta({ description: 'Unit of measure, e.g. "EA"' })
                .optional(),
            requestedDeliveryDate: z
                .string()
                .meta({ description: 'Requested delivery date in ISO format, e.g. "2025-06-30"' })
                .optional()
        })
    }
);
