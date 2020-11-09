# pull official base image
FROM node:13.12.0-alpine

ARG REACT_APP_ENV
ENV REACT_APP_ENV=${REACT_APP_ENV}

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . ./

# install app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install react-scripts -g
RUN npm install
RUN NODE_ENV=production REACT_APP_ENV=$REACT_APP_ENV npm run build

# open port
EXPOSE 8080

# start app
CMD ["npm", "start"]
