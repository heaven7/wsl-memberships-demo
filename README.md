### Demo heaven7:wsl-memberships
Demo of the heaven7:wsl-memberships package

## Usage
Clone this with
```
git clone https://github.com/heaven7/wsl-memberships-demo.git
```
after starting the meteor app you have to restart to init the npm-container.

set up 2 useraccounts and create a project with one user.
logout in the browser console with
```
Meteor.logout()
```
and login with the other user. there should be the project with a join-button.

after clicking on that an email is sent to the projectowner. you will see on your console something like
```
acceptUrl: http://localhost:3000/Projects/AEBmBPeYCnanpBXib/accept/ysfJMQbDD2B1wpQObAm7dPZwuEJtuL70rLiyJg-65vX
```