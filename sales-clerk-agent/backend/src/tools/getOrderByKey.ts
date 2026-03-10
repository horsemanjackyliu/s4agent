import { tool } from '@langchain/core/tools';
import * as z from 'zod/v4';
import { getOrderByKey } from '../odata/client';

export const salesorderGetByKey = tool(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ salesOrder }: any) => {
        try {
            const order = await getOrderByKey(salesOrder as string);
            return JSON.stringify(order, null, 2);
        } catch (err: any) {
            return `Error retrieving sales order ${salesOrder}: ${err.message}`;
        }
    },
    {
        name: 'salesorder_get_by_key',
        description:
            'Retrieves a single SAP S/4HANA sales order by its key, including all line items. ' +
            'Use this when you need full order details or item-level information. ' +
            'Returns header fields plus an expanded list of order items with product, quantity, amounts.',
        schema: z.object({
            salesOrder: z
                .string()
                .meta({ description: 'Sales order number, e.g. "10000001"' })
        })
    }
);
