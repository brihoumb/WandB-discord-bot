FROM node:alpine

WORKDIR /bot

RUN apk add --upgrade py3-pip build-base python3-dev linux-headers

COPY . .

RUN npm install

RUN pip3 install wandb

CMD ["npm", "start"]
