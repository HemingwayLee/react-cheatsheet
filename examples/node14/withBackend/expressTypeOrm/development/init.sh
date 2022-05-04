#!/bin/bash

until PGPASSWORD=${DB_PASS} psql -h ${DB_HOST} -p ${DB_PORT} -U postgres -c "\q"; do
  >&2 echo "Postgres is not available, sleep..."
  sleep 1
done

echo "psql is up !!"

pwd
ls

concurrently "cd /home/app/frontend && npm run start" "cd /home/app/backend && npm run start"

