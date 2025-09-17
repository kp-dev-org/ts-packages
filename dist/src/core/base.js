"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(serviceInfo) {
        this.serviceInfo = serviceInfo;
        this.shutdownHooks = [];
        this.starHooks = [];
    }
    addShutdownHook(hook) {
        this.shutdownHooks.push(hook);
    }
    async shutdown() {
        // const key = this.serviceDiscovery.getServiceKey(this.serviceInfo);
        // await this.serviceDiscovery.unRegisterService(key);
        for (const hook of this.shutdownHooks) {
            await hook();
        }
    }
    getServiceInfo() {
        return this.serviceInfo;
    }
}
exports.BaseService = BaseService;
