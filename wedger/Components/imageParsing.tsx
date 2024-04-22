import TextRecognition from '@react-native-ml-kit/text-recognition';
import {db} from '../environment/firebase';
import {getDoc, doc} from 'firebase/firestore';
import {imageUpload} from './imageUpload.tsx';

export async function imageParsing(
  userUid: string,
  budgetUid: string,
  image: any,
) {
  try {
    const docRefPath = `users/${userUid}/budgets/${budgetUid}/imageData`;

    const imageURL = await imageUpload({image, userUid, budgetUid});

    if (!imageURL) {
      console.error('Failed to upload image');
      return;
    }

    const docSnap = await getDoc(doc(db, docRefPath));
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && data.imageURL) {
        console.log('Retrieved imageURL:', imageURL);

        const result = await TextRecognition.recognize(imageURL);

        console.log('Recognized text:', result.text);

        for (let block of result.blocks) {
          console.log('Block text:', block.text);
          console.log('Block frame:', block.frame);

          for (let line of block.lines) {
            console.log('Line text:', line.text);
            console.log('Line frame:', line.frame);
          }
        }
      } else {
        console.error('Invalid data structure or imageURL not found');
      }
    } else {
      console.error('Document does not exist');
    }
  } catch (error) {
    console.error('Error parsing image:', error);
  }
}
