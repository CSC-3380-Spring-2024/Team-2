import {StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import React from 'react'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

interface Slice {
    value: number;
    percentage: number;
    color: string;
  }


type Props = {
    item: Slice;
    index: number;

};

const List: any = ['Spent', 'Total']

const RenderItem = ({item, index}: Props) => {
    const {width} = useWindowDimensions();
    return (
        <Animated.View style={[styles.container, {width: width * .9}]}
        entering={FadeInDown.delay(index * 200)}
        exiting={FadeOutDown}
        >
            <View style={styles.contentContainer}>
                <View style={[styles.color, {backgroundColor: item.color, marginTop: 8}]}/>
                <Text style={styles.text}>{List[index]}:</Text>
                <Text style={styles.text}>{item.percentage}%</Text>
                <Text style={styles.text}>${item.value}</Text>
            </View>
        </Animated.View>
    )
}
export default RenderItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f7fc', //#EBF8FE or #f4f7fc
        paddingVertical: 6,
        marginBottom: 6,
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    color: {
     width: 60,
     height: 60,
     borderRadius: 10,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
})