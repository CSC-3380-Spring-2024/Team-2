import {GeoPoint} from 'firebase/firestore';
import {ColorValue} from 'react-native';

export interface BudgetType extends createBudgetType {
  id: string;
  spendCurrent: number;
  itemsExpended: ItemObject[];
}

export interface createBudgetType {
  labelColor: ColorValue;
  budgetName: string;
  spendTarget: number;
  timeFrame: 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}

export interface EditBudgetType {
  docId: string;
  labelColor: ColorValue;
  budgetName: string;
  spendTarget: number;
  spendCurrent: number;
  timeFrame: 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}

export interface ItemObject {
  id: string;
  name: string;
  date?: Date;
  location?: GeoPoint; //need better type
  cost: number;
  quantity: number;
  unitCost: number;
  category: SpendCatagories;
  paymentType?: 'cash' | 'card' | CardWithDetails;
  addMethod: 'manual' | 'scanner';
  receptRefId?: string;
  receptRefPhotoURL?: URL;
  Reoccurring: false | 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}
export interface addItemObject {
  name: string;
  date?: Date;
  location?: GeoPoint; //need better type
  cost: number;
  quantity?: number;
  unitCost?: number;
  category: SpendCatagories;
  paymentType?: 'cash' | 'card' | CardWithDetails;
  addMethod: 'manual' | 'scanner';
  receptRefId?: string;
  receptRefPhotoURL?: URL;
  Reoccurring?: false | 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}

export interface EditItemObject {
  id: string;
  name?: string;
  date?: Date;
  location?: GeoPoint; //need better type
  cost?: number;
  quantity?: number;
  unitCost?: number;
  category?: SpendCatagories;
  paymentType?: 'cash' | 'card' | CardWithDetails;
  addMethod?: 'manual' | 'scanner';
  Reoccurring?: false | 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}

export interface SpendCatagories {
  categoryName: string;
  color: ColorValue;
}
export interface CardWithDetails {
  cardNickname: string;
  cardType: 'visa' | 'masterCard' | 'amex' | 'discover' | undefined;
  last4: number;
}
