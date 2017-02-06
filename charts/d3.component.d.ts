import { ElementRef, OnChanges, AfterViewInit } from '@angular/core';
export declare class D3Component implements OnChanges, AfterViewInit {
    xthings: number;
    ythings: number;
    private thedata;
    private rootElement;
    private rootSelection;
    private d3svg;
    private d3dispatch;
    private reusableChart;
    private drawfunc;
    private initOnce;
    data: any;
    readonly viewboxAttribute: string;
    root: ElementRef;
    ngAfterViewInit(): void;
    /**
    * Everythime the @Input is updated, we rebuild the chart
    **/
    ngOnChanges(changes: any): void;
    /**
    * Basically we get the dom element size and build the container configs
    * also we create the xScale and yScale ranges depending on calculations
    **/
    private setup();
    private manipulateOrBuildSVG();
    private draw();
}
