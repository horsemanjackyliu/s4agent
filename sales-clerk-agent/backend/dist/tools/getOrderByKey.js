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
exports.salesorderGetByKey = void 0;
const tools_1 = require("@langchain/core/tools");
const z = __importStar(require("zod/v4"));
const client_1 = require("../odata/client");
exports.salesorderGetByKey = (0, tools_1.tool)(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async ({ salesOrder }) => {
    try {
        const order = await (0, client_1.getOrderByKey)(salesOrder);
        return JSON.stringify(order, null, 2);
    }
    catch (err) {
        return `Error retrieving sales order ${salesOrder}: ${err.message}`;
    }
}, {
    name: 'salesorder_get_by_key',
    description: 'Retrieves a single SAP S/4HANA sales order by its key, including all line items. ' +
        'Use this when you need full order details or item-level information. ' +
        'Returns header fields plus an expanded list of order items with product, quantity, amounts.',
    schema: z.object({
        salesOrder: z
            .string()
            .meta({ description: 'Sales order number, e.g. "10000001"' })
    })
});
