declare module '@sap/xsenv' {
    interface XsenvOptions {
        [key: string]: { tag?: string; name?: string; label?: string } | string;
    }
    function loadEnv(file?: string): void;
    function getServices(options: XsenvOptions): Record<string, unknown>;
    export { loadEnv, getServices };
    const xsenv: { loadEnv: typeof loadEnv; getServices: typeof getServices };
    export default xsenv;
}
