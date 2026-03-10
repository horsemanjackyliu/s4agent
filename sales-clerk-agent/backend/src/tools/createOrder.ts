import { tool } from '@langchain/core/tools';
import * as z from 'zod/v4';
import { createOrder } from '../odata/client';

export const salesorderCreate = tool(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (input: any) => {
        try {
            const order = await createOrder(input);
            return `Sales order created successfully. Order number: ${(order as any).salesOrder}`;
        } catch (err: any) {
            return `Error creating sales order: ${err.message}`;
        }
    },
    {
        name: 'salesorder_create',
        description:
            'Creates a new SAP S/4HANA sales order with one or more line items. ' +
            'Requires order type (e.g. "OR" for standard order), sales org (e.g. "1710"), ' +
            'distribution channel (e.g. "10"), division (e.g. "00"), and sold-to party (customer number). ' +
            'Each item needs a product number and requested quantity (as string, e.g. "5").',
        schema: z.object({
            salesOrderType: z
                .string()
                .meta({ description: 'Sales order type, e.g. "OR" for standard order' }),
            salesOrganization: z
                .string()
                .meta({ description: 'Sales organization code, e.g. "1710"' }),
            distributionChannel: z
                .string()
                .meta({ description: 'Distribution channel, e.g. "10"' }),
            organizationDivision: z
                .string()
                .meta({ description: 'Division, e.g. "00"' }),
            soldToParty: z
                .string()
                .meta({ description: 'Customer number (sold-to party), e.g. "10100001"' }),
            items: z
                .array(
                    z.object({
                        product: z
                            .string()
                            .meta({ description: 'Product/material number, e.g. "TG11"' }),
                        requestedQuantity: z
                            .string()
                            .meta({ description: 'Requested quantity as string, e.g. "5"' }),
                        requestedQuantityUnit: z
                            .string()
                            .meta({ description: 'Unit of measure, e.g. "EA". Defaults to "EA"' })
                            .optional()
                    })
                )
                .meta({ description: 'List of order line items' })
        })
    }
);
