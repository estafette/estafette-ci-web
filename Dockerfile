FROM nginx:1.19.8-alpine

LABEL maintainer="estafette.io" \
      description="The estafette-ci-web is the component that renders the Esfafette CI web interface"

RUN apk update \
    && apk add \
      bash \
      libxml2=2.9.10-r3 \
      libjpeg-turbo=2.0.4-r1 \
      nghttp2=1.40.0-r1 \
    && rm -rf /var/cache/apk/*

COPY . /usr/share/nginx/html
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