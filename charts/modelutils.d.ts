import { PWrapper } from '../hs.types';
/**
 * Implement a hacky ENUM
 **/
declare let statemap: {};
declare let statevalues: {};
export { statemap };
export { statevalues };
declare var _default: {
    "homogeneous": (statelist: string[]) => boolean;
    "canonicalSort": (statelist: string[]) => string[];
    "arrayContains": (needle: any) => boolean;
    "prepareDeleteFromModel": (newModelKeys: any[], oldModelKeys: any[]) => string[];
    "filterVersion": (input: string, numpointsS: string) => string;
    "evaluateStates": (stateArray: string[]) => any;
    "nodeStatus": (nodename: string, statusHistoryMap: any, sliceSize?: number) => "WARN" | "OK" | "UNKNOWN" | "ERROR";
    "convertPWrapperToPatientGraph": (rawModel: PWrapper) => any;
};
export default _default;
