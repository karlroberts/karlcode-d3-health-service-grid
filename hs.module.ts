import { NgModule }                from '@angular/core';

import { HSChartComponent }        from './hs.component';

import { D3Component }             from './charts/d3.component';


@NgModule({
    imports: [ ],
    declarations: [ D3Component, HSChartComponent ],
    exports: [ HSChartComponent, D3Component ]
})
export class HSModule {}