#!/bin/bash
for i in {1..144}
do
	git add .
	git commit -m 'Updated mean black belt exam 2'
	git push
	sleep 300
done
