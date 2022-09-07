# ---- Dependencies ----
FROM node:12-alpine AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install

# ---- Build ----
FROM dependencies AS build
WORKDIR /app
COPY . /app
EXPOSE 3000
CMD [ "npm", "run", "start" ]