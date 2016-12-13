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
- [Poller](./poller/README.md)
- [Shared models](./shared/README.md)

Facebook Access Token
===
This can be acquired here:
https://developers.facebook.com/tools/explorer/

Further development
===
- Show user details in Graph (MEDIUM)
- Ability to remove users (EASY)
- Create default tagging for new users (EASY)
- More intuitive filtering by "No Tag" in users (EASY)
- Ability to determine users not in group (MEDIUM)
- Ability make this work for mulptiple groups (MEDIUM)
- Ability to determine group membership vs application membership (MEDIUM)
- Detect when a user has prevented friend_list permission
- Admin Auth failure 404s
