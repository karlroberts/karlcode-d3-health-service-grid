export declare type HealthStatus = "OK" | "FAIL";
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
export declare abstract class HealthStatusService {
    abstract getStatus(): Promise<PWrapper>;
}
export interface Node {
    "service": {
        "name": string;
        "dependsOn": string[];
        "description": string;
    };
    "status": "string";
}
export interface Link {
    "source": number;
    "target": number;
}
export declare type Graph = {
    nodes: Node[];
    links: Link[];
    meta?: {};
};
export interface ChartFunction<E, D, Q, R> {
    (svg: E, data: D, dispatch?: Q): R;
    width: (val?: number) => (number | this);
    height: (val?: number) => (number | this);
    num: (val?: number) => (number | this);
    data: (val?: Graph) => (Graph | this);
}
