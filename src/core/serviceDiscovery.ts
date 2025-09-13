import { RedisConfig } from '../types/connectivity';
import { ServiceMetadata } from '../types/servicesTypes';

export abstract class ServiceDiscovery {
    abstract registerService<T extends ServiceMetadata>(serviceInfo: T): Promise<void>;
    abstract getService<T extends ServiceMetadata>(key: string): Promise<T | null>;
    abstract getRegistredServices<T extends ServiceMetadata>(): Promise<T[]>;
    abstract unRegisterService(key: string): Promise<void>;
    abstract init(config: RedisConfig): Promise<void>;
    abstract getServicesByName<T extends ServiceMetadata>(name: string): Promise<T | null>;
    public getServiceKey(serviceInfo: ServiceMetadata): string {
        return `services:${serviceInfo.name}-${serviceInfo.id}`;
    }
}