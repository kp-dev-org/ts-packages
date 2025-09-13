import { ApiGatewayService, ServiceDiscovery } from "../core";
import { RouteDiscoveryService } from "../core/route-discovery";
class KPGateWay extends ApiGatewayService {
    getHttpServer() {
        throw new Error("Method not implemented.");
    }
    startHealthCheckJob(interval) {
        throw new Error("Method not implemented.");
    }
    getOpenapiSpecUrl() {
        throw new Error("Method not implemented.");
    }
    SetupHttpMiddlewares() {
        throw new Error("Method not implemented.");
    }
    startServiceDiscoveryJob() {
        throw new Error("Method not implemented.");
    }
    startRouteDiscoveryJob(interval) {
        throw new Error("Method not implemented.");
    }
    setupHttpServer() {
        throw new Error("Method not implemented.");
    }
    setupHttpRoutes() {
        throw new Error("Method not implemented.");
    }
    async start() {
        await this.setupHttpServer();
        await this.SetupHttpMiddlewares();
        await this.setupHttpRoutes();
        throw new Error("Method not implemented.");
    }
}
class RouteDiscoveryServiceImpl extends RouteDiscoveryService {
    getAllRoutes() {
        throw new Error("Method not implemented.");
    }
    saveRoute(route) {
        throw new Error("Method not implemented.");
    }
    findRoute(method, path) {
        throw new Error("Method not implemented.");
    }
}
class ServiceDiscoveryImpl extends ServiceDiscovery {
    registerService(serviceInfo) {
        throw new Error("Method not implemented.");
    }
    getService(key) {
        throw new Error("Method not implemented.");
    }
    getRegistredServices() {
        throw new Error("Method not implemented.");
    }
    unRegisterService(key) {
        throw new Error("Method not implemented.");
    }
    init(config) {
        throw new Error("Method not implemented.");
    }
    getServicesByName(name) {
        throw new Error("Method not implemented.");
    }
}
const serviceDiscovery = new ServiceDiscoveryImpl();
const routeDiscoveryService = new RouteDiscoveryServiceImpl();
const gateway = new KPGateWay({
    name: "gateway", apiSpecificationUrl: "",
    extraRoutes: [], host: "", httpPort: 4000,
    id: ""
}, serviceDiscovery, routeDiscoveryService);
gateway.start();
