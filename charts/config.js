"use strict";
var Config = (function () {
    function Config() {
        this.redirectToLogin = true; //TODO move these feature toggle flags to constants
        this.doHeartbeat = true;
        this.fetchHealthCheck = true;
        this.expectHeartbeat = 10000; //we poll at this freq
        this.historySampleSize = 5; // number of histories to take into account to deduce WARN state
        this.expectTimestamp = 60000; // server polls at this freq
        this.TimeStampWarn = 80000; //warn if timestamp greater than this and less than TimeStampError
        this.TimeStampError = 100000; //error if timestamp greater than this 
        this.delayInitialRefresh = 150;
        this.backend = {
            backEndPrefix: "/rest/intercap",
            healthCheckPostfix: "/healthCheck",
            authPostfix: "/authenticate",
            unauthPostfix: "/unauthenticate",
            keepAlivePostfix: "/clientKeepAlive",
            loginURL: "../login",
            timeout: 6000 // 6second timout for requests! must be less than expectedHeartbeat
        };
    }
    return Config;
}());
exports.Config = Config;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Config();
//# sourceMappingURL=config.js.map