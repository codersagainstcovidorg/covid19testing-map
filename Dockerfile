FROM node:13.10-stretch

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]