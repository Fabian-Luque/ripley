FROM node:erbium

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_ENV production

ADD dist /home/node/app/dist
ADD package.json /home/node/app/package.json

ENV MONGODB_URI mongodb://localhost:27017/ripley
ENV JWT_SECRET JWTSECRET
ENV SALT_SECRET 8

RUN chown -R node:node /home/node/app 

USER node
WORKDIR /home/node/app
RUN npm install --save

EXPOSE 3000

CMD npm run watch