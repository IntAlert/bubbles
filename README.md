Bubbles
===
An application to visualise Facebook friendships of a users who sign up to the application.

The purpose of the app is to measure whether we can increase the number of Facebook friendships of people participating in International Alert workshops.

Components
===
- Public Web application: Allows sign up by beneficiaries
- Admin Web Application: Allows visualisation of users and friendships using tags
- Poller: An AWS Lambda function which polls Facebook friendships of users using this app

Development guides
===
- [Web application](./web/README.md)
- [Poller](./web/README.md)
- [Shared models](./shared/README.md)

Further development
===
- Ability to remove users
- Create default tagging for new users
- More intuitive filtering by "No Tag" in users
- Ability to determine users not in group
