import {getStorage, ref, uploadString} from 'firebase/storage';

export async function imageUpload({image}) {
  const storage = getStorage();
  const storageRef = ref(storage, 'some-child');

  const imageRef = image.data;
  uploadString(storageRef, imageRef, 'base64').then(snapshot => {
    console.log('Uploaded image from base64!');
  });
}
