# Use the official Bun image as base
FROM oven/bun:1 as base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Create a production stage
FROM base as production

# Expose port (if needed for any web interface)
EXPOSE 3000

# Run the application
CMD ["bun", "run", "index.ts"]
