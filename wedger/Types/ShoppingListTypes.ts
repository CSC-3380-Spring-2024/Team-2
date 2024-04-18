import {ColorValue} from 'react-native';

export interface ShoppingListType {
  id: string;
  name: string;
  color: ColorValue;
  itemsArray: ListItemObject[];
}
export interface EditShoppingListType {
  id: string;
  name?: string;
  color?: ColorValue;
}
export interface EditListItemObject {
  id: string;
  name?: string;
  checked?: string;
}
export interface ListItemObject {
  id: string;
  name: string;
  checkedOff: boolean;
}
export interface addListItemObject {
  name: string;
}
export interface createShoppingListType {
  name: string;
  color: ColorValue;
}
