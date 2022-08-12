#!/usr/bin/env bash

## Set up colors
red=$(tput setaf 1)
green=$(tput setaf 2)
orange=$(tput setaf 3)
reset=$(tput sgr0)

pause()
{
    sleep 2
}

checkdevelop()
{
    BRANCHNAME=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)

    if [[ ${BRANCHNAME} != "develop" ]]; then
        echo "${red}You must be on develop branch, with a clean status"
        exit 1
    fi

    CHANGESTOCOMMIT=$(git status | grep 'Changes to be com')
    UNSTAGEDCHANGES=$(git status | grep 'Changes not staged')

    ## If changes not commit
    if [[ -n "$CHANGESTOCOMMIT" ]]; then
        echo "${red}Changes need to be committed"
        exit 1
    fi
    if [[ -n "$UNSTAGEDCHANGES" ]]; then
        echo "${red}Changes made but not staged."
        exit 1
    fi
}

pushdevelop()
{
    echo ""
    echo "Pushing develop"
    echo ""
    git push origin develop
    echo ""
}

execdeveloptomaster()
{
    git checkout master
    git merge develop
    git push origin master
}


checkdevelop
pause
pushdevelop
pause
execdeveloptomaster

git checkout develop