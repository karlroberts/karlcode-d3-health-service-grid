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

export interface Node {
  "service": {
     "name": string,
     "dependsOn": string[],
     "description": string
  },
  "status": "string" //patch this after statusHistory is worked on
}

// Graph property joins nodes in the nodes array
export interface Link {
    // index in Nodes[] of the start of a link
    "source": number,
    // index on Node[] of the end of a link
    "target": number
}

export type Graph = {
    nodes: Node[],
    links: Link[],
    meta?: {}
};

export interface ChartFunction<E,D, Q, R> {
    (svg: E, data: D, dispatch?: Q ) : R, // hybrid type that is a function that returns T but has height and width API
    width:  (val? :number) => (number | this),
    height: (val? :number) => (number | this),
    num:    (val? :number) => (number | this),
    data:   (val? : Graph) => (Graph  | this),
}
