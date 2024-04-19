import {Card, Text} from '@rneui/base';
import {makeStyles} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import RoundedButton from './StyledButton';
import {ItemObject} from '../Types/BudgetTypes';

interface Props {
  itemData: ItemObject;
  editMode: boolean;
  isVisible: boolean;
}

export default function ExpenseItemModal(props: Props) {
  const {itemData, editMode, isVisible} = props;
  const styles = useStyles();
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <View style={styles.container}></View>
    </Modal>
  );
}

const useStyles = makeStyles(theme => ({
  modal: {},
  container: {},
  card: {borderRadius: 20},
  header: {
    textAlign: 'center',
    width: '100%',
  },
  description: {padding: 10},
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
  },
}));
