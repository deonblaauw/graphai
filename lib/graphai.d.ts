export { AgentFunction, AgentFunctionDictonary, GraphData } from "./type";
import { AgentFunctionDictonary, GraphData, DataSource, ResultDataDictonary, ResultData, DefaultResultData } from "./type";
import { TransactionLog } from "./transaction_log";
import { ComputedNode, StaticNode } from "./node";
import { TaskManager } from "./task_manager";
type GraphNodes = Record<string, ComputedNode | StaticNode>;
export declare class GraphAI {
    private graphId;
    private data;
    nodes: GraphNodes;
    callbackDictonary: AgentFunctionDictonary;
    onLogCallback: (__log: TransactionLog, __isUpdate: boolean) => void;
    taskManager: TaskManager;
    private onComplete;
    private loop?;
    private repeatCount;
    verbose: boolean;
    private logs;
    private createNodes;
    private getValueFromResults;
    private initializeNodes;
    constructor(data: GraphData, callbackDictonary: AgentFunctionDictonary, taskManager?: TaskManager | undefined);
    getCallback(agentId?: string): import("./type").AgentFunction<any, any, any>;
    asString(): string;
    results<T = DefaultResultData>(): ResultDataDictonary<T>;
    errors(): Record<string, Error>;
    private pushReadyNodesIntoQueue;
    private pushQueueIfReady;
    pushQueueIfReadyAndRunning(node: ComputedNode): void;
    pushQueue(node: ComputedNode): void;
    run<T = DefaultResultData>(): Promise<ResultDataDictonary<T>>;
    isRunning(): boolean;
    onExecutionComplete(node: ComputedNode): void;
    private processLoopIfNecessary;
    appendLog(log: TransactionLog): void;
    updateLog(log: TransactionLog): void;
    transactionLogs(): TransactionLog[];
    injectValue(nodeId: string, value: ResultData): void;
    resultsOf(sources: Array<DataSource>): any[];
}
