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
var core_1 = require("@angular/core");
var D3 = require("d3");
var d3_draw_1 = require("./d3.draw");
var D3Component = (function () {
    function D3Component() {
        // constructor(private healthStatusService: HealthStatusService) { }
        this.xthings = 1000;
        this.ythings = 1000;
        this.d3dispatch = D3.dispatch('nodeHovered', 'nodeAbandoned', 'nodeClicked'); // make this a global import so other charts can use same one.
        this.reusableChart = d3_draw_1.statusRings; //the function object withan api on it that we call to get the actual draw func;
        this.initOnce = false;
        this.data = {};
    }
    Object.defineProperty(D3Component.prototype, "viewboxAttribute", {
        // @Input('drawFunction')
        // drawFunction: mytypes.ChartFunction<D3.Selection<SVGSVGElement, any, null, undefined>, mytypes.Graph, void, void>
        get: function () { return "0 0 " + this.xthings + " " + this.ythings; },
        enumerable: true,
        configurable: true
    });
    // @Input('drawFunctdksjfdion') drawFunckjnktion: () => (placeholder: D3.Selection<SVGSVGElement, any, null, undefined>, thedata: mytypes.Graph, dispatch: any) => void 
    //Component has loaded and now controls the view
    D3Component.prototype.ngAfterViewInit = function () {
        this.rootElement = this.root.nativeElement;
        this.rootSelection = D3.select(this.rootElement);
        this.d3svg = this.rootSelection.select('svg');
        if (!this.initOnce) {
            this.setup();
        }
        //do the first draw
        this.draw();
    };
    /**
    * Everythime the @Input is updated, we rebuild the chart
    **/
    D3Component.prototype.ngOnChanges = function (changes) {
        // if (!this.config || this.config.length === 0 || !this.host) return;
        // console.log("<<<<<<<<  onChanges simple is " + JSON.stringify(changes,null,2))
        if (!this.rootSelection) {
            // console.log("===============>>>>>>>>>WTF no rootSelection? ");
            return;
        }
        else {
        }
        if (!this.initOnce) {
            this.setup();
        }
        // this.setup();
        // this.manipulateOrBuildSVG();
        this.draw();
        // call other draw funcs for extra fancies 
        // this.drawXAxis();
        // this.drawYAxis();
    };
    /**
    * Basically we get the dom element size and build the container configs
    * also we create the xScale and yScale ranges depending on calculations
    **/
    D3Component.prototype.setup = function () {
        /* this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
         this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
         this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
         this.xScale = D3.time.scale().range([0, this.width]);
         this.yScale = D3.scale.linear().range([this.height, 0]);*/
        this.initOnce = true;
        //setup the drawfunc
        this.drawfunc = this.reusableChart();
    };
    // if we need to build the svg (eg we wiped it out by blanking html in rootElement so d3svg is null) or we want to tweek its attributes do it here
    // because this component uses the template and viewbox is used for scalable svg we dont need to change it
    D3Component.prototype.manipulateOrBuildSVG = function () { };
    D3Component.prototype.draw = function () {
        //sanity check we have selection and the data
        if (!this.data) {
            console.log("=================>>> WTF drawing with no data ");
            return;
        }
        if (!this.data.nodes) {
            console.log("=================>>> WTF drawing with no data.nodes ");
            return;
        }
        if (!this.data.links) {
            console.log("=================>>> WTF drawing with no data.links ");
            return;
        }
        this.drawfunc(this.d3svg, this.data, this.d3dispatch);
    };
    return D3Component;
}());
__decorate([
    core_1.Input('xgrads'),
    __metadata("design:type", Number)
], D3Component.prototype, "xthings", void 0);
__decorate([
    core_1.Input('ygrads'),
    __metadata("design:type", Number)
], D3Component.prototype, "ythings", void 0);
__decorate([
    core_1.Input('chartData'),
    __metadata("design:type", Object)
], D3Component.prototype, "data", void 0);
__decorate([
    core_1.ViewChild("d3root"),
    __metadata("design:type", core_1.ElementRef)
], D3Component.prototype, "root", void 0);
D3Component = __decorate([
    core_1.Component({
        selector: 'd3-chart',
        template: "\n  <div #d3root style=\"width: 100%\">\n    <svg [attr.viewBox]=\"viewboxAttribute\" preserveAspectRatio=\"xMidYMin meet\"></svg>\n  </div>\n  ",
    })
], D3Component);
exports.D3Component = D3Component;
//# sourceMappingURL=d3.component.js.map