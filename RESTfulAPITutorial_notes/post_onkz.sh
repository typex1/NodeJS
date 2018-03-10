#!/bin/bash

if [ $# -ne 1 ]
then
    echo usage: $0 vorwahl
    exit 1 
fi

curl -H "Content-Type: application/json" \
-X POST http://localhost:3000/tasks \
-d @- << EOF

{
    "name": "${1}"
}
EOF
