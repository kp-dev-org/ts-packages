"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmptyOpenAPIDocument = exports.fetchAndMergeOpenApiDocs = exports.mergeOpenApiDocs = void 0;
/**
 * Merges multiple OpenAPI documents into a single unified document
 *
 * @param docs - Array of OpenAPI documents to merge
 * @param options - Optional configuration for the merge process
 * @returns Merged OpenAPI document
 * @throws Error if the input array is empty or documents are invalid
 *
 * @example
 * ```typescript
 * const docs = [userServiceDoc, orderServiceDoc, paymentServiceDoc];
 * const merged = mergeOpenApiDocs(docs, {
 *   title: "Unified API",
 *   description: "Combined API documentation",
 *   addServiceTags: true
 * });
 * ```
 */
function mergeOpenApiDocs(docs, options = {}) {
    if (docs.length === 0) {
        throw new Error('Cannot merge empty array of OpenAPI documents');
    }
    if (docs.length === 1) {
        return docs[0];
    }
    // Validate input documents
    docs.forEach((doc, index) => {
        if (!isValidOpenAPIDocument(doc)) {
            throw new Error(`Invalid OpenAPI document at index ${index}`);
        }
    });
    const { title = "Merged API Documentation", description = `Combined API documentation from ${docs.length} services`, version = "1.0.0", conflictResolution = 'merge', prefixOperationIds = false, addServiceTags = false, removeUserIdHeaders = false } = options; // Start with the first document as the base
    const merged = JSON.parse(JSON.stringify(docs[0]));
    // Update info to reflect merged nature
    merged.info.title = title;
    merged.info.description = description;
    merged.info.version = version;
    // Initialize components if not present
    if (!merged.components) {
        merged.components = {};
    }
    // Track service names for tagging
    const serviceNames = new Set();
    // Merge remaining documents
    for (let i = 1; i < docs.length; i++) {
        const doc = docs[i];
        const serviceName = extractServiceName(doc);
        serviceNames.add(serviceName);
        // Merge paths
        if (doc.paths) {
            Object.entries(doc.paths).forEach(([path, pathItem]) => {
                if (merged.paths[path]) {
                    // Handle path conflicts based on strategy
                    switch (conflictResolution) {
                        case 'first-wins':
                            // Skip if path already exists
                            break;
                        case 'last-wins':
                            merged.paths[path] = pathItem;
                            break;
                        case 'merge':
                        default:
                            // Merge the methods, with later documents overwriting conflicting methods
                            Object.assign(merged.paths[path], pathItem);
                            break;
                    }
                }
                else {
                    merged.paths[path] = pathItem;
                }
                // Add service tags and prefix operation IDs if requested
                if (addServiceTags || prefixOperationIds) {
                    Object.entries(merged.paths[path]).forEach(([method, operation]) => {
                        if (operation && typeof operation === 'object') {
                            if (addServiceTags) {
                                if (!operation.tags) {
                                    operation.tags = [];
                                }
                                if (!operation.tags.includes(serviceName)) {
                                    operation.tags.unshift(serviceName);
                                }
                            }
                            if (prefixOperationIds && operation.operationId) {
                                operation.operationId = `${serviceName}_${operation.operationId}`;
                            }
                        }
                    });
                }
            });
        }
        // Merge components
        if (doc.components) {
            mergeComponents(merged.components, doc.components, serviceName);
        }
        // Merge servers (avoid duplicates)
        if (doc.servers) {
            if (!merged.servers) {
                merged.servers = [];
            }
            doc.servers.forEach(server => {
                const exists = merged.servers.some(existingServer => existingServer.url === server.url);
                if (!exists) {
                    merged.servers.push(server);
                }
            });
        }
        // Merge tags (avoid duplicates)
        if (doc.tags) {
            if (!merged.tags) {
                merged.tags = [];
            }
            doc.tags.forEach(tag => {
                const exists = merged.tags.some(existingTag => existingTag.name === tag.name);
                if (!exists) {
                    merged.tags.push(tag);
                }
            });
        }
        // Merge security (avoid duplicates)
        if (doc.security) {
            if (!merged.security) {
                merged.security = [];
            }
            doc.security.forEach(securityReq => {
                const exists = merged.security.some(existingSecurity => JSON.stringify(existingSecurity) === JSON.stringify(securityReq));
                if (!exists) {
                    merged.security.push(securityReq);
                }
            });
        }
    }
    // Add service tags to the global tags list if requested
    if (addServiceTags) {
        if (!merged.tags) {
            merged.tags = [];
        }
        serviceNames.forEach(serviceName => {
            const exists = merged.tags.some(tag => tag.name === serviceName);
            if (!exists) {
                merged.tags.push({
                    name: serviceName,
                    description: `Operations from ${serviceName} service`
                });
            }
        });
    }
    // Remove userId header parameters if requested
    if (removeUserIdHeaders) {
        removeUserIdHeaderParameters(merged);
    }
    return merged;
}
exports.mergeOpenApiDocs = mergeOpenApiDocs;
/**
 * Merges OpenAPI components, handling potential naming conflicts
 */
function mergeComponents(target, source, serviceName) {
    Object.entries(source).forEach(([componentType, componentItems]) => {
        if (componentItems && typeof componentItems === 'object') {
            if (!target[componentType]) {
                target[componentType] = {};
            }
            const targetComponent = target[componentType];
            Object.entries(componentItems).forEach(([componentName, componentValue]) => {
                // Handle naming conflicts by prefixing with service name
                const finalName = targetComponent[componentName]
                    ? `${serviceName}_${componentName}`
                    : componentName;
                targetComponent[finalName] = componentValue;
            });
        }
    });
}
/**
 * Extracts a service name from an OpenAPI document
 */
function extractServiceName(doc) {
    // Try to extract service name from the title, fallback to a default
    const title = doc.info.title;
    if (title) {
        // Convert title to a valid tag name (remove spaces, special characters)
        return title
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-_]/g, '')
            .toLowerCase();
    }
    return 'service';
}
/**
 * Validates if an object is a valid OpenAPI document
 */
function isValidOpenAPIDocument(obj) {
    return (obj &&
        typeof obj === 'object' &&
        typeof obj.openapi === 'string' &&
        obj.info &&
        typeof obj.info === 'object' &&
        typeof obj.info.title === 'string' &&
        typeof obj.info.version === 'string' &&
        obj.paths &&
        typeof obj.paths === 'object');
}
/**
 * Fetches OpenAPI documents from URLs and merges them
 *
 * @param urls - Array of URLs to fetch OpenAPI documents from
 * @param options - Optional configuration for the merge process
 * @param fetchOptions - Optional fetch configuration (timeout, headers, etc.)
 * @returns Promise resolving to merged OpenAPI document
 *
 * @example
 * ```typescript
 * const urls = [
 *   'http://user-service/openapi.json',
 *   'http://order-service/openapi.json'
 * ];
 *
 * const merged = await fetchAndMergeOpenApiDocs(urls, {
 *   title: "Microservices API",
 *   addServiceTags: true
 * });
 * ```
 */
async function fetchAndMergeOpenApiDocs(urls, options = {}, fetchOptions = {}) {
    const { timeout = 5000, ...restFetchOptions } = fetchOptions;
    const docs = await Promise.all(urls.map(async (url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(url, {
                ...restFetchOptions,
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...restFetchOptions.headers
                }
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const doc = await response.json();
            return doc;
        }
        catch (error) {
            clearTimeout(timeoutId);
            throw new Error(`Failed to fetch OpenAPI doc from ${url}: ${error}`);
        }
    }));
    return mergeOpenApiDocs(docs, options);
}
exports.fetchAndMergeOpenApiDocs = fetchAndMergeOpenApiDocs;
/**
 * Utility function to create a basic OpenAPI document structure
 */
function createEmptyOpenAPIDocument(title = "API Documentation", version = "1.0.0") {
    return {
        openapi: "3.0.0",
        info: {
            title,
            version
        },
        paths: {}
    };
}
exports.createEmptyOpenAPIDocument = createEmptyOpenAPIDocument;
/**
 * Removes required userId header parameters from all operations in an OpenAPI document
 * This function handles both inline parameters and referenced parameters
 * @param doc - The OpenAPI document to process (modified in place)
 */
function removeUserIdHeaderParameters(doc) {
    var _a;
    // Process each path in the document
    Object.values(doc.paths).forEach(pathItem => {
        if (pathItem && typeof pathItem === 'object') {
            // Process each HTTP method in the path
            Object.values(pathItem).forEach(operation => {
                if (operation && typeof operation === 'object' && operation.parameters) {
                    // Filter out userId header parameters
                    operation.parameters = operation.parameters.filter((param) => {
                        var _a, _b;
                        // Handle direct parameter objects
                        if (param && typeof param === 'object') {
                            // Check for direct parameter definition
                            if (param.name === 'userId' && param.in === 'header') {
                                return false; // Remove this parameter
                            }
                            // Handle parameter references ($ref)
                            if (param.$ref && typeof param.$ref === 'string') {
                                // Extract the parameter name from the reference
                                const refParts = param.$ref.split('/');
                                const paramName = refParts[refParts.length - 1];
                                // Check if this is a userId header parameter reference
                                if ((_b = (_a = doc.components) === null || _a === void 0 ? void 0 : _a.parameters) === null || _b === void 0 ? void 0 : _b[paramName]) {
                                    const referencedParam = doc.components.parameters[paramName];
                                    if (referencedParam.name === 'userId' && referencedParam.in === 'header') {
                                        return false; // Remove this parameter reference
                                    }
                                }
                            }
                        }
                        return true; // Keep this parameter
                    });
                }
            });
        }
    });
    // Also remove userId header parameters from the components.parameters section
    if ((_a = doc.components) === null || _a === void 0 ? void 0 : _a.parameters) {
        Object.keys(doc.components.parameters).forEach(paramName => {
            const param = doc.components.parameters[paramName];
            if (param && param.name === 'userId' && param.in === 'header') {
                delete doc.components.parameters[paramName];
            }
        });
    }
}
