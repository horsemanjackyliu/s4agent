"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyXsuaaToken = verifyXsuaaToken;
const xsenv_1 = __importDefault(require("@sap/xsenv"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xssec = require('@sap/xssec');
let xsuaaService = null;
function getXsuaaService() {
    if (!xsuaaService) {
        const services = xsenv_1.default.getServices({ xsuaa: { tag: 'xsuaa' } });
        xsuaaService = new xssec.XsuaaService(services.xsuaa);
    }
    return xsuaaService;
}
async function verifyXsuaaToken(token) {
    const ctx = await xssec.createSecurityContext(getXsuaaService(), { jwt: token });
    return ctx;
}
