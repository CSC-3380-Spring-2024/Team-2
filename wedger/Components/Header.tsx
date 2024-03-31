import {Text, View} from 'react-native';
import React from 'react';

interface Props {
  logo?: boolean;
  moreSpace?: boolean;
}

export function Header(props: Props) {
  const {logo, moreSpace} = props;
  return (
    <View>
      {moreSpace ? <Text>MORE SPACE</Text> : null}
      {logo ? <Text>WEDGER</Text> : null}
      <Text>Header</Text>
    </View>
  );
}

export default Header;
