"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTools = void 0;
const getOrders_1 = require("./getOrders");
const getOrderByKey_1 = require("./getOrderByKey");
const createOrder_1 = require("./createOrder");
const updateOrderItem_1 = require("./updateOrderItem");
const updateOrderHeader_1 = require("./updateOrderHeader");
const deleteOrder_1 = require("./deleteOrder");
exports.allTools = [
    getOrders_1.salesorderGetList,
    getOrderByKey_1.salesorderGetByKey,
    createOrder_1.salesorderCreate,
    updateOrderItem_1.salesorderUpdateItem,
    updateOrderHeader_1.salesorderUpdateHeader,
    deleteOrder_1.salesorderDelete
];
