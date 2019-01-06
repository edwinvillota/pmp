FROM node:10.15.0

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json /home/node/app/
RUN npm install

COPY . .
COPY --chown=node:node . .
USER node

EXPOSE 5000

CMD [ "npm", "start" ]

