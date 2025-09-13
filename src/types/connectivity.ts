export interface RedisConfig {
    redisHost: string;
    redisPort: number;
    redisPassword?: string;
    redisDb: number | 0;
}