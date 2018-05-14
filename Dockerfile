FROM scratch

LABEL maintainer="estafette.io" \
      description="The estafette-ci-web is the component that renders the Esfafette CI web interface"

COPY ca-certificates.crt /etc/ssl/certs/
COPY estafette-ci-web /

ENTRYPOINT ["/estafette-ci-web"]