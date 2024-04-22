import {getStorage, ref, uploadString, getDownloadURL} from 'firebase/storage';
import {db} from '../environment/firebase';

export async function imageUpload({image, userUid, budgetUid}) {
  try {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `users/${userUid}/budgets/${budgetUid}/images/${image.fileName}`,
    );

    await uploadString(storageRef, image.data, 'base64');
    console.log('Uploaded image from base64!');

    const imageURL = await getDownloadURL(storageRef);
    console.log('Download URL:', imageURL);

    return imageURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}
