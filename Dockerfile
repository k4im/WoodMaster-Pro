FROM node:lts-alpine
ENV NODE_ENV=production
ARG PORT_APP
WORKDIR /usr/src/app
COPY ["backend/package.json", "backend/package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g typescript --verbose  
RUN npm install --include dev --verbose 
COPY backend/. .
RUN npm run build
EXPOSE $PORT_APP
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

