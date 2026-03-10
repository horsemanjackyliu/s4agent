"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesorderCreate = void 0;
const tools_1 = require("@langchain/core/tools");
const z = __importStar(require("zod/v4"));
const client_1 = require("../odata/client");
exports.salesorderCreate = (0, tools_1.tool)(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async (input) => {
    try {
        const order = await (0, client_1.createOrder)(input);
        return `Sales order created successfully. Order number: ${order.salesOrder}`;
    }
    catch (err) {
        return `Error creating sales order: ${err.message}`;
    }
}, {
    name: 'salesorder_create',
    description: 'Creates a new SAP S/4HANA sales order with one or more line items. ' +
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
            .array(z.object({
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
        }))
            .meta({ description: 'List of order line items' })
    })
});
