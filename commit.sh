#!/bin/bash
for i in {1..144}
do
	git add .
	git commit -m 'Finished mean stack'
	git push
	sleep 300
done
