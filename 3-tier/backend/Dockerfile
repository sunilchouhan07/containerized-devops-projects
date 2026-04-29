FROM node:24-slim 

WORKDIR /app 

COPY package.json .

RUN npm install cors

COPY . .

EXPOSE 3000 

CMD [ "node", "app.js" ]

