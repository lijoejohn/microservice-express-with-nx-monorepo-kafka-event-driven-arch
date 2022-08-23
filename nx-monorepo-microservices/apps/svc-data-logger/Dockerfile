FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/svc-data-logger .
COPY package.json yarn.lock ./
COPY ./apps/svc-data-logger/.env ./
RUN yarn install --production
RUN yarn global add nodemon
CMD ["sh", "-c", "node ./main.js"]