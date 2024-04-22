import {getStorage, ref, uploadString, getDownloadURL} from 'firebase/storage';
import {db} from '../environment/firebase';
import {useBudget} from '../Context/userBudgetContext.tsx';

export async function imageUpload({image}) {
  try {
    const {getUsersBudgets} = useBudget();
    const userBudgets = await getUsersBudgets();

    const userUid = userBudgets.length > 0 ? userBudgets[0].userRef.uid : '';
    const budgetUid = userBudgets.length > 0 ? userBudgets[0].id : '';

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
