#! /bin/sh
# STAND IN GIT ROOT
# run build first to see that it builds without errors

git checkout master
git branch -D gh-pages
git checkout -b gh-pages
yarn build

# Move everything except bundle.js* into root folder
# This way github loads index.html without 
# needing the 'public' subdomain but we don't 
# have to change 'src="public/bundle.js' in index file 
mv public/* .
mv bundle.js public/
mv bundle.js.map public/

git add .
git add -f public
git commit -m"Build"
git push -f origin gh-pages
git checkout master

