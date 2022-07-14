import { ServerApi } from "~cloudinary/server";

const configuration = {
  "privateCdn": false,
  "cloudName": "dfu7oo41u",
  "secure": true
}

export default function(context, inject) {
  const cloudinary = new ServerApi(configuration);

  context.$cloudinary = cloudinary;
  inject("cloudinary", cloudinary);
}