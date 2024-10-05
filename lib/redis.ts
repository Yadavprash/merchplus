import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('end', () => {
  console.log('Redis client disconnected, attempting to reconnect...');
});

// Function to connect to Redis with reconnection logic
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Could not connect to Redis:', error);
    // Optionally implement a retry strategy here
  }
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

// Call the connect function
connectRedis();
