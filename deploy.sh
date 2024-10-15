#!/bin/bash

# Exit on error
set -e

# Print commands before executing
set -x

# Install production dependencies
echo "Installing dependencies..."
npm ci --only=production

# Build the Next.js application
echo "Building the application..."
npm run build

# Start the application
echo "Starting the application..."
npm start