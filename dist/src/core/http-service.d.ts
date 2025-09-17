/// <reference types="node" />
import { Server } from "node:http";
import { HttpServiceMetadata, ServiceMetadata } from "../types";
import { BaseService } from "./base";
import { RouteDiscoveryService } from "./route-discovery";
import { ServiceDiscovery } from "./service-discovery";
export declare abstract class HttpService<T extends ServiceMetadata> extends BaseService<T> {
    abstract setupHttpServer(): Promise<void>;
    abstract SetupHttpMiddlewares(): Promise<void> | void;
    abstract setupHttpRoutes(): Promise<void> | void;
    abstract getOpenapiSpecUrl(): Promise<void> | void;
    abstract getHttpServer(): Promise<Server>;
}
export declare abstract class ApiGatewayService extends HttpService<ServiceMetadata> {
    serviceInfo: HttpServiceMetadata;
    routeDiscoveryService: RouteDiscoveryService;
    serviceDiscovery: ServiceDiscovery;
    constructor(serviceInfo: HttpServiceMetadata, serviceDiscovery: ServiceDiscovery, routeDiscoveryService: RouteDiscoveryService);
    abstract startServiceDiscoveryJob(): Promise<void>;
    abstract startRouteDiscoveryJob(interval: number): Promise<void>;
    abstract setupRouteDispatching(): Promise<void> | void;
    abstract startHealthCheckJob(interval: number): Promise<void>;
}
//# sourceMappingURL=http-service.d.ts.map