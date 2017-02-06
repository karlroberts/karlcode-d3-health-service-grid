"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var hs_types_1 = require("./hs.types");
var mock_health_status_1 = require("./mock.health-status");
// Angular injectable service definition here ------------------
var MockHealthStatusService = (function (_super) {
    __extends(MockHealthStatusService, _super);
    function MockHealthStatusService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockHealthStatusService.prototype.getStatus = function () {
        return Promise.resolve(mock_health_status_1.fakemodel);
    };
    return MockHealthStatusService;
}(hs_types_1.HealthStatusService));
MockHealthStatusService = __decorate([
    core_1.Injectable()
], MockHealthStatusService);
exports.MockHealthStatusService = MockHealthStatusService;
//# sourceMappingURL=mock-health-status.service.js.map