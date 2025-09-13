import { HttpProtocols } from "../types/protocol-types";
import { Route } from "../types/route-types";
export declare class OpenAPISchemaParser {
    constructor();
    /**
     * Fetches OpenAPI schema from a server endpoint
     * @param url - The URL to fetch the OpenAPI schema from
     * @param timeout - Request timeout in milliseconds (default: 5000)
     * @returns Promise<OpenAPISchema>
     */
    private fetchOpenAPISchema;
    /**
     * Extracts route information from OpenAPI schema
     * @param schema - The OpenAPI schema object
     * @param serviceName - The name of the service (used for route.name)
     * @param protocol - The protocol type (default: 'http')
     * @returns Array<Route>
     */
    private extractRoutesFromSchema;
    /**
     * Fetches OpenAPI schema from a service and extracts route information
     * @param url - The URL to fetch the OpenAPI schema from
     * @param serviceName - The name of the service
     * @param protocol - The protocol type (default: 'http')
     * @param timeout - Request timeout in milliseconds (default: 5000)
     * @returns Promise<Route[]>
     */
    fetchAndExtractRoutes({ protocol, serviceName, timeout, url }: {
        url: string;
        serviceName: string;
        protocol: HttpProtocols;
        timeout: number;
    }): Promise<Route[]>;
    /**
     * Validates if the fetched data is a valid OpenAPI schema
     * @param data - The data to validate
     * @returns boolean
     */
    private isValidOpenAPISchema;
}
//# sourceMappingURL=openapi-schema-parser.d.ts.map