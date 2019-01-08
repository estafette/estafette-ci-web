FROM nginx:1.14.2-alpine

LABEL maintainer="estafette.io" \
      description="The estafette-ci-web is the component that renders the Esfafette CI web interface"

COPY . /usr/share/nginx/html/
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY ./docker-entrypoint.sh /

RUN chmod 500 /docker-entrypoint.sh

EXPOSE 5000

# runtime environment variables
ENV GRACEFUL_SHUTDOWN_DELAY_SECONDS="5"

ENTRYPOINT ["/docker-entrypoint.sh"]

# ensure stopsignal is sigterm, since we intercept it in the entrypoint script
STOPSIGNAL SIGTERM