FROM node:22-slim
RUN mkdir /app
WORKDIR /frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]