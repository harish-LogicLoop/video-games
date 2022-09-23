#!/usr/bin/env bash

echo Taking latest pull ....
git pull

echo Doing the angular build ....
sudo ng build --prod --base-href https://videogames.logicloop.io/ --deployUrl=/

