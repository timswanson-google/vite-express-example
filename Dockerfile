FROM node:lts
WORKDIR /vite-express-example

RUN npm install -g tsx

COPY . .

RUN npm clean-install
RUN npm run build

ENV NODE_ENV="production"

CMD ["tsx", "src/server/main.ts"]
