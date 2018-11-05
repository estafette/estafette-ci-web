FROM nginx:1.14.0-alpine

LABEL maintainer="estafette.io" \
      description="The estafette-ci-web is the component that renders the Esfafette CI web interface"

COPY dist /usr/share/nginx/html
COPY favicon.ico /usr/share/nginx/html/favicon.ico
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080