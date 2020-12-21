#!/usr/bin/env bash

# Text modifiers
BOLD=$'\033[1m'
NC=$'\033[0m'
LIGHT_BLUE=$'\033[1;34m'

printf "%s%sInstalling project dependencies.%s\n" "$LIGHT_BLUE" "$BOLD" "$NC"
docker-compose run --rm --user "$(id -u)":"$(id -g)" -w /var/www/app sdbu_node npm install
docker-compose run --rm --user "$(id -u)":"$(id -g)" -w /var/www/infrastructure sdbu_node npm install

docker-compose up -d
