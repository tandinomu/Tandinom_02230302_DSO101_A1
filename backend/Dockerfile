# Use Node.js LTS (as required by assignment)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Run tests (as required by assignment)
RUN npm test

# Expose port 8000
EXPOSE 8000

# Set environment variable
ENV PORT=8000

# Start the app
CMD ["npm", "start"]