import Base from './base';
import * as firebase from 'nativescript-plugin-firebase';
const fs = require('tns-core-modules/file-system');

export default class StorageService extends Base {
  constructor() {
    super();
    this.storageRef = null;
  }

  async uploadImage(image, name) {
    const appPath = fs.knownFolders.currentApp().path;
    const path = `${appPath}/${name}`;
    const metadata = {
      contentType: 'image/jpeg',
    };

    if (image.saveToFile(path, 'jpeg')) {
      await firebase.storage
        .uploadFile({
          remoteFullPath: `${this.uid}/${name}`,
          localFile: fs.File.fromPath(path),
          localFullPath: path,
          metadata,
        })
        .then(
          uploadedFile => {
            console.log('File uploaded: ' + JSON.stringify(uploadedFile));
          },
          error => {
            console.log('File upload error: ' + error);
          },
        );
    }
  }
}
