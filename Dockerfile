FROM openresty/openresty:1.13.6.2-alpine

LABEL maintainer="estafette.io" \
      description="The estafette-ci-web is the component that renders the Esfafette CI web interface"

COPY . /usr/local/openresty/nginx/html/
COPY nginx.vh.default.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY ./docker-entrypoint.sh /

EXPOSE 5000

# runtime environment variables
ENV GRACEFUL_SHUTDOWN_DELAY_SECONDS="5"

ENTRYPOINT ["/docker-entrypoint.sh"]

# Reset change of stopsignal in openresty container at https://github.com/openresty/docker-openresty/blob/master/alpine/Dockerfile#L124
STOPSIGNAL SIGTERM