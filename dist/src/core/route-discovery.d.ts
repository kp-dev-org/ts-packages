import { HttpServiceMetadata } from "../types";
import { HttpMethods, Route } from "../types/route-types";
export declare abstract class RouteDiscoveryService {
    private routePrefix;
    private openapiSchemaFetch;
    constructor();
    registerServiceRoute(services: HttpServiceMetadata[]): Promise<void>;
    abstract saveRoute(route: Route): Promise<void>;
    abstract getAllRoutes(): Promise<Route[]>;
    getRouteKey({ method, path }: {
        method: HttpMethods;
        path: string;
    }): string;
    private _getRouteKey;
    abstract findRoute(method: HttpMethods, path: string): Promise<Route | null>;
    protected discoverRoutesFromServiceOpenapiSpec(service: HttpServiceMetadata): Promise<Route[]>;
}
//# sourceMappingURL=route-discovery.d.ts.map