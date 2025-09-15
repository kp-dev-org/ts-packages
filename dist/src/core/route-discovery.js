"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteDiscoveryService = void 0;
const openapi_schema_parser_1 = require("../helpers/openapi-schema-parser");
class RouteDiscoveryService {
    constructor() {
        this.routePrefix = "routes";
        this.openapiSchemaFetch = new openapi_schema_parser_1.OpenAPISchemaParser();
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
        let schema = "https";
        let port = service.httpsPort;
        if (!port) {
            port = service.httpPort;
            schema = "http";
        }
        const baseUrl = `${schema}://${service.host}:${port}/${service.apiSpecificationUrl}`;
        console.log(baseUrl);
        const routes = await this.openapiSchemaFetch.fetchAndExtractRoutes({
            protocol: "http",
            serviceName: service.name,
            timeout: 5000,
            url: baseUrl
        });
        return routes;
    }
}
exports.RouteDiscoveryService = RouteDiscoveryService;
