# Use Node.js 20 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Clear npm cache and install
RUN npm cache clean --force
RUN npm install

# Copy rest of the files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose port
EXPOSE 8000

# Start the app
CMD ["npm", "start"]