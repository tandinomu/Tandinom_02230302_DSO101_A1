# Use Node.js LTS (as required by assignment)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build Next.js application
RUN npm run build

# Run tests (as required by assignment)
RUN npm test

# Expose port 3000
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]