"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderItemText = void 0;
/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "SalesOrderItemText" of service "com.sap.gateway.srvd_a2x.api_salesorder.v0001".
 */
class SalesOrderItemText extends odata_v4_1.Entity {
    /**
     * Technical entity name for SalesOrderItemText.
     */
    static _entityName = 'SalesOrderItemText';
    /**
     * Default url path for the according service.
     */
    static _defaultBasePath = '/';
    /**
     * All key fields of the SalesOrderItemText entity.
     */
    static _keys = ['SalesOrder', 'SalesOrderItem', 'Language', 'LongTextID'];
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.SalesOrderItemText = SalesOrderItemText;
