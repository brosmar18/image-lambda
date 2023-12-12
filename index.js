const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const Bucket = 'lambda-image-lab'; 
  const uploadedImageKey = decodeURIComponent(event.Records[0].s3.object.key);

  // get json content
  async function getImagesJson() {
    try {
      const data = await s3.getObject({ Bucket, Key: 'images.json' }).promise();
      return JSON.parse(data.Body.toString());
    } catch (error) {
      return [];
    }
  }

  // put updated content
  async function putImagesJson(jsonContent) {
    await s3.putObject({
      Bucket,
      Key: 'images.json',
      Body: JSON.stringify(jsonContent),
      ContentType: 'application/json',
    }).promise();
  }

  
  try {
    let images = await getImagesJson();

    const imageMetaData = {
      name: uploadedImageKey,
      size: event.Records[0].s3.object.size.toString(),
      type: event.Records[0].s3.object.contentType,
    };

    const existingImageIndex = images.findIndex(image => image.name === uploadedImageKey);
    if (existingImageIndex !== -1) {
      images[existingImageIndex] = imageMetaData;
    } else {
      images.push(imageMetaData);
    }

    await putImagesJson(images);

    return { statusCode: 200, body: JSON.stringify({ message: 'Image processed' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Error processing image' }) };
  }
};
