import { tool } from '@langchain/core/tools';
import * as z from 'zod/v4';
import { updateOrderHeader } from '../odata/client';

export const salesorderUpdateHeader = tool(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ salesOrder, customerPaymentTerms }: any) => {
        try {
            await updateOrderHeader(salesOrder as string, {
                customerPaymentTerms: customerPaymentTerms as string | undefined
            });
            return `Sales order ${salesOrder} header updated successfully.`;
        } catch (err: any) {
            return `Error updating order header: ${err.message}`;
        }
    },
    {
        name: 'salesorder_update_header',
        description:
            'Updates the header of a SAP S/4HANA sales order. ' +
            'Currently supports changing the customer payment terms (e.g. "0001" for immediate payment, "0002" for 14 days net). ' +
            'Ask the user for the correct payment term key if unsure.',
        schema: z.object({
            salesOrder: z
                .string()
                .meta({ description: 'Sales order number, e.g. "10000001"' }),
            customerPaymentTerms: z
                .string()
                .meta({ description: 'Payment terms key, e.g. "0001" or "NT30"' })
                .optional()
        })
    }
);
