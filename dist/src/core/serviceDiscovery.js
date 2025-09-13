export class ServiceDiscovery {
    getServiceKey(serviceInfo) {
        return `services:${serviceInfo.name}-${serviceInfo.id}`;
    }
}
