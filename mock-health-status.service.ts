import { Injectable } from '@angular/core';

import { HealthStatusService, PWrapper } from './hs.types';

import { fakemodel } from './mock.health-status';

// Angular injectable service definition here ------------------
@Injectable()
export class MockHealthStatusService extends HealthStatusService {
    getStatus(): Promise<PWrapper> {
        return Promise.resolve(fakemodel);
    }
}


