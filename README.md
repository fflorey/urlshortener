### Simple server to shorten a url  

First simple version is a simple webpage with a simple HTML-form.
It has a simple API interface, one to convert from and on to convert to an URL.

In the background, we use a redis server

The used framework is express

you need postgres to work with this version
install as image from dockerhub:

https://hub.docker.com/_/postgres

docker pull postgres

*************************

starten dann mit dem script: startpsql.sh

!!!!!!WICHTIG:
Beim ersten mal Starten des Containers muss die korrekte Tabelle einmalig angelegt werden:
siehe dazu hints.txt 

redis docker wird nicht benötigt

*********************



