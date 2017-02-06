import { HealthStatusService, PWrapper } from './hs.types';
export declare class MockHealthStatusService extends HealthStatusService {
    getStatus(): Promise<PWrapper>;
}
