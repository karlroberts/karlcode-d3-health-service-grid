"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var hs_types_1 = require("./hs.types");
//must be provided
// import {MockHealthStatusService} from './mock-health-status.service';
var modelutils_1 = require("./charts/modelutils");
var HSChartComponent = (function () {
    function HSChartComponent(healthStatusService) {
        this.healthStatusService = healthStatusService;
        this.name = 'Angular';
        this.rawmodel = { patients: [] };
    }
    HSChartComponent.prototype.getStatus = function () {
        var _this = this;
        this.healthStatusService.getStatus().then(function (stats) {
            _this.rawmodel = stats;
            _this.model = modelutils_1.default.convertPWrapperToPatientGraph(_this.rawmodel);
        });
    };
    HSChartComponent.prototype.ngOnInit = function () {
        this.getStatus();
    };
    return HSChartComponent;
}());
HSChartComponent = __decorate([
    core_1.Component({
        selector: 'ngx-hs-grid',
        template: "\n   <d3-chart \n     [xgrads]=1024\n     [ygrads]=768\n     [chartData]=model\n   >\n   </d3-chart>\n  "
    }),
    __param(0, core_1.Inject('karlcode.HealthStatusService')),
    __metadata("design:paramtypes", [hs_types_1.HealthStatusService])
], HSChartComponent);
exports.HSChartComponent = HSChartComponent;
//# sourceMappingURL=hs.component.js.map