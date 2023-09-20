#!/usr/bin/env sh

set -e

yarn build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:lee-yu-jie/Three.js-Universe.git master:gh-pages

cd -