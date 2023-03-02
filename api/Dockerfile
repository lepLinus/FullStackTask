FROM node:lts-alpine
ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
&& tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm install -g nodemon
RUN mkdir -p /usr/src/app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh

EXPOSE 8080

CMD ["node", "index.js"]
