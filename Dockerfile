FROM nginx:1.14.1-alpine

LABEL maintainer="estafette.io" \
      description="The estafette-ci-web is the component that renders the Esfafette CI web interface"

COPY . /usr/share/nginx/html/
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080