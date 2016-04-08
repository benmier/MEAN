#!/bin/bash
for i in {1..2}
do
	git add .
	git commit -m 'Update'
	git push
done
