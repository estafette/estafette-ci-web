#!/bin/sh
set -e

# inspired by https://medium.com/@gchudnov/trapping-signals-in-docker-containers-7a57fdda7d86#.k9cjxrx6o

# SIGTERM-handler
sigterm_handler() {
  # kubernetes sends a sigterm, where openresty needs SIGQUIT for graceful shutdown
  echo "Received SIGTERM, allowing connections to drain for ${GRACEFUL_SHUTDOWN_DELAY_SECONDS}s..."
  sleep $GRACEFUL_SHUTDOWN_DELAY_SECONDS
  echo "Gracefully shutting down nginx..."
  nginx -s quit
  wait $nginx_pid
  echo "NGINX has gracefully terminated, exiting entrypoint script..."
  exit
}

# run openresty
echo "Starting nginx..."
nginx -g 'daemon off;' &
nginx_pid=${!}

# setup handlers
echo "Setting up signal handlers..."
trap 'sigterm_handler' 15 # SIGTERM

wait $nginx_pid
echo "NGINX has gracefully terminated, exiting entrypoint script..."