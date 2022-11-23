import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Link } from "react-router-native"; 
import NavBar from "./NavBar";

const MenuOpc = ({ children, to }) => {
    return (
        <Link to={to} style={styles.opc}>
            <Text style={styles.txt}>{children}</Text>
        </Link>
    );
}

function MenuComponent() {
    
    useEffect(() => {
		console.log('Ingresando al menú principal')
	}, []);

    return (
        <View >
            <NavBar />
            <MenuOpc to='/productos'>Productos</MenuOpc>
            <MenuOpc to='/eventos'>Eventos</MenuOpc>
        </View>
    )
}

const styles = StyleSheet.create({
    opc: {
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderWidth: 1,
        padding: 30,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    txt: {
        fontSize: 30
    }
})

export default MenuComponent;