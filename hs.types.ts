//types created here -----------------
export type HealthStatus = "OK" | "FAIL" ;

export interface StatusHistory {
  timestamp: string;
  status: HealthStatus;
  details?: string;
}

export interface Patient {
  name: string;
  statusHistory: Array<StatusHistory>;
  dependsOn: Array<string>;
  description?: string;
  metadata?: any;

}

export interface PWrapper {
  patients: Array<Patient>;
}

export abstract class HealthStatusService {
    abstract getStatus(): Promise<PWrapper>
}
