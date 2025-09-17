import { Server } from "http";
import { ApiGatewayService, ServiceDiscovery } from "../core";
import { RouteDiscoveryService } from "../core/route-discovery";
import { HttpServiceMetadata, Route, HttpMethods, RedisConfig, ServiceMetadata } from "../types";

class KPGateWay extends ApiGatewayService {
    registerService(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setupRouteDispatching(): Promise<void> | void {
        throw new Error("Method not implemented.");
    }
    setupHealthCheckEndpoint(): void {
        throw new Error("Method not implemented.");
    }
    getHttpServer(): Promise<Server> {
        throw new Error("Method not implemented.");
    }
    startHealthCheckJob(interval: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getOpenapiSpecUrl(): Promise<void> | void {
        throw new Error("Method not implemented.");
    }
    SetupHttpMiddlewares(): Promise<void> | void {
        throw new Error("Method not implemented.");
    }
    startServiceDiscoveryJob(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    startRouteDiscoveryJob(interval: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setupHttpServer(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setupHttpRoutes(): void {
        throw new Error("Method not implemented.");
    }

    async start(): Promise<void> {
        await this.setupHttpServer();
        await this.SetupHttpMiddlewares();
        await this.setupHttpRoutes();
        throw new Error("Method not implemented.");
    }
}

class RouteDiscoveryServiceImpl extends RouteDiscoveryService {
    getAllRoutes(): Promise<Route[]> {
        throw new Error("Method not implemented.");
    }
    saveRoute(route: Route): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findRoute(method: HttpMethods, path: string): Promise<Route | null> {
        throw new Error("Method not implemented.");
    }

}



class ServiceDiscoveryImpl extends ServiceDiscovery {

    registerService<T extends ServiceMetadata>(serviceInfo: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getService<T extends ServiceMetadata>(key: string): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
    getRegistredServices<T extends ServiceMetadata>(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    unRegisterService(key: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    init(config: RedisConfig): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getServicesByName<T extends ServiceMetadata>(name: string): Promise<T | null> {
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