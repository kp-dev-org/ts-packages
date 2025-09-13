export class OpenAPISchemaParser {
    constructor() {
    }
    /**
     * Fetches OpenAPI schema from a server endpoint
     * @param url - The URL to fetch the OpenAPI schema from
     * @param timeout - Request timeout in milliseconds (default: 5000)
     * @returns Promise<OpenAPISchema>
     */
    async fetchOpenAPISchema(url, timeout = 5000) {
        const controller = new AbortController();
        try {
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                console.log(url);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const schema = await response.json();
            return schema;
        }
        catch (error) {
            controller.abort();
            throw error;
        }
    }
    /**
     * Extracts route information from OpenAPI schema
     * @param schema - The OpenAPI schema object
     * @param serviceName - The name of the service (used for route.name)
     * @param protocol - The protocol type (default: 'http')
     * @returns Array<Route>
     */
    extractRoutesFromSchema(schema, serviceName, protocol = 'http') {
        const routes = [];
        try {
            // Iterate through all paths in the schema
            Object.entries(schema.paths).forEach(([path, pathItem]) => {
                // Iterate through all HTTP methods for each path
                Object.entries(pathItem).forEach(([method, operation]) => {
                    var _a;
                    // Skip non-HTTP methods (like parameters, etc.)
                    if (!['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
                        return;
                    }
                    let hasRequiredUserIdHeader = false;
                    if (operation && typeof operation === 'object' && operation.parameters) {
                        const params = operation.parameters || [];
                        hasRequiredUserIdHeader = params.some((param) => param.name === 'userId' &&
                            param.in === 'header' &&
                            param.required === true);
                    }
                    // Check if there is a required parameter userId in header
                    const httpMethod = method.toUpperCase();
                    // Check if authentication is required
                    // const requireAuth = operation.security && operation.security.length > 0;
                    // Extract rate limiting information from custom extension
                    const rateLimit = operation['x-rate-limit'] ? {
                        windowMs: operation['x-rate-limit'].windowMs,
                        maxRequests: operation['x-rate-limit'].maxRequests
                    } : undefined;
                    // Create the route object
                    const route = {
                        path,
                        method: httpMethod,
                        protocol,
                        serviceName: serviceName,
                        serviceType: ((_a = operation.tags) === null || _a === void 0 ? void 0 : _a[0]) || serviceName,
                        targetPath: path,
                        requireAuth: hasRequiredUserIdHeader,
                        rateLimit
                    };
                    routes.push(route);
                });
            });
            return routes;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Fetches OpenAPI schema from a service and extracts route information
     * @param url - The URL to fetch the OpenAPI schema from
     * @param serviceName - The name of the service
     * @param protocol - The protocol type (default: 'http')
     * @param timeout - Request timeout in milliseconds (default: 5000)
     * @returns Promise<Route[]>
     */
    async fetchAndExtractRoutes({ protocol, serviceName, timeout, url }) {
        try {
            const schema = await this.fetchOpenAPISchema(url, timeout);
            const routes = this.extractRoutesFromSchema(schema, serviceName, protocol);
            return routes;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Validates if the fetched data is a valid OpenAPI schema
     * @param data - The data to validate
     * @returns boolean
     */
    isValidOpenAPISchema(data) {
        return (data &&
            typeof data === 'object' &&
            typeof data.openapi === 'string' &&
            data.info &&
            typeof data.info.title === 'string' &&
            typeof data.info.version === 'string' &&
            data.paths &&
            typeof data.paths === 'object');
    }
}
