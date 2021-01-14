import React from 'react'
import { View, Platform ,StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

export default function ReloadIcon({load}) {

    // ios for appleDevice / md (material design) for androidDevice
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'

    return (
        <View style={styles.ReloadIcon}>
           
            <Ionicons onPress={load} name={reloadIconName} size={30} color="black" />

        </View>
    )
}


const styles = StyleSheet.create({
    ReloadIcon: {
        position: 'absolute',
        top: 30,
        right: 20
    }
})