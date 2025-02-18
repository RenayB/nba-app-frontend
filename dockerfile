# Step 1: Build the React app
#FROM node:18-alpine AS build
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app (production build)
RUN npm run build

# Step 2: Serve the build using Nginx
FROM nginx:alpine

# Copy the build files from the previous stage to the Nginx container
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
