import { HttpProtocols } from "./protocolTypes";

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
export type Route = {
  path: string;
  method: HttpMethods;
  protocol: HttpProtocols;
  serviceName: string;
  serviceType?: string;
  targetPath?: string;
  requireAuth?: boolean;
  rateLimit?: {
    windowMs: number;
    maxRequests: number;
  };
}