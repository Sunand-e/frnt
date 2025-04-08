ARG API_HOST
ARG BUCKET_NAME
ARG SERVER_NAME

FROM nginx
RUN apt-get update -qq && apt-get -y install apache2-utils
# ENV NEXTJS_ROOT /
WORKDIR /app
RUN mkdir log
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY out /app/public

ENV API_HOST=$API_HOST BUCKET_NAME=$BUCKET_NAME SERVER_NAME=$SERVER_NAME
RUN envsubst '$API_HOST $BUCKET_NAME $SERVER_NAME' < /etc/nginx/nginx.conf > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
