export declare class Config {
    redirectToLogin: boolean;
    doHeartbeat: boolean;
    fetchHealthCheck: boolean;
    expectHeartbeat: number;
    historySampleSize: number;
    expectTimestamp: number;
    TimeStampWarn: number;
    TimeStampError: number;
    delayInitialRefresh: number;
    backend: {
        backEndPrefix: string;
        healthCheckPostfix: string;
        authPostfix: string;
        unauthPostfix: string;
        keepAlivePostfix: string;
        loginURL: string;
        timeout: number;
    };
}
declare var _default: Config;
export default _default;
