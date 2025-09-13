/// <reference types="node" />
import { Server } from "node:http";
import { HttpServiceMetadata, ServiceMetadata } from "../types";
import { BaseService } from "./base";
import { RouteDiscoveryService } from "./routeDiscovery";
import { ServiceDiscovery } from "./serviceDiscovery";
export declare abstract class HttpService<T extends ServiceMetadata> extends BaseService<T> {
    abstract setupHttpServer(): Promise<void>;
    abstract SetupHttpMiddlewares(): Promise<void> | void;
    abstract setupHttpRoutes(): Promise<void> | void;
    abstract getOpenapiSpecUrl(): Promise<void> | void;
    abstract getHttpServer(): Promise<Server>;
}
export declare abstract class ApiGatewayService extends HttpService<ServiceMetadata> {
    serviceInfo: HttpServiceMetadata;
    private routeDiscoveryService;
    serviceDiscovery: ServiceDiscovery;
    constructor(serviceInfo: HttpServiceMetadata, serviceDiscovery: ServiceDiscovery, routeDiscoveryService: RouteDiscoveryService);
    abstract startServiceDiscoveryJob(): Promise<void>;
    abstract startRouteDiscoveryJob(interval: number): Promise<void>;
    abstract startHealthCheckJob(interval: number): Promise<void>;
}
//# sourceMappingURL=httpService.d.ts.map