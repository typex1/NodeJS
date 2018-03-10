#!/bin/bash

# old: mongoimport -c ndcs -d ndcdb --drop --file 'ndc-list_2.csv' --type csv --headerline
# new: mongoimport --host localhost --db mydb -c mycollection --type json --jsonArray --file <file_path>

#mongoimport -d ndcdb -c ndcs --drop --type json --jsonArray --file ./ndc-list_3.json
mongoimport -d ndcdb -c ndcs --drop --type json --file ./ndc-list_3.json
