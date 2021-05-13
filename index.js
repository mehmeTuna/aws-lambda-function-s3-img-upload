"use strict";
const fs = require("fs");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const FileType = require("file-type");

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

//file path
const imgFileCheck = function (file) {
  const fileTypeList = JSON.parse(process.env.ALLOWED_FILE_EXTENSIONS);
  const fileDetail = async () => {
    return await FileType.fromFile(file);
  };
};

exports.handler = function (event, context) {
  let encodedImage = JSON.parse(event.body).avatar;
  let decodedImage = Buffer.from(encodedImage, "base64");
  imgFileCheck(decodedImage);
  return context.logStreamName;
};
