#!/bin/bash
for i in {1..144}
do
	git add .
	git commit -m 'Updated MEAN customizing users with partials project'
	git push
	sleep 300
done
