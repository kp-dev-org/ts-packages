import { ServiceMetadata } from "../types/services-types";
import { ServiceDiscovery } from "./service-discovery";
export declare abstract class BaseService<T extends ServiceMetadata> {
    serviceInfo: T;
    serviceDiscovery: ServiceDiscovery;
    private shutdownHooks;
    private starHooks;
    constructor(serviceInfo: T, serviceDiscovery: ServiceDiscovery);
    protected registerService(): Promise<void>;
    abstract setupHealthCheckEndpoint(): void;
    addShutdownHook(hook: () => Promise<void> | void): void;
    abstract start(): Promise<void>;
    shutdown(): Promise<void>;
    getServiceInfo(): T;
}
//# sourceMappingURL=base.d.ts.map