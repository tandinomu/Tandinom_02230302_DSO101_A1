# # backend/Dockerfile
# FROM --platform=linux/amd64 node:18-alpine

# WORKDIR /app

# # Copy everything first (so prisma schema is available for postinstall)
# COPY . .

# # Install dependencies
# RUN npm install

# # Explicitly run prisma generate again (optional since it's in postinstall)
# RUN npx prisma generate

# EXPOSE 8000

# # Start the app
# CMD ["npm", "run", "dev"]
# backend/Dockerfile
FROM --platform=linux/amd64 node:18-alpine

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Build your TypeScript code (assuming you're using TypeScript)
RUN npm run build

# Expose port 8000 to Render
EXPOSE 8000

# Use environment variable PORT in app (required!)
ENV PORT=8000

# Start production server
CMD ["node", "dist/index.js"]
