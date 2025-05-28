# Use Node.js 20 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files AND prisma schema first
COPY package*.json ./
COPY prisma/ ./prisma/

# Now npm install will work because prisma schema is available
RUN npm install

# Copy the rest of the files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 8000

# Start the app
CMD ["npm", "start"]