import { OpenAPISchemaParser } from "../helpers/openapi-schema-parser";
export class RouteDiscoveryService {
    constructor() {
        this.routePrefix = "routes";
        this.openapiSchemaFetch = new OpenAPISchemaParser();
    }
    async registerServiceRoute(services) {
        for (const service of services) {
            const routes = await this.discoverRoutesFromServiceOpenapiSpec(service);
            for (const route of routes) {
                await this.saveRoute(route);
            }
        }
    }
    getRouteKey({ method, path }) {
        return this._getRouteKey(method, path);
    }
    _getRouteKey(method, path) {
        return `${this.routePrefix}:${method}:${path}`;
    }
    async discoverRoutesFromServiceOpenapiSpec(service) {
        // abstract getRouteService
        const routes = await this.openapiSchemaFetch.fetchAndExtractRoutes({
            protocol: "http",
            serviceName: service.name,
            timeout: 5000,
            url: service.apiSpecificationUrl
        });
        return routes;
    }
}
