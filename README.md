###Contributors Guide

0. This project follows a strict Git Flow workflow.  Learn more [here](http://nvie.com/posts/a-successful-git-branching-model/).

1. Clone local repo of Panoptico/NetSense to contribute
2. Create a new features branch to make your changes
3. Before pushing to the "dev" branch*:
    ```
    git checkout dev
    git merge --no-ff featuresBranch
    ```

4. Push to dev branch:
    ```
    git push origin
    ```

5. Dev branch is used as a staging area for new features. Master branch will always be the official working release, as it is auto-deployed to NetSense.azurewebsites.net.


###Style Guide

Before pull requesting a new feature:
  * Remove all extraneous comments
  * Refactor to 'clean' code
  * Complete a peer code review

Keep all commits in present tense (e.g. 'implements', 'creates', 'adds').

Do not use a period at the end of commit messages.

Extensive style guide found [here](https://github.com/hackreactor/curriculum/wiki/Style-Guide).
