FROM node:18.14
# ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm config set legacy-peer-deps true
RUN npm install -g npm@9.3.1
RUN npm install
# RUN npm install --omit=dev
# RUN npm run build
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
