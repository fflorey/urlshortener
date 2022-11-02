#!/bin/bash

docker run --name shorturl -e POSTGRES_PASSWORD=geheim -p:5432:5432 -d postgres
