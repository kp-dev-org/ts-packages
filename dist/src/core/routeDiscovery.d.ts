import { HttpServiceMetadata } from "../types";
import { HttpMethods, Route } from "../types/routeTypes";
export declare abstract class RouteDiscoveryService {
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
//# sourceMappingURL=routeDiscovery.d.ts.map