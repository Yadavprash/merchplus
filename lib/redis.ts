import { createClient } from 'redis';

// Create a Redis client with the URL from environment variables
export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// Error handling for the Redis client
redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('end', () => {
  console.log('Redis client disconnected, attempting to reconnect...');
});

// Function to connect to Redis with reconnection logic
const connectRedis = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await redisClient.connect();
      console.log('Connected to Redis');
      return; // Exit the loop on success
    } catch (error) {
      console.error('Could not connect to Redis:', error);
      const delay = Math.pow(2, i) * 1000; // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  console.error('Exceeded maximum retries to connect to Redis.');
};


// Keep-alive mechanism to send a PING every 60 seconds
const keepAlive = setInterval(async () => {
  try {
    await redisClient.ping();
    console.log('PING sent to Redis');
  } catch (error) {
    console.error('Failed to send PING:', error);
  }
}, 60000); // 60 seconds

// Handle graceful shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down...');
  clearInterval(keepAlive);
  await redisClient.quit();
  console.log('Redis client disconnected');
};

// Connect to Redis
connectRedis();

// Catch SIGINT/SIGTERM signals for graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
