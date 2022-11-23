import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

function NavBar() {
    
    return (
        <View style={styles.nav}>
            <Link to='/'>
                <Text style={styles.txt}>PTP</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderWidth: 1, 
    },
    txt: {
        fontSize: 20,
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    }
})

export default NavBar;