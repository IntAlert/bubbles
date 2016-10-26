Web application
====
The purpose of the app is to measure whether we can increase the number of Facebook friendships of people participating in International Alert workshops.

The public application allows visitors to the root of the application to sign in. Once they have signed in, the poller will regularly scrape their friendships with *users who also use this app*. 

The admin application allows the facilitator to visualise friendships between users of this application. It allows user tagging, user filtering and uses an implementation of D3.js Force Directed Graphs to visualise interconnectedness of application users.


Development
===
To get the application running on your local machine:

1. [Setup a gulp watch in the shared folder](../shared/README.md)
2. In this folder, ```npm install```
3. In this folder, ```bower install```
4. In this folder, ```sudo npm run dev```
5. You should be able to access the site at http://127.0.0.1

Deployment
===
To deploy this application to AWS:

1. Log in to your [AWS console](https://console.aws.amazon.com/console/home)
2. Set up RDS instance and note down database credentials
3. Configure networking/security groups for RDS instance
4. [Create an IAM user for deployment of this app](console.aws.amazon.com/iam/home?region=eu-west-1#users) and note down the credentials
4. Attach the "AWSElasticBeanstalkFullAccess" policy to this user
5. Using AWS CLI, create a local profile for this application: ```aws configure --profile bubbles```. Add your IAM credentials when prompted
6. In this folder, initialise the Beanstalk application: ```eb init --profile bubbles```
7. In this folder, create an environment. In this case, an environment called "staging": ```eb create staging```




4. Run ```npm install``` in this directory



