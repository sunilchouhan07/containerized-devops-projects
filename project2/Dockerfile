FROM node:20-alpine AS builder 

WORKDIR /app 

COPY package*.json ./

RUN npm ci --omit=dev

COPY app.js .



# stage2

FROM node:20-alpine 

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app /app  

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

EXPOSE 5000 

CMD [ "node", "app.js" ]