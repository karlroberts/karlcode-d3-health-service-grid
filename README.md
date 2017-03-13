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

5. If you use system.js as your builder you'll need to tell it where to find the grid library.
   You also need to point at the d3 and @types/d3 and @karlcode/d3-utils which are transitive dependencies...

   my `systemjs.config.js` looks like:

```Javascript
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic':  'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      'd3': 'npm:d3',
      '@karlcode/d3-utils': 'npm:@karlcode/d3-utils',
      '@karlcode/d3-health-service-grid': 'npm:@karlcode/d3-health-service-grid'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      d3: {
        main: 'build/d3.js',
        defaultExtension: 'js'
      },
      '@karlcode/d3-utils': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@karlcode/d3-health-service-grid': {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
```