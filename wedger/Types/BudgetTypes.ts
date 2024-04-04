import {GeoPoint} from 'firebase/firestore';
import {ColorValue} from 'react-native';

export interface BudgetType extends createBudgetType {
  uid: string;
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
  budgetUID: string;
  labelColor?: ColorValue;
  budgetName?: string;
  spendTarget?: number;
  spendCurrent?: number;
  timeFrame?: 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}

export interface ItemObject {
  uid: string;
  name: string;
  date?: Date;
  location?: GeoPoint; //need better type
  cost: number;
  quantity: number;
  unitCost: number;
  category: SpendCatagories;
  paymentType?: 'cash' | 'card' | CardWithDetails;
  addMethod: 'manual' | 'scanner';
  receptRefId: string;
  receptRefPhotoURL: URL;
  Reoccurring: false | 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}

export interface EditItemObject {
    uid: string;
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
  housing: number; // Monthly housing expenses (rent or mortgage)
  utilities: number; // Utilities (electricity, water, gas, etc.)
  transportation: number; // Transportation costs (public transit, gas, car maintenance)
  groceries: number; // Grocery and dining expenses
  dinning: number;
  householdSupplies: number; // Household supplies (cleaning products, toiletries)
  insurance: number; // Insurance premiums (health, auto, home)
  medicalHealthcare: number; // Medical and healthcare expenses
  debtPayments: number; // Debt payments (credit cards, loans)
  entertainment: number; // Entertainment and leisure activities
  savings: number; // Amount allocated for savings or investments
  grooming: number;
  fun: number;
  otherExpenses?: number; // Optional: Additional miscellaneous expenses
}

export interface CardWithDetails {
  cardNickname: string;
  last4: number;
}
