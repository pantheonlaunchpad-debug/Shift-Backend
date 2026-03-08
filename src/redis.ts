import Redis from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redis = Redis.createClient({ url: process.env.REDIS_URL });

redis.on("error", (err) => console.error("Redis Client Error", err));

await redis.connect();

// Test Redis
await redis.set("test-key", "hello");
console.log(await redis.get("test-key")); // should print "hello"