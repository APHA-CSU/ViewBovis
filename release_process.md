# Release Process

To release a new version of the software, the `main` branch needs only to be merged into the `prod` branch. To perform this merge, a pull-request from the `main` branch into the `prod` branch needs to be made. Approval of pull-requests to `prod` is made by the CODEOWNER (Richard Ellis). The CODEOWNER is responsible for ensuring the code conforms to the reliability tests. A positive test result is required for approval.

To release a new version of the software:
1. A developer makes a pull-request from the `main` to the `prod` branch. The CODEOWNER is automatically notified by e-mail.
1. The CODEOWNER ensures the automated tests pass on the `main` branch and reviews the code changes.
1. The CODEOWNER approves the pull-request if they are satisfied, or requests changes.
1. The dev merges the `main` branch into `prod`
1. Following approval, the developer tags the current head of `main` as the next version (see image below). Versions are numbered incrementally with integers, for example `v1`, `v2`, etc. This can be performed by navigating to the github `main` branch and selecting `Create a release`

![release_1](https://github.com/aphascience/ViewBovis/assets/10742324/963eb3dc-05a2-40ed-83c7-30afdc27ff18)
![release_2](https://github.com/aphascience/ViewBovis/assets/10742324/38d4bb08-9e16-459a-9fa2-24e33c672ceb)
