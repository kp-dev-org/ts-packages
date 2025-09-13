import { HttpProtocols } from "./protocol-types";

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