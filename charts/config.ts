
export class Config {
  redirectToLogin = true; //TODO move these feature toggle flags to constants
  doHeartbeat = true;
  fetchHealthCheck = true;
  expectHeartbeat = 10000; //we poll at this freq
  historySampleSize = 5; // number of histories to take into account to deduce WARN state
  expectTimestamp = 60000; // server polls at this freq
  TimeStampWarn = 80000; //warn if timestamp greater than this and less than TimeStampError
  TimeStampError = 100000; //error if timestamp greater than this 
  delayInitialRefresh = 150;
  backend = {
    backEndPrefix: "/rest/intercap",
    healthCheckPostfix: "/healthCheck",
    authPostfix: "/authenticate",
    unauthPostfix: "/unauthenticate",
    keepAlivePostfix: "/clientKeepAlive",
    loginURL: "../login",
    timeout: 6000 // 6second timout for requests! must be less than expectedHeartbeat
  };
}

export default new Config()