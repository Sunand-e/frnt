FROM nginx
RUN apt-get update -qq && apt-get -y install apache2-utils
# ENV NEXTJS_ROOT /
# WORKDIR $RAILS_ROOT
RUN mkdir log
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY out /var/www
# RUN envsubst '$NEXTJS_ROOT' < /tmp/docker.nginx > /etc/nginx/conf.d/default.conf
EXPOSE 8091
CMD [ "nginx", "-g", "daemon off;" ]
