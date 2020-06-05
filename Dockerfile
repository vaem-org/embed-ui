FROM node:10
WORKDIR /app
ADD package.json /app
ADD yarn.lock /app
RUN yarn
ADD ./ /app
RUN yarn build

FROM nginx:stable-alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY docker/entrypoint.sh /entrypoint.sh

ENV WEBPACK_BASE_URL "."

CMD ["/entrypoint.sh"]
