import { tool } from '@langchain/core/tools';
import * as z from 'zod/v4';
import { getOrders } from '../odata/client';

export const salesorderGetList = tool(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ soldToParty, salesOrganization }: any) => {
        console.log(`Tool called: getOrders with soldToParty=${soldToParty} and salesOrganization=${salesOrganization}`);
        try {
            const orders = await getOrders(soldToParty as string | undefined, salesOrganization as string | undefined);
            return JSON.stringify(orders, null, 2);
        } catch (err: any) {
            console.error(`Error retrieving sales orders: ${err.message}`);
            return `Error retrieving sales orders: ${err.message}`;
        }
    },
    {
        name: 'salesorder_get_list',
        description:
            'Retrieves a list of SAP S/4HANA sales orders (up to 20). ' +
            'Optionally filter by soldToParty (customer number, e.g. "10100001") ' +
            'or salesOrganization (e.g. "1710"). ' +
            'Returns order number, type, sold-to party, amounts, delivery status, and payment terms.',
        schema: z.object({
            soldToParty: z
                .string()
                .meta({ description: 'Customer or Customer number to filter by, e.g. "10100001"' })
                .optional(),
            salesOrganization: z
                .string()
                .meta({ description: 'Sales organization code to filter by, e.g. "1710"' })
                .optional()
        })
    }
);
