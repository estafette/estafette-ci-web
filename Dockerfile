FROM openresty/openresty:1.15.8.2-6-buster

LABEL maintainer="estafette.io" \
      description="The estafette-ci-web is the component that renders the Esfafette CI web interface"

COPY . /usr/local/openresty/nginx/html/
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /
COPY package-lock.json /

RUN chmod 500 /docker-entrypoint.sh

EXPOSE 5000

# runtime environment variables
ENV GRACEFUL_SHUTDOWN_DELAY_SECONDS="15"

ENTRYPOINT ["/docker-entrypoint.sh"]

# Reset change of stopsignal in openresty container at https://github.com/openresty/docker-openresty/blob/master/alpine/Dockerfile#L124
STOPSIGNAL SIGTERM