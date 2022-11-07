#!/bin/bash 

echo "start container"

docker-compose up &

echo "wait 12 sec."
sleep 12

echo "started"
set $(docker ps -a | grep postgres )
container=$1
echo "container is: $container"

docker exec -i $container psql -d postgres <<-EOF
create table shorties ( id SERIAL PRIMARY KEY, uri VARCHAR(255) NOT NULL );
EOF
