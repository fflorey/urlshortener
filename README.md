### Simple server to shorten a url  

First simple version is a simple webpage with a simple HTML-form.
It has a simple API interface, one to convert from and on to convert to an URL.

In the background, we use a redis server or a postgres database

There are now three docker containers, one for redis, one for postgres 
and one for node.js / express.

The used framework is express

It is organized by docker-compose and the three referenced Dockerfiles

to start all of it: startpsql.sh

this script starts the docker containers, and creates the needed table in postgres

To use the redis solution, copy routes/index redis.js to routes/index.js
To use the postgres solution, copy routes/index postgeres.js to routes/index.js



*************************





