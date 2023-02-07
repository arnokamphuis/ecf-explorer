FROM node:18.14
WORKDIR /app
COPY package*.json ./
RUN npm config set legacy-peer-deps true
RUN npm install -g npm@9.3.1
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
