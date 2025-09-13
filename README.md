# @kp-dev-org/ts-packages

A TypeScript foundation package for building microservices and API gateways with service discovery and automatic route registration.

## Overview

This package provides the core abstractions, interfaces, and utilities needed to build a distributed microservices architecture with automatic service discovery and route management. It serves as the foundation for creating:

- **API Gateways** that automatically discover and route to backend services
- **HTTP Services** that register themselves and their routes on startup
- **Service Discovery** mechanisms using Redis-like databases
- **Route Discovery** from OpenAPI specifications

## Architecture

The package implements a microservices architecture where:

1. **HTTP Services** register themselves with a service discovery system on boot
2. **API Gateway** discovers registered services and fetches their OpenAPI specifications
3. **Route Discovery** extracts available routes from each service's OpenAPI spec
4. **API Gateway** dynamically routes incoming requests to appropriate services

## Core Components

### Base Classes

#### `BaseService<T>`
Abstract base class for all services providing:
- Service registration and deregistration
- Lifecycle management (start/shutdown hooks)
- Service metadata management

#### `HttpService<T>`
Abstract class extending `BaseService` for HTTP-based services:
- HTTP server setup and management
- Middleware configuration
- Route setup
- OpenAPI specification URL provision

#### `ApiGatewayService`
Abstract class extending `HttpService` for API Gateway implementations:
- Service discovery job management
- Route discovery from registered services
- Health check monitoring
- Dynamic routing capabilities

### Service Discovery

#### `ServiceDiscovery`
Abstract class defining the interface for service registration and discovery:
- Register/unregister services
- Query services by name or key
- List all registered services
- Redis-based storage support

#### `RouteDiscoveryService`
Abstract class for discovering and managing routes:
- Extract routes from OpenAPI specifications
- Store and retrieve route information
- Route matching and lookup
- Automatic route registration from services

### Type Definitions

#### Service Types
```typescript
interface ServiceMetadata {
  id: string;
  name: string;
  description?: string;
  version?: string;
  host: string;
  metadata?: Record<string, any>;
}

interface HttpServiceMetadata extends ServiceMetadata {
  httpPort: number;
  httpsPort?: number;
  apiSpecificationUrl: string;
  extraRoutes: Array<Route>;
}
```

#### Route Types
```typescript
type Route = {
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
```

## Utilities

### OpenAPI Helpers
- **`mergeOpenApiDocs()`**: Merge multiple OpenAPI documents into a unified specification
- **`OpenAPISchemaParser`**: Parse OpenAPI specs and extract route information

## Usage Examples

### Creating an HTTP Service

```typescript
import { HttpService, ServiceDiscovery } from '@kp-dev-org/ts-packages';

class MyHttpService extends HttpService<HttpServiceMetadata> {
  async setupHttpServer(): Promise<void> {
    // Setup your HTTP server (Express, Fastify, etc.)
  }

  async SetupHttpMiddlewares(): Promise<void> {
    // Configure middlewares
  }

  async setupHttpRoutes(): Promise<void> {
    // Define your routes
  }

  async getOpenapiSpecUrl(): Promise<void> {
    // Return your OpenAPI spec URL
  }

  async getHttpServer(): Promise<Server> {
    // Return your HTTP server instance
  }

  async start(): Promise<void> {
    await this.setupHttpServer();
    await this.SetupHttpMiddlewares();
    await this.setupHttpRoutes();
    await this.registerService(); // Register with service discovery
    // Start your server
  }
}
```

### Creating an API Gateway

```typescript
import { ApiGatewayService, ServiceDiscovery, RouteDiscoveryService } from '@kp-dev-org/ts-packages';

class MyApiGateway extends ApiGatewayService {
  async startServiceDiscoveryJob(): Promise<void> {
    // Periodically discover new services
  }

  async startRouteDiscoveryJob(interval: number): Promise<void> {
    // Periodically fetch routes from registered services
  }

  async startHealthCheckJob(interval: number): Promise<void> {
    // Monitor service health
  }

  // Implement other required methods...
}
```

### Implementing Service Discovery

```typescript
import { ServiceDiscovery } from '@kp-dev-org/ts-packages';
import Redis from 'ioredis';

class RedisServiceDiscovery extends ServiceDiscovery {
  private redis: Redis;

  async init(config: RedisConfig): Promise<void> {
    this.redis = new Redis(config);
  }

  async registerService<T extends ServiceMetadata>(serviceInfo: T): Promise<void> {
    const key = this.getServiceKey(serviceInfo);
    await this.redis.set(key, JSON.stringify(serviceInfo));
  }

  async getService<T extends ServiceMetadata>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  // Implement other required methods...
}
```

### Implementing Route Discovery

```typescript
import { RouteDiscoveryService } from '@kp-dev-org/ts-packages';

class MyRouteDiscovery extends RouteDiscoveryService {
  async saveRoute(route: Route): Promise<void> {
    // Store route in your preferred storage (Redis, Database, etc.)
  }

  async getAllRoutes(): Promise<Route[]> {
    // Retrieve all stored routes
  }

  async findRoute(method: HttpMethods, path: string): Promise<Route | null> {
    // Find route matching method and path
  }
}
```

## Installation

```bash
npm install @kp-dev-org/ts-packages
# or
pnpm add @kp-dev-org/ts-packages
# or
yarn add @kp-dev-org/ts-packages
```

## Dependencies

- `ioredis`: Redis client for service discovery storage
- `@types/node`: TypeScript definitions for Node.js

## Development

```bash
# Build the package
pnpm build

# Clean build artifacts
pnpm clean
```

## Getting Started

1. **Create your HTTP services** by extending `HttpService`
2. **Implement service discovery** by extending `ServiceDiscovery`
3. **Implement route discovery** by extending `RouteDiscoveryService`
4. **Create your API Gateway** by extending `ApiGatewayService`
5. **Configure Redis** or your preferred storage for service registry
6. **Start your services** - they will auto-register and be discoverable

The API Gateway will automatically:
- Discover registered services
- Fetch their OpenAPI specifications
- Extract and store available routes
- Route incoming requests to appropriate services

## Workflow Example

Here's how the complete system works:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HTTP Service  │    │   HTTP Service  │    │   HTTP Service  │
│   (User API)    │    │  (Order API)    │    │ (Payment API)   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │ Register Service     │ Register Service     │ Register Service
          │ + OpenAPI Spec       │ + OpenAPI Spec       │ + OpenAPI Spec
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Service Discovery                            │
│                     (Redis Store)                              │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ Discover Services
                          │ Fetch OpenAPI Specs
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API Gateway                                 │
│  • Discovers services automatically                            │
│  • Extracts routes from OpenAPI specs                          │
│  • Routes requests to appropriate services                     │
│  • Provides unified API endpoint                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ Handle Client Requests
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Clients                                   │
│            (Web Apps, Mobile Apps, etc.)                       │
└─────────────────────────────────────────────────────────────────┘
```

## License

ISC

## Contributing

This package serves as the foundation for all microservices development in the organization. Contributions should maintain backward compatibility and follow established patterns.


pnpm build && git add . && git commit -m "seom" && git tag -a v1.0.4 -m "new versions" && git push && git push --t
ags