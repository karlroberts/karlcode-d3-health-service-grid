import { Component, OnInit, Inject} from '@angular/core';

import { PWrapper, Patient, HealthStatusService } from './hs.types';

import  { graphs } from '@karlcode/d3-utils';

//must be provided
// import {MockHealthStatusService} from './mock-health-status.service';

import modelutils from './charts/modelutils'


@Component({
  selector: 'ngx-hs-grid',
  template: `
   <d3-chart 
     [xgrads]=1024
     [ygrads]=768
     [chartData]=model
   >
   </d3-chart>
  `
  // ,providers: [MockHealthStatusService]
})
export class HSChartComponent implements OnInit  {

  constructor( @Inject('karlcode.HealthStatusService') private healthStatusService: HealthStatusService) { }

  name = 'Angular';

  private rawmodel: PWrapper = {patients: []};
  model: graphs.Graph
  
  getStatus(): void {
    this.healthStatusService.getStatus().then( stats => {
      this.rawmodel = stats;
      this.model = modelutils.convertPWrapperToPatientGraph(this.rawmodel); });
  }

  ngOnInit(): void {
    this.getStatus();
  }


  
}

