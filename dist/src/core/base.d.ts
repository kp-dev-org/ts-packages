import { ServiceMetadata } from "../types/services-types";
export declare abstract class BaseService<T extends ServiceMetadata> {
    serviceInfo: T;
    private shutdownHooks;
    private starHooks;
    constructor(serviceInfo: T);
    abstract registerService(): Promise<void>;
    abstract setupHealthCheckEndpoint(): void;
    addShutdownHook(hook: () => Promise<void> | void): void;
    abstract start(): Promise<void>;
    shutdown(): Promise<void>;
    getServiceInfo(): T;
}
//# sourceMappingURL=base.d.ts.map