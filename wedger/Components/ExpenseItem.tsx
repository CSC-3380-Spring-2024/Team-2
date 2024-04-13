import {View, Text} from 'react-native';
import React from 'react';
import {ItemObject} from '../Types/BudgetTypes';
import {Card} from '@rneui/themed';
import TextInputField from './TextInputField';
import Dropdown from './Dropdown/Dropdown';
import {ValueType} from 'react-native-dropdown-picker';

interface Props {
  editMode: boolean;
  itemData: ItemObject;
}
const ExpenseItem = (props: Props) => {
  const {itemData, editMode} = props;
  return (
    <Card>
      {editMode ? (
        <>
          <View>
            <Text>{itemData.name}</Text>
            <Text>${itemData.cost}</Text>
          </View>
          <View>
            <Text>{itemData.category.category}</Text>
            <Text>{itemData.quantity}</Text>
            <Text>{itemData.unitCost}</Text>
          </View>
        </>
      ) : (
        <>
          <View>
            <TextInputField label="name" />
            <TextInputField label="cost" inputMode="numeric" />
          </View>
          <View>
            <Dropdown
              options={[]}
              onChangeValue={function (value: ValueType): void {
                throw new Error(`Function not implemented.${value}`);
              }}
            />
            <TextInputField label="quantity" inputMode="numeric" />
            <Text>cost / quantity</Text>
          </View>
        </>
      )}
    </Card>
  );
};

export default ExpenseItem;
