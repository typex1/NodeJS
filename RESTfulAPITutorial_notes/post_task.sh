#!/bin/bash

# response was: {"__v":0,"_id":"507f191e810c19729de860ea","status":["pending"],"Created_date":"2017-03-03T19:12:32.520Z"}

# in case of a duplicate POST request:
# {"code":11000,"index":0,"errmsg":"E11000 duplicate key error index: Tododb.tasks.$_id_  dup key: { : ObjectId('507f191e810c19729de860ea') }","op":{"__v":0,"_id":"507f191e810c19729de860ea","status":["pending"],"Created_date":"2017-03-03T19:12:32.520Z"}}

curl -H "Content-Type: application/json" \
	-X POST -d '{"__v":0,"_name":"Read node in 10 mins","_id":"507f191e810c19729de860ea","status":["pending"],"Created_date":"2017-03-03T19:12:32.520Z"}' \
	http://localhost:3000/tasks

