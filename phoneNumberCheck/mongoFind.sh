#!/bin/bash

mongo << EOF
use ndcdb
#db.ndcs.find({}).limit(3)
#db.ndcs.find({type: "onkz"}).limit(3)
#db.ndcs.find({ndc: /155/}).limit(3)
db.ndcs.find({ndc: /^888/})
exit
EOF
