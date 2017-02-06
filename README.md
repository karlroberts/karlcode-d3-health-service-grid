usage:

1. add the npm module to your node_modules dir and package.json

    npm install --registry https://nexus.aws.avocado.com.au/repository/npm-public/ --save

2. The npm module `@karlcode/d3-health-service-grid` exposes an angular module which exposes a HealthStatusService interface
   and an `HSChartComponent` that needs to be injected with a HealthStatusService called "`karlcode.HealthStatusService`",
   it also has a MockHeathService that you can use initially until you write your own... so to use this create an AppModule
   
   notice that we provide the Mock HealthStatusService :- 

    // file app.module.ts

    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { AppComponent } from './app.component';

    import { HSModule } from '@karlcode/d3-health-service-grid';

    import {MockHealthStatusService} from '@karlcode/d3-health-service-grid';

    @NgModule({
      imports:      [ BrowserModule, HSModule ],
      declarations: [ AppComponent ],
      providers: [ { provide: 'karlcode.HealthStatusService', useClass: MockHealthStatusService } ],
      bootstrap:    [ AppComponent ]
    })
    export class AppModule { }

3. The HSChartComponent has a selector called `ngx-hs-grid` that places so a minimal app.component.ts looks like :- 

    // file app.component.ts

    import { Component } from '@angular/core';

    @Component({
      selector: 'my-app',
      template: `
    <div style="width: 45%;">
      <ngx-hs-grid></ngx-hs-grid>
    </div>
      `
    })
    export class AppComponent {}

4. when you write your own `HealthStatusService` you must implement the interface `HealthStatusService` and return a promise of `Pwrappers`

    import { Injectable } from '@angular/core';
    import { HealthStatusService, PWrapper } from '@karlcode/d3-health-service-grid';
    import { fakemodel } from './mock.health-status';

    // Angular injectable service definition here ------------------
    @Injectable()
    export class MockHealthStatusService extends HealthStatusService {
      getStatus(): Promise<PWrapper> {
        return Promise.resolve(fakemodel);
      }
    }
