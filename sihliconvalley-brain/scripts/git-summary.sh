#!/bin/bash
# scripts/git-summary.sh
# Scans project folders for recent git activity

PROJECTS_DIR="$HOME/Projects"
# List of projects to monitor
TARGETS=("sihlhack" "reaswiss" "bioco-web-project" "version-gmbh" "sihliconvalley" "badenleg" "therapylist")

echo "["
FIRST=1

for proj in "${TARGETS[@]}"; do
  DIR="$PROJECTS_DIR/$proj"
  if [ -d "$DIR" ]; then
    if [ "$FIRST" -eq 0 ]; then echo ","; fi
    
    cd "$DIR" || continue
    
    # Get last 5 commits as JSON-ish
    LOGS=$(git log -n 5 --pretty=format:'{"hash": "%h", "author": "%an", "date": "%ad", "message": "%s"}' --date=short | sed '$!s/$/,/')
    
    # Get branch name
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    echo "{ \"project\": \"$proj\", \"branch\": \"$BRANCH\", \"commits\": [ $LOGS ] }"
    
    FIRST=0
  fi
done

echo "]"
