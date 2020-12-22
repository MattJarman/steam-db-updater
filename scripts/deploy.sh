#!/usr/bin/env bash

# Formatting
NC=$'\033[0m'
RED=$'\033[0;31m'
ORANGE=$'\033[1;33m'

DEFAULT_REGION="eu-west-1"

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/../"

ENVIRONMENT=""
ACCOUNT_NUMBER=""
PROFILE="default"
REGION=""

error() {
  printf >&2 "%s%s%s\n" "$RED" "$@" "$NC"
  exit 1
}

warn() {
  printf >&2 "%s%s%s\n" "$ORANGE" "$@" "$NC"
}

for arg in "$@"; do
  case $arg in
  "-e" | "--environment")
    ENVIRONMENT="$2"
    shift
    shift
    ;;
  "-an" | "--account-number")
    ACCOUNT_NUMBER="$2"
    shift
    shift
    ;;
  "-p" | "--profile")
    PROFILE="$2"
    shift
    shift
    ;;
  "-r" | "--region")
    REGION="$2"
    shift
    shift
    ;;
  esac
done

if [ -z "$ENVIRONMENT" ]
then
  error "No environment set."
fi

if [ -z "$ACCOUNT_NUMBER" ]
then
  error "No account number set."
fi

if [ -z "$REGION" ]
then
  warn "No region set. Defaulting to $DEFAULT_REGION."
  REGION=$DEFAULT_REGION
fi

export CDK_DEPLOY_ACCOUNT=$ACCOUNT_NUMBER
export CDK_DEPLOY_REGION=$REGION
export NODE_ENV=$ENVIRONMENT

(cd "$ROOT_DIR/infrastructure" && npm run deploy --profile="$PROFILE")