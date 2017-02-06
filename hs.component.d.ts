import { OnInit } from '@angular/core';
import { Graph, HealthStatusService } from './hs.types';
export declare class HSChartComponent implements OnInit {
    private healthStatusService;
    constructor(healthStatusService: HealthStatusService);
    name: string;
    private rawmodel;
    model: Graph;
    getStatus(): void;
    ngOnInit(): void;
}
