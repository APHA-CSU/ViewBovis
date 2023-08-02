# Release Process

To release a new version of the software, the `master` branch needs only to be merged into the `prod` branch. To perform this merge, a pull-request from the `master` branch into the `prod` branch needs to be made. Approval of pull-requests to `prod` is made by the CODEOWNER (Richard Ellis). The CODEOWNER is responsible for ensuring the code conforms to the reliability tests. A positive test result is required for approval.

To release a new version of the software:
1. A developer makes a pull-request from the `master` to the `prod` branch. The CODEOWNER is automatically notified by e-mail.
1. The CODEOWNER ensures the automated tests pass on the `master` branch and reviews the code changes.
1. The CODEOWNER approves the pull-request if they are satisfied, or requests changes.
1. The dev merges the `master` branch into `prod`
1. Following approval, the developer tags the current head of `master` as the next version (see image below). Versions are numbered incrementally with integers, for example `v1`, `v2`, etc. This can be performed by navigating to the github `master` branch and selecting `Create a release`
