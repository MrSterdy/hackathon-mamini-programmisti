FROM node:18.16.1-alpine3.17 as build

ARG ADMIN_PASSWORD
ARG ADMIN_USERNAME
ARG REDIS_URL
ARG REDIS_PASSWORD
ARG JWT_REFRESH_TOKEN

ENV ADMIN_PASSWORD=$ADMIN_PASSWORD
ENV ADMIN_USERNAME=$ADMIN_USERNAME
ENV REDIS_URL=$REDIS_URL
ENV REDIS_PASSWORD=$REDIS_PASSWORD
ENV JWT_REFRESH_TOKEN=$JWT_REFRESH_TOKEN

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run check
RUN npm run build

FROM node:18.16.1-alpine3.17 as prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/build .

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "index.js"]
