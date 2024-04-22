import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const GroupItem = (props) => {
    return (
        <>
        <View style = {styles.container}>
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemNameText}> {props.text} </Text>
            </View>
            </View>
        </View></>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    item: {
        backgroundColor: '#FFFFFF',
        borderColor: '#C0C0C0',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24, 
        backgroundColor: '#F69286',
        opacity: 0.4,
        borderRadius: 20,
        marginRight: 15,
    },
    itemNameText: {
        maxWidth: '80%',
        color: 'black',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 5,
    },
    
});

export default GroupItem;