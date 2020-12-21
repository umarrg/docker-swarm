FROM node:stretch-slim
LABEL author="Umar abubakar"
WORKDIR /app
COPY package.json .
RUN ["npm", "install", ">>>", "/dev/null", "2>&1"]
COPY ./src ./src
EXPOSE 4000
CMD ["npm", "start"]


