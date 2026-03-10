FROM oven/bun:1

WORKDIR /app

# Copy dependency files first
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy rest of project
COPY . .

# Railway expects an exposed port
EXPOSE 3000

# Start the backend
CMD ["bun", "run", "index.ts"]