import xsenv from '@sap/xsenv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const xssec = require('@sap/xssec');

let xsuaaService: any = null;

function getXsuaaService(): any {
    if (!xsuaaService) {
        const services = xsenv.getServices({ xsuaa: { tag: 'xsuaa' } }) as { xsuaa: unknown };
        xsuaaService = new xssec.XsuaaService(services.xsuaa as any);
    }
    return xsuaaService;
}

export async function verifyXsuaaToken(token: string): Promise<any> {
    const ctx = await xssec.createSecurityContext(getXsuaaService(), { jwt: token });
    return ctx;
}
