import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BudgetType, ItemObject} from '../Types/BudgetTypes';
import {Button, Card, ListItem} from '@rneui/themed';
import PopupModal from './PopupModal';
import {BudgetProvider, useBudget} from '../Context/userBudgetContext';

interface Props {
  itemData: ItemObject;
  budgetID: string;
}
const ExpenseItem = (props: Props) => {
  const {itemData, budgetID} = props;
  const {deleteExpendedItems, loadingBudget, userBudgetError} = useBudget();
  const [moreInfo, setMoreInfo] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [modal, setModal] = useState<Element | null>(null);

  useEffect(() => {
    setModal(getModal());
  }, [moreInfo, editInfo, deleteItem]);

  const getModal = () => {
    if (moreInfo) {
      return <></>;
    } else if (editInfo) {
      return <></>;
    } else if (deleteItem) {
      return (
        <PopupModal
          description="Are you sure you want to delete this item? Once this item is deleted there is no way to recover it."
          firstButtonPress={() => {
            deleteExpendedItems([itemData.id], budgetID);
          }}
          firstButtonText="Delete"
          cancelButtonPress={() => setDeleteItem(false)}
          cancelButtonText="Cancel"
          isVisible={deleteItem}
          buttonsLoading={loadingBudget}
          errorMessage={userBudgetError}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <ListItem.Swipeable
        rightContent={reset => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              height: '100%',
              alignItems: 'center',
            }}>
            <Button
              title=""
              onPress={() => {
                reset();
                setMoreInfo(true);
              }}
              icon={{name: 'info', color: 'white'}}
              buttonStyle={{
                backgroundColor: 'grey',
                minHeight: '80%',
              }}
            />
            <Button
              title=""
              onPress={() => {
                reset();
                setEditInfo(true);
              }}
              icon={{name: 'edit', type: 'font-awesome', color: 'white'}}
              buttonStyle={{minHeight: '80%'}}
            />
            <Button
              title=""
              onPress={() => {
                reset();
                setDeleteItem(true);
              }}
              icon={{name: 'delete', color: 'white'}}
              buttonStyle={{
                backgroundColor: 'red',
                minHeight: '80%',
              }}
            />
          </View>
        )}
        style={{
          borderBottomColor: '#D9D9D9',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            height: '150%',
            padding: 0,
            margin: 0,
            backgroundColor: '#ff0000',
            width: 5,
            alignSelf: 'center',
          }}>
          <Text> </Text>
        </View>
        <ListItem.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ListItem.Title>{itemData.name}</ListItem.Title>
          <ListItem.Subtitle>$ {itemData.cost}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
      {modal}
    </>
  );
};

export default ExpenseItem;
