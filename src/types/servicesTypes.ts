import { Route } from "./routeTypes";

export interface ServiceMetadata {
    id: string;
    name: string;
    description?: string;
    version?: string;
    host: string;
    metadata?: Record<string, any>;

}

export interface HttpServiceMetadata extends ServiceMetadata {
    httpPort: number;
    httpsPort?: number;
    apiSpecificationUrl: string;
    extraRoutes: Array<Route>;
}

export interface GrpcServiceMetadata extends ServiceMetadata {
    grpcPort: number;
}