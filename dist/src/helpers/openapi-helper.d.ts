import { OpenAPIDocument, MergeOptions } from "../types/openapi-types";
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
export declare function mergeOpenApiDocs(docs: OpenAPIDocument[], options?: MergeOptions): OpenAPIDocument;
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
export declare function fetchAndMergeOpenApiDocs(urls: string[], options?: MergeOptions, fetchOptions?: RequestInit & {
    timeout?: number;
}): Promise<OpenAPIDocument>;
/**
 * Utility function to create a basic OpenAPI document structure
 */
export declare function createEmptyOpenAPIDocument(title?: string, version?: string): OpenAPIDocument;
//# sourceMappingURL=openapi-helper.d.ts.map