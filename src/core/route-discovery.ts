import { OpenAPISchemaParser } from "../helpers/openapi-schema-parser";
import { HttpServiceMetadata } from "../types";
import { HttpMethods, Route } from "../types/route-types";

export abstract class RouteDiscoveryService {
    private routePrefix: string = "routes";
    private openapiSchemaFetch: OpenAPISchemaParser;
    constructor() {
        this.openapiSchemaFetch = new OpenAPISchemaParser();
    }
    public async registerServiceRoute(services: HttpServiceMetadata[]): Promise<void> {
        for (const service of services) {
            const routes = await this.discoverRoutesFromServiceOpenapiSpec(service);
            for (const route of routes) {
                await this.saveRoute(route);
            }
        }
    }

    abstract saveRoute(route: Route): Promise<void>;
    abstract getAllRoutes(): Promise<Route[]>;

    public getRouteKey({ method, path }: { method: HttpMethods, path: string }) {
        return this._getRouteKey(method, path);
    }


    private _getRouteKey(method: HttpMethods, path: string) {
        return `${this.routePrefix}:${method}:${path}`;
    }
    abstract findRoute(method: HttpMethods, path: string): Promise<Route | null>;

    protected async discoverRoutesFromServiceOpenapiSpec(service: HttpServiceMetadata): Promise<Route[]> {
        // abstract getRouteService
        const routes = await this.openapiSchemaFetch.fetchAndExtractRoutes(
            {
                protocol: "http",
                serviceName: service.name,
                timeout: 5000,
                url: service.apiSpecificationUrl
            }
        )
        return routes;
    }


}