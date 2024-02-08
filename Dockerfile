FROM node:18.14
# ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.4.0
RUN npm install
# RUN npm install --omit=dev
# RUN npm run build
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
