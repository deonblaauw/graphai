import { AgentFunction } from "../../graphai";
export declare const shiftAgent: AgentFunction<Record<string, any>, Record<string, any>, Record<string, any>>;
declare const shiftAgentInfo: {
    name: string;
    agent: AgentFunction<Record<string, any>, Record<string, any>, Record<string, any>>;
    mock: AgentFunction<Record<string, any>, Record<string, any>, Record<string, any>>;
    samples: ({
        inputs: number[][];
        params: {};
        result: {
            array: number[];
            item: number;
        };
    } | {
        inputs: string[][];
        params: {};
        result: {
            array: string[];
            item: string;
        };
    })[];
    description: string;
    category: never[];
    author: string;
    repository: string;
    license: string;
};
export default shiftAgentInfo;