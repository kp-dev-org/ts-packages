import { Server } from "node:http";
import { HttpServiceMetadata, ServiceMetadata } from "../types";
import { BaseService } from "./base";
import { RouteDiscoveryService } from "./routeDiscovery";
import { ServiceDiscovery } from "./serviceDiscovery";

export abstract class HttpService<T extends ServiceMetadata> extends BaseService<T> {

    abstract setupHttpServer(): Promise<void>;
    abstract SetupHttpMiddlewares(): Promise<void> | void;
    abstract setupHttpRoutes(): Promise<void> | void;
    abstract getOpenapiSpecUrl(): Promise<void> | void;
    abstract getHttpServer(): Promise<Server>;
}

export abstract class ApiGatewayService extends HttpService<ServiceMetadata> {
    private routeDiscoveryService: RouteDiscoveryService;
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

    abstract startHealthCheckJob(interval: number): Promise<void>;
}

