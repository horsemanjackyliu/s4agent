import { tool } from '@langchain/core/tools';
import * as z from 'zod/v4';
import { deleteOrder } from '../odata/client';

export const salesorderDelete = tool(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ salesOrder }: any) => {
        try {
            await deleteOrder(salesOrder as string);
            return `Sales order ${salesOrder} deleted successfully.`;
        } catch (err: any) {
            return `Error deleting sales order ${salesOrder}: ${err.message}`;
        }
    },
    {
        name: 'salesorder_delete',
        description:
            'Deletes a SAP S/4HANA sales order by its order number. ' +
            'This action is irreversible — always confirm with the user before calling this tool. ' +
            'Only orders that are not yet delivered or billed can be deleted.',
        schema: z.object({
            salesOrder: z
                .string()
                .meta({ description: 'Sales order number to delete, e.g. "10000001"' })
        })
    }
);
