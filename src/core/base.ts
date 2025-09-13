import { ServiceMetadata } from "../types/servicesTypes";
import { ServiceDiscovery } from "./serviceDiscovery";

export abstract class BaseService<T extends ServiceMetadata> {
    private shutdownHooks: Array<() => Promise<void> | void> = [];
    private starHooks: Array<() => Promise<void> | void> = [];
    constructor(public serviceInfo: T, public serviceDiscovery: ServiceDiscovery


    ) { }
    protected async registerService(): Promise<void> {
        // Logic to register the service, e.g., with a service registry
        await this.serviceDiscovery.registerService(this.serviceInfo);
    }

    public addShutdownHook(hook: () => Promise<void> | void): void {
        this.shutdownHooks.push(hook);
    }

    abstract start(): Promise<void>;

    public async shutdown(): Promise<void> {

        const key = this.serviceDiscovery.getServiceKey(this.serviceInfo);
        await this.serviceDiscovery.unRegisterService(key);
        for (const hook of this.shutdownHooks) {
            await hook();
        }
    }

    public getServiceInfo(): T {
        return this.serviceInfo;
    }

}

