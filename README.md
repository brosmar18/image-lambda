# image-lambda
1. Create bucket
2. Remove "Block all public access". 
3. Add appropriate permissions in bucket: 
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

4. 
