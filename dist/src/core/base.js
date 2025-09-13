export class BaseService {
    constructor(serviceInfo, serviceDiscovery) {
        this.serviceInfo = serviceInfo;
        this.serviceDiscovery = serviceDiscovery;
        this.shutdownHooks = [];
        this.starHooks = [];
    }
    async registerService() {
        // Logic to register the service, e.g., with a service registry
        await this.serviceDiscovery.registerService(this.serviceInfo);
    }
    addShutdownHook(hook) {
        this.shutdownHooks.push(hook);
    }
    async shutdown() {
        const key = this.serviceDiscovery.getServiceKey(this.serviceInfo);
        await this.serviceDiscovery.unRegisterService(key);
        for (const hook of this.shutdownHooks) {
            await hook();
        }
    }
    getServiceInfo() {
        return this.serviceInfo;
    }
}
