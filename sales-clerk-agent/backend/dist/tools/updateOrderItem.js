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
exports.salesorderUpdateItem = void 0;
const tools_1 = require("@langchain/core/tools");
const z = __importStar(require("zod/v4"));
const client_1 = require("../odata/client");
exports.salesorderUpdateItem = (0, tools_1.tool)(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async ({ salesOrder, salesOrderItem, requestedQuantity, requestedQuantityUnit, requestedDeliveryDate }) => {
    try {
        await (0, client_1.updateOrderItem)(salesOrder, salesOrderItem, {
            requestedQuantity: requestedQuantity,
            requestedQuantityUnit: requestedQuantityUnit,
            requestedDeliveryDate: requestedDeliveryDate
        });
        return `Sales order ${salesOrder} item ${salesOrderItem} updated successfully.`;
    }
    catch (err) {
        return `Error updating order item: ${err.message}`;
    }
}, {
    name: 'salesorder_update_item',
    description: 'Updates a sales order line item in SAP S/4HANA. ' +
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
});
