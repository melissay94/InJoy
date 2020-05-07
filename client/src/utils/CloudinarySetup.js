import { Cloudinary as CoreCloud, Util} from 'cloudinary-core';
import axios from 'axios';

export const url = (publicId, options) => {
  try {
    const scOptions = Util.withSnakeCaseKeys(options);
    const cl = CoreCloud.new();
    return cl.url(publicId, scOptions);
  } catch(e) {
    console.error(e);
    return null;
  }
}

export const openUploadWidget = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options);
  window.cloudinary.openUploadWidget(scOptions, callback);
}

export const fetchPhotos = cloudName => {
  const options = {
    cloudName: cloudName,
    format: 'json',
    type: 'list',
    version: Math.ceil(new Date().getTime() / 20), // Get 20 at a time
  };

  // Feed here is a tag that we can add to images when we upload them to help make sure we're getting those photos from the account.
  // There's a chance in the future we allow for profile pictures, so those wouldn't have the feed tag.
  const urlPath = url('feed', options);

  return axios.get(urlPath)
    .then(response => {
      if (response.data) {
        return response.data;
      } else {
        return 'Error: No data found';
      }
    }).catch(err => {
      return 'Error: Unable to fetch data';
    })
}