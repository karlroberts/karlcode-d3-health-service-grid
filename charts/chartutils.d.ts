import { HSLColor } from 'd3';
declare let helper: {
    "whoami": string;
    "calcEmSize": () => number;
    "homogeneous": (stateList: string[]) => boolean;
    "canonicalSort": (stateList: string[]) => string[];
    "unique": (xs: any[]) => any[];
    "colourizeNode": (state: string) => HSLColor;
    "nodeSize": (state: string) => number;
    fixWordLength: (word: string, size: number, position?: string) => string;
};
export default helper;
