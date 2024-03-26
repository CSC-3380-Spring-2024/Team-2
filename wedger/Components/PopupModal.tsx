import {Card, Text} from '@rneui/base';
import {makeStyles} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import RoundedButton from './StyledButton';

interface Props {
  firstButtonPress: () => void;
  secondButtonPress?: () => void;
  cancelButtonPress?: () => void;
  header?: string;
  description: string;
  firstButtonText: string;
  secondButtonText?: string;
  cancelButtonText?: string;
  isVisible: boolean;
  buttonsLoading?: boolean;
}

export default function PopupModal(props: Props) {
  const {
    firstButtonPress,
    secondButtonPress,
    cancelButtonPress,
    header,
    description,
    firstButtonText,
    secondButtonText,
    cancelButtonText,
    isVisible,
    buttonsLoading,
  } = props;
  const styles = useStyles();
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          {header ? (
            <Text h3 style={styles.header}>
              {header}
            </Text>
          ) : (
            <></>
          )}
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonContainer}>
            <RoundedButton
              loading={buttonsLoading}
              buttonStyle={styles.button}
              titleStyle={styles.button}
              loadingProps={{color: 'white'}}
              onPress={firstButtonPress}>
              {firstButtonText}
            </RoundedButton>
            {secondButtonPress ? (
              <RoundedButton
                buttonStyle={styles.button}
                titleStyle={styles.button}
                onPress={secondButtonPress}
                loading={buttonsLoading}>
                {secondButtonText}
              </RoundedButton>
            ) : null}
            {cancelButtonPress ? (
              <RoundedButton
                buttonStyle={styles.button}
                titleStyle={styles.button}
                onPress={cancelButtonPress}
                loading={buttonsLoading}>
                {cancelButtonText}
              </RoundedButton>
            ) : null}
          </View>
        </Card>
      </View>
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
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.colors.background,
    color: theme.colors.white,
  },
}));
