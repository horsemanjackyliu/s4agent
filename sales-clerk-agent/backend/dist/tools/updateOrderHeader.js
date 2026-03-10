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
exports.salesorderUpdateHeader = void 0;
const tools_1 = require("@langchain/core/tools");
const z = __importStar(require("zod/v4"));
const client_1 = require("../odata/client");
exports.salesorderUpdateHeader = (0, tools_1.tool)(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async ({ salesOrder, customerPaymentTerms }) => {
    try {
        await (0, client_1.updateOrderHeader)(salesOrder, {
            customerPaymentTerms: customerPaymentTerms
        });
        return `Sales order ${salesOrder} header updated successfully.`;
    }
    catch (err) {
        return `Error updating order header: ${err.message}`;
    }
}, {
    name: 'salesorder_update_header',
    description: 'Updates the header of a SAP S/4HANA sales order. ' +
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
});
