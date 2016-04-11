#!/bin/bash
for i in {1..144}
do
	git add .
	git commit -m 'Updated MEAN message board project'
	git push
	sleep 300
done
