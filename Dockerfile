# Production Dockerfile for Authority Studio AI
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests first for optimal Docker layer caching
COPY package.json package-lock.json* bun.lock* ./

# Install all dependencies with --legacy-peer-deps to eliminate peer warnings
RUN npm install --legacy-peer-deps

# Copy entire application codebase
COPY . .

# Build the client SPA (vite build -> dist/) and bundle the server (esbuild server.ts -> server.js)
RUN npm run build

# Production runner stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy runtime manifests and production node_modules
COPY package.json package-lock.json* bun.lock* ./
RUN npm install --omit=dev --legacy-peer-deps

# Copy compiled frontend and bundled server from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/salespages ./salespages

EXPOSE 3000

# Start production server
CMD ["node", "server.js"]
