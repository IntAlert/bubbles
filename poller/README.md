Poller
===
This coponent regularally polls the Facebook API to record the Friendship friendships between users of this application

This app uses the [node-lambda package](https://www.npmjs.com/package/node-lambda). 

Development
===
1. Create a file in this folder called ```.env``` with the following contents
	```
	AWS_ENVIRONMENT=development
	AWS_ACCESS_KEY_ID=***
	AWS_SECRET_ACCESS_KEY=***
	AWS_ROLE=***
	AWS_REGION=eu-west-1
	AWS_FUNCTION_NAME=bubbles-poller
	AWS_HANDLER=index.handler
	AWS_MODE=event
	AWS_MEMORY_SIZE=128
	AWS_TIMEOUT=300
	AWS_DESCRIPTION=
	AWS_RUNTIME=nodejs4.3
	FB_CLIENT_ID=***
	FB_CLIENT_SECRET=***
	FB_ACCESS_TOKEN=***
	RDS_USERNAME="root"
	RDS_PASSWORD=
	RDS_DB_NAME=bubbles2
	RDS_HOSTNAME="127.0.0.1"
	```

2. run ```node-lambda run```

Deployment
===
1. Update your deployment IAM user with the following inline policy:
	```
		{
	    "Version": "2012-10-17",
	    "Statement": [
	        {
	            "Sid": "Stmt1477574969000",
	            "Effect": "Allow",
	            "Action": [
	                "lambda:CreateFunction"
	            ],
	            "Resource": [
	                "*"
	            ]
	        }
	    ]
	}```

2. Create an AWS IAM role with "AWSLambdaBasicExecutionRole" policy. Record the Role ARN
3. Update ```.env``` with this ARN
4. Create a file called ```deploy.env``` with the following content
	```
	FB_CLIENT_ID=***
	FB_CLIENT_SECRET=***
	FB_ACCESS_TOKEN=***
	RDS_USERNAME=***
	RDS_PASSWORD=***
	RDS_DB_NAME=***
	RDS_HOSTNAME=***
	```

3. ```npm run deploy```
4. Login to [AWS Console for Lambda](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions?display=list)
5. Select this lambda function
6. Click "Test"
7. If no errors, setup triggering as required

NB. If you are experimenting with an existing Facebook App, make sure the database you are working with is pre-loaded with all users for your given FB_CLIENT_ID. If not, friendship saving will fail due to MYSQL integrity constraints. (TODO: automatically pre-load users?)

