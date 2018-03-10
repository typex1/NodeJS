#!/usr/bin/python
#
#"ndc","type","detail","Created_date"
#"15020","mobileNDC","-","2018-03-08T12:14:34.847Z"

import csv
import json

csvfile = open('ndc-list_3.csv', 'r')
jsonfile = open('ndc-list_3.json', 'w')

fieldnames = ("ndc","type","detail","Created_date")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
  json.dump(row, jsonfile)
  jsonfile.write('\n')
