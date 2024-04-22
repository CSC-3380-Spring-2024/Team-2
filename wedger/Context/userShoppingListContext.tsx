import React, {ReactNode, createContext, useContext, useState} from 'react';
import {
  ShoppingListType,
  EditShoppingListType,
  ListItemObject,
  createShoppingListType,
  addListItemObject,
  EditListItemObject,
} from '../Types/ShoppingListTypes';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {useAuth} from './userAuthContext';
import {db} from '../environment/firebase';

interface ShoppingListContextType {
  //ShoppingList handle
  createShoppingList: (
    obj: createShoppingListType,
  ) => Promise<DocumentReference<DocumentData, DocumentData> | undefined>;
  editShoppingList: (
    obj: EditShoppingListType,
  ) => Promise<DocumentSnapshot<DocumentData, DocumentData> | undefined>;
  deleteShoppingList: (ShoppingListToDelete: string) => void;
  getUsersShoppingLists: () => Promise<ShoppingListType[] | undefined>;
  //item handle
  addListItems: (
    itemsToAdd: addListItemObject[],
    ShoppingListUID: string,
  ) => void;
  editListItem: (item: EditListItemObject, ShoppingListUID: string) => void;
  deleteListItems: (itemID: string[], ShoppingListUID: string) => void;
  //util
  loadingShoppingList: boolean;
  userShoppingListError: string;
  usersShoppingLists: ShoppingListType[] | undefined;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined,
);

export const ShoppingListProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [loadingShoppingList, setLoadingShoppingList] =
    useState<boolean>(false);
  const [usersShoppingLists, setUsersShoppingLists] = useState<
    ShoppingListType[] | undefined
  >();
  const [userShoppingListError, setUserShoppingListError] =
    useState<string>('');
  const {userRef} = useAuth();

  // useEffect(() => {
  //   getCurrentShoppingLists();
  // }, [userRef]);

  const getCurrentShoppingLists = async () => {
    if (!userRef) {
      return;
    }
    const listArr = await getUsersShoppingLists();
    setUsersShoppingLists(listArr);
  };

  const createShoppingList = async (obj: createShoppingListType) => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const newShoppingList = {
        ShoppingListName: obj.name,
        labelColor: obj.color,
      };
      const ShoppingListCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
      );
      const ShoppingList = await addDoc(
        ShoppingListCollectionRef,
        newShoppingList,
      );
      getCurrentShoppingLists();
      return ShoppingList;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const editShoppingList = async (obj: EditShoppingListType) => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const editDocData = {
        ShoppingListName: obj.name,
        labelColor: obj.name,
      };
      const ShoppingListDocRef = doc(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        obj.id,
      );
      await updateDoc(ShoppingListDocRef, editDocData);
      const updatedShoppingList = await getDoc(ShoppingListDocRef);
      getCurrentShoppingLists();
      return updatedShoppingList;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const deleteShoppingList = async (
    ShoppingListToDelete: string, //shopping list ID
  ): Promise<void> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const ShoppingListDocRef = doc(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListToDelete,
      );
      await deleteDoc(ShoppingListDocRef);
      getCurrentShoppingLists();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const getUsersShoppingLists = async (): Promise<
    ShoppingListType[] | undefined
  > => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      let ShoppingListsReturnArray: ShoppingListType[] = [];
      const ShoppingListCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
      );
      const docsSnap = await getDocs(ShoppingListCollectionRef);
      if (docsSnap.empty) {
        return undefined;
      }
      docsSnap.forEach(async el => {
        let curDoc = el.data() as unknown as ShoppingListType;
        const tempArr = await getListItems(el.id);
        if (tempArr) {
          curDoc.itemsArray.concat(tempArr);
        }
        ShoppingListsReturnArray.push(curDoc);
      });
      return ShoppingListsReturnArray;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };

  //item handle

  const getListItems = async (
    ShoppingListUID: string,
  ): Promise<ListItemObject[] | undefined> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      let ItemReturnArray: ListItemObject[] = [];
      const ShoppingListItemCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListUID,
        'ListItems',
      );
      const docsSnap = await getDocs(ShoppingListItemCollectionRef);
      if (docsSnap.empty) {
        return undefined;
      }
      docsSnap.forEach(item => {
        const currItem = item as unknown as ListItemObject;
        ItemReturnArray.push(currItem);
      });

      // attach to userShoppingLists
      try {
        if (usersShoppingLists) {
          let tempShoppingLists = usersShoppingLists;
          const ShoppingListSelectIndex = tempShoppingLists.findIndex(
            ShoppingList => ShoppingList.id === ShoppingListUID,
          );
          tempShoppingLists[ShoppingListSelectIndex].itemsArray.concat(
            ItemReturnArray,
          );
          setUsersShoppingLists(tempShoppingLists);
        }
      } catch (e) {
        console.log(e);
      }

      //return
      return ItemReturnArray;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };

  const addListItems = async (
    itemsToAdd: addListItemObject[],
    ShoppingListUID: string,
  ): Promise<void> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const ShoppingListItemCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListUID,
        'ListItems',
      );
      const addArrayBuilder = itemsToAdd.map(item => {
        const tempObj = {
          name: item.name,
          checked: false,
        };
        return tempObj;
      });

      addArrayBuilder.forEach(
        async el => await addDoc(ShoppingListItemCollectionRef, el),
      );

      getCurrentShoppingLists();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const editListItem = async (
    item: EditListItemObject,
    ShoppingListUID: string,
  ): Promise<void> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const editItemBuilder = {
        name: item.name,
        checked: item.checked,
      };
      const ItemDocRef = doc(
        db,
        'users',
        userRef.uid,
        'ShoppingLists',
        ShoppingListUID,
        'ListItems',
        item.id,
      );
      await updateDoc(ItemDocRef, editItemBuilder);
      getListItems(ShoppingListUID);
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };
  const deleteListItems = async (
    itemIDs: string[],
    ShoppingListUID: string,
  ): Promise<void> => {
    setLoadingShoppingList(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }

      itemIDs.forEach(async itemID => {
        const ItemsDocRef = doc(
          db,
          'users',
          userRef.uid,
          'ShoppingLists',
          ShoppingListUID,
          'ListItems',
          itemID,
        );
        await deleteDoc(ItemsDocRef);
      });
      getListItems(ShoppingListUID);
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingShoppingList(false);
    }
  };

  //util

  function addError(arg0: string) {
    setUserShoppingListError(arg0);
  }
  return (
    <ShoppingListContext.Provider
      value={{
        //ShoppingList handle
        createShoppingList,
        editShoppingList,
        deleteShoppingList,
        getUsersShoppingLists,
        usersShoppingLists,
        //item handle
        addListItems,
        editListItem,
        deleteListItems,
        //util
        loadingShoppingList,
        userShoppingListError,
      }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = (): ShoppingListContextType => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      'useShoppingList must be used within an ShoppingListProvider',
    );
  }
  return context;
};
