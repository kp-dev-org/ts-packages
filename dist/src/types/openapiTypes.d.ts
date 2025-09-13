export interface OpenAPIDocument {
    openapi: string;
    info: {
        title: string;
        version: string;
        description?: string;
        termsOfService?: string;
        contact?: {
            name?: string;
            url?: string;
            email?: string;
        };
        license?: {
            name: string;
            url?: string;
        };
    };
    servers?: Array<{
        url: string;
        description?: string;
        variables?: Record<string, {
            enum?: string[];
            default: string;
            description?: string;
        }>;
    }>;
    paths: {
        [path: string]: {
            [method: string]: any;
        };
    };
    components?: {
        schemas?: Record<string, any>;
        responses?: Record<string, any>;
        parameters?: Record<string, any>;
        examples?: Record<string, any>;
        requestBodies?: Record<string, any>;
        headers?: Record<string, any>;
        securitySchemes?: Record<string, any>;
        links?: Record<string, any>;
        callbacks?: Record<string, any>;
    };
    security?: Array<Record<string, string[]>>;
    tags?: Array<{
        name: string;
        description?: string;
        externalDocs?: {
            description?: string;
            url: string;
        };
    }>;
    externalDocs?: {
        description?: string;
        url: string;
    };
}
/**
 * Configuration options for merging OpenAPI documents
 */
export interface MergeOptions {
    /** Custom title for the merged document */
    title?: string;
    /** Custom description for the merged document */
    description?: string;
    /** Custom version for the merged document */
    version?: string;
    /** Whether to include service names as prefixes in operation IDs */
    prefixOperationIds?: boolean;
    /** Whether to include service names as tags */
    addServiceTags?: boolean;
    /** Custom conflict resolution strategy for duplicate paths */
    conflictResolution?: 'merge' | 'first-wins' | 'last-wins';
    /** Whether to remove userId header parameters from operations */
    removeUserIdHeaders?: boolean;
}
//# sourceMappingURL=openapiTypes.d.ts.map