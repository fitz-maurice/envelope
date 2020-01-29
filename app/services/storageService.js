import * as firebase from 'nativescript-plugin-firebase';
const fs = require('tns-core-modules/file-system');

export default class StorageService {
  constructor() {
    this.auth = null;
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
          remoteFullPath: `${this.auth.uid}/${name}`,
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
