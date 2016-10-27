Web application
====
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
Setting up AWS for the first time:

1. Log in to your [AWS console](https://console.aws.amazon.com/console/home)
2. Set up RDS instance and note down database credentials
<!-- 3. Configure networking/security groups for RDS instance -->
4. [Create an IAM user for deployment of this app](console.aws.amazon.com/iam/home?region=eu-west-1#users) and note down the credentials
4. Attach the "AWSElasticBeanstalkFullAccess" policy to this user
5. Using AWS CLI, create a local profile for this application: ```aws configure --profile bubbles```. Add your IAM credentials when prompted
6. In this folder, initialise the Beanstalk application: ```eb init --profile bubbles```
7. In this folder, create an environment. In this case, an environment called "staging": ```eb create staging```
8. Once this is complete, navigate to the Configuration panel for the Beanstalk app within the AWS Console. Under scaling, change the application type to "Single Instance"
9. Record the Elastic IP address of the application
10. Create a networking/security group for the RDS instance to allow access to the database from the application using this IP address. Optionally, allow access from your own IP
11. Set environment variables. In this folder, 
	```eb setenv RDS_USERNAME="***" RDS_PASSWORD=*** RDS_DB_NAME=*** RDS_HOSTNAME=*** FB_CLIENT_ID=*** FB_CLIENT_SECRET=*** FB_CALLBACK_URL_FRONTEND="http://bubbles.intalert.org/frontend/auth/facebook/callback" FB_CALLBACK_URL_ADMIN="http://bubbles.intalert.org/admin/auth/facebook/callback" COOKIE_KEY_1=*** COOKIE_KEY_2=*** COOKIE_KEY_3=***```
12. Finally, ```eb deploy``` ( you will need to do this at least twice to get models and migrations sync'd TODO: move all model definitions into migrations)



