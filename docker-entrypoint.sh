#!/bin/sh
set -e

# inspired by https://medium.com/@gchudnov/trapping-signals-in-docker-containers-7a57fdda7d86#.k9cjxrx6o

# SIGTERM-handler
sigterm_handler() {
  # kubernetes sends a sigterm, where openresty needs SIGQUIT for graceful shutdown
  echo "Gracefully shutting down openresty in ${GRACEFUL_SHUTDOWN_DELAY_SECONDS}s..."
  sleep $GRACEFUL_SHUTDOWN_DELAY_SECONDS
  /usr/local/openresty/bin/openresty -s quit
  echo "Finished shutting down openresty!"
}

# setup handlers
echo "Setting up signal handlers..."
trap 'kill ${!}; sigterm_handler' 15 # SIGTERM

# run openresty
echo "Starting openresty..."
/usr/local/openresty/bin/openresty &

# wait forever until sigterm_handler stops all background processes
while true
do
  tail -f /dev/null & wait ${!}
done
