###Contributors Guide

0. This project follows a strict Git Flow workflow.  Learn more [here](http://nvie.com/posts/a-successful-git-branching-model/).

1. Fork Panoptico/NetSense to contribute
2. Add upstream remote
    ```
    git remote add upstream https://github.com/Panoptico/NetSense.git
    ```

3. Before pushing to personal fork*:
    ```
    git pull --rebase upstream dev
    ```

4. Push to personal fork:
    ```
    git push origin master
    ```

5. Submit new features as pull requests to Panoptico/NetSense dev branch.  Dev branch is used as a staging area for new features. Master branch will always be the official working release, as it is auto-deployed to NetSense.azurewebsites.net.


\* Rebase from upstream dev is also required after every new feature announcement


###Resolving Pull Requests

1. One team member (other than the contributor) will be selected to do a code review
2. Upon approval run these commands from the official clone:
    ```
    git checkout -b test-branch dev

    git pull git@github.com:<YOUR_REPO_URL> master

    git checkout dev

    git rebase test-branch
    
    git push origin master
    ```


###Style Guide

Before pull requesting a new feature:
  * Remove all extraneous comments
  * Refactor to 'clean' code
  * Complete a peer code review

Keep all commits in present tense (e.g. 'implements', 'creates', 'adds').

Do not use a period at the end of commit messages.

Extensive style guide found [here](https://github.com/hackreactor/curriculum/wiki/Style-Guide).