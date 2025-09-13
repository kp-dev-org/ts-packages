import { BaseService } from "./base";
export class HttpService extends BaseService {
}
export class ApiGatewayService extends HttpService {
    constructor(serviceInfo, serviceDiscovery, routeDiscoveryService) {
        super(serviceInfo, serviceDiscovery);
        this.serviceInfo = serviceInfo;
        this.routeDiscoveryService = routeDiscoveryService;
        this.serviceDiscovery = serviceDiscovery;
    }
}
