FROM nginx:1.14.0-alpine

LABEL maintainer="estafette.io" \
      description="The estafette-ci-web is the component that renders the Esfafette CI web interface"

COPY . /usr/share/nginx/html