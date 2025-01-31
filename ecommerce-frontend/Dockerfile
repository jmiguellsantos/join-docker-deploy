FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Use an official Node.js runtime as a parent image for production
FROM node:20-alpine AS runner

# Set the working directory in the container
WORKDIR /app

# Copy the application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules


# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]