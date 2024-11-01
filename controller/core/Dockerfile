# Use an official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /core

# Copy the directory
COPY . .
RUN npm install

# Ensure the logs directory is created inside the container
RUN mkdir -p /contr/logs

# Copy the src code and test code to the container
RUN touch .env
RUN echo "PORT=3000" >> .env
COPY src/ ./src
RUN npm run build



# Expose port 3000
EXPOSE 3000

# Start the server from the src directory
CMD ["node", "./dist/index.js"]
