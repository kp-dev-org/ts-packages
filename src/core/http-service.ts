import { Server } from "node:http";
import { HttpServiceMetadata, ServiceMetadata } from "../types";
import { BaseService } from "./base";
import { RouteDiscoveryService } from "./route-discovery";
import { ServiceDiscovery } from "./service-discovery";

export abstract class HttpService<T extends ServiceMetadata> extends BaseService<T> {
    abstract setupHttpServer(): Promise<void>;
    abstract SetupHttpMiddlewares(): Promise<void> | void;
    abstract setupHttpRoutes(): Promise<void> | void;
    abstract getOpenapiSpecUrl(): Promise<void> | void;
    abstract getHttpServer(): Promise<Server>;
}


export abstract class MicroService extends HttpService<ServiceMetadata> {
    public routeDiscoveryService: RouteDiscoveryService;
    public serviceDiscovery: ServiceDiscovery;
    constructor(public serviceInfo: HttpServiceMetadata,
        serviceDiscovery: ServiceDiscovery,
        routeDiscoveryService: RouteDiscoveryService) {
        super(serviceInfo, serviceDiscovery)
        this.routeDiscoveryService = routeDiscoveryService;
        this.serviceDiscovery = serviceDiscovery;
    }
}

export abstract class ApiGatewayService extends HttpService<ServiceMetadata> {
    public routeDiscoveryService: RouteDiscoveryService;
    public serviceDiscovery: ServiceDiscovery;
    constructor(public serviceInfo: HttpServiceMetadata,
        serviceDiscovery: ServiceDiscovery,
        routeDiscoveryService: RouteDiscoveryService) {
        super(serviceInfo, serviceDiscovery)
        this.routeDiscoveryService = routeDiscoveryService;
        this.serviceDiscovery = serviceDiscovery;
    }
    abstract startServiceDiscoveryJob(): Promise<void>;
    abstract startRouteDiscoveryJob(interval: number): Promise<void>;
    abstract setupRouteDispatching(): Promise<void> | void;
    abstract startHealthCheckJob(interval: number): Promise<void>;
}



