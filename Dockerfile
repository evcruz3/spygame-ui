FROM node:16.4.1

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN npm install npm@7.18.1
# RUN rm -rf /usr/local/lib/node_modules/npm
# RUN mv node_modules/npm /usr/local/lib/node_modules/npm

COPY package*.json ./

USER node

COPY --chown=node:node . .

RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]