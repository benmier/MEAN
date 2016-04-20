#!/bin/bash
for i in {1..144}
do
	git commit -a -m 'Updated react demo project'
	git push
	sleep 300
done
