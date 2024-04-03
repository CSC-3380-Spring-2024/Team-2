import {View} from 'react-native';
import WedgerLogo from '../Assets/Static/Wedger_App_logo.svg';
import React from 'react';
import Svg, {Image} from 'react-native-svg';
import {makeStyles, Text} from '@rneui/themed';

export interface HeaderProps {
  logo?: boolean;
  title?: string;
  explanation?: string;
  moreSpace?: boolean;
  marginTop?: boolean;
}

export function Header({logo, title, explanation, moreSpace, marginTop}: HeaderProps) {
  const styles = useStyles();
  return (
    <View style={[styles.container, moreSpace && styles.containerPadding, marginTop && styles.marginTop]}>
      {logo && <WedgerLogo />}
      {title && (
        <Text h2 style={[styles.title, moreSpace && styles.titlePadding]}>
          {title}
        </Text>
      )}
      {explanation && <Text style={styles.explanation}>{explanation}</Text>}
    </View>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  containerPadding: {
    paddingBottom: 10,
  },
  title: {
    paddingHorizontal: 72,
    textAlign: 'center',
  },
  titlePadding: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  explanation: {
    paddingHorizontal: 48,
  },
  marginTop: {
    marginTop: 200,
  },
}));

export default Header;
