"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDiscovery = void 0;
class ServiceDiscovery {
    getServiceKey(serviceInfo) {
        return `services:${serviceInfo.name}-${serviceInfo.id}`;
    }
}
exports.ServiceDiscovery = ServiceDiscovery;
