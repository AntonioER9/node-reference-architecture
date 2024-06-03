# Use the official Node.js 18 base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY *.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Set the command to start the application
CMD [ "node","dist/main.js" ]
