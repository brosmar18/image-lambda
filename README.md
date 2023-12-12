# Lab - Class 17

## Project: Image Lambda

### Problem Domain

In this lab, the task is to create a cloud-based image processing system using AWS S3 and Lambda services. The system allows users to upload images of any size to a publicly readable S3 bucket. Upon image upload, a Lambda function is triggered to process the image. This processing involves maintaining an `images.json` file in the same S3 bucket, which is an array of objects with each object representing an uploaded image. The `images.json` file contains metadata for each image, such as name, size, and type. If an image with the same name is uploaded, its metadata is updated in the array rather than adding a duplicate entry. This system demonstrates the integration of S3 for storage and Lambda for serverless computing.



### Collaborators
- **ChatGPT by OpenAI**: Used as a programming partner for brainstorming ideas, debugging code, formulating tests, and drafting documentation. ChatGPT's contributions were invaluable in enhancing the efficiency and quality of the development process.

### Setup

#### `.env` requirements (where applicable)

A .env file is included in local repository. A .env-sample file is uploaded to the remote repo so collaborators understand what environmental variables are being used. 

#### How to initialize/run your application (where applicable)

- e.g. `npm start`

#### How to use your library (where applicable)

### Process

The following steps outline the process undertaken to create and set up the AWS S3 and Lambda-based image processing system:

1. **Create Bucket**: A new S3 bucket named "lambda-image-lab" was created to store the uploaded images.

2. **Adjust Bucket Permissions**: The "Block all public access" settings on the S3 bucket were removed to allow public access to the files.

3. **Set Bucket Policy**: The bucket policy was set to allow public `GetObject` and `PutObject` actions. The policy used is as follows:
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "Statement1",
               "Effect": "Allow",
               "Principal": "*",
               "Action": [
                   "s3:GetObject",
                   "s3:PutObject"
               ],
               "Resource": "arn:aws:s3:::lambda-image-lab/*"
           }
       ]
   }
4. **Configure S3 Trigger**: An S3 trigger was added to the Lambda function "image-lambda-func" to activate upon image uploads to the bucket.
5. **Lambda Function Implementation**: The Lambda function image-lambda-func was written to process the image uploads. The core functionality includes reading the images.json file from the bucket, updating it with the new image's metadata, and then writing the updated content back to the S3 bucket. The function code is as follows: *see index.js*. 
6. **Testing and Results**: The functionality was tested by uploading images to the "lambda-image-lab" bucket. The results of the Lambda function executions can be seen in the following screenshot: [function result](./assets/funcResult01.png)