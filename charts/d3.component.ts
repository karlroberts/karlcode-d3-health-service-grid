import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit} from '@angular/core';
import * as D3 from 'd3';
import * as mytypes from '../hs.types'
import { statusRings } from './d3.draw'


@Component({
  selector: 'd3-chart',
  template: `
  <div #d3root style="width: 100%">
    <svg [attr.viewBox]="viewboxAttribute" preserveAspectRatio="xMidYMin meet"></svg>
  </div>
  `,

  // providers: [HealthStatusService]
})
export class D3Component implements OnChanges, AfterViewInit  {

  // constructor(private healthStatusService: HealthStatusService) { }
  @Input('xgrads') 
  xthings: number = 1000;

  @Input('ygrads') 
  ythings: number = 1000;

  private thedata: any;
  private rootElement: Element; // the root native element inside which is an svg
  private rootSelection: any;
  private d3svg: any; //svg selection
  private d3dispatch: any = D3.dispatch(
    'nodeHovered',
    'nodeAbandoned',
    'nodeClicked',); // make this a global import so other charts can use same one.
  private reusableChart: any = statusRings; //the function object withan api on it that we call to get the actual draw func;
  private drawfunc: any;

  private initOnce: boolean = false;

  @Input('chartData')
  data: any = {};
  

  // @Input('drawFunction')
  // drawFunction: mytypes.ChartFunction<D3.Selection<SVGSVGElement, any, null, undefined>, mytypes.Graph, void, void>

  get viewboxAttribute(): string { return "0 0 " + this.xthings + " " + this.ythings  ; }
  
  @ViewChild("d3root")
  root: ElementRef
  
  // @Input('drawFunctdksjfdion') drawFunckjnktion: () => (placeholder: D3.Selection<SVGSVGElement, any, null, undefined>, thedata: mytypes.Graph, dispatch: any) => void 

  //Component has loaded and now controls the view
  ngAfterViewInit() {
    this.rootElement = this.root.nativeElement;
    this.rootSelection = D3.select(this.rootElement);
    this.d3svg = this.rootSelection.select('svg');
    if(!this.initOnce) { this.setup(); }

    //do the first draw
    this.draw();
  }
  /**
  * Everythime the @Input is updated, we rebuild the chart
  **/
  ngOnChanges(changes: any): void {
    // if (!this.config || this.config.length === 0 || !this.host) return;
    // console.log("<<<<<<<<  onChanges simple is " + JSON.stringify(changes,null,2))
    if(!this.rootSelection) {
      // console.log("===============>>>>>>>>>WTF no rootSelection? ");
      return;
    }
    else {
//  console.log("===============>>>>>>>>>WOOT we have rootSelection ");
    }

    if(!this.initOnce) { this.setup(); }

    // this.setup();
    // this.manipulateOrBuildSVG();
    this.draw();

    // call other draw funcs for extra fancies 
    // this.drawXAxis();
    // this.drawYAxis();
  }


  /**
  * Basically we get the dom element size and build the container configs
  * also we create the xScale and yScale ranges depending on calculations
  **/
  private setup(): void {
   /* this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
    this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
    this.xScale = D3.time.scale().range([0, this.width]);
    this.yScale = D3.scale.linear().range([this.height, 0]);*/

    this.initOnce = true;
    //setup the drawfunc
    this.drawfunc = this.reusableChart();
  }

  // if we need to build the svg (eg we wiped it out by blanking html in rootElement so d3svg is null) or we want to tweek its attributes do it here
  // because this component uses the template and viewbox is used for scalable svg we dont need to change it
  private manipulateOrBuildSVG(): void {}

  private draw(): void {
    //sanity check we have selection and the data
    if(!this.data) { console.log("=================>>> WTF drawing with no data "); return; }
    if(!this.data.nodes) { console.log("=================>>> WTF drawing with no data.nodes "); return; }
    if(!this.data.links) { console.log("=================>>> WTF drawing with no data.links "); return; }
    this.drawfunc(this.d3svg, this.data, this.d3dispatch);
  }

  
  
}