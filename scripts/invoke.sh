#!/usr/bin/env bash

STAGE=dev

for arg in "$@"
do
  case $arg in
  -s|--stage)
    STAGE="$2"
    shift
    shift
    ;;
  esac
done

serverless invoke local -f steam-db-updater --stage "$STAGE"
