import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import productoService from "../services/products";

function Producto({ data, productos, setProductos, setForm, ventas }) {

    
    function noCumpleValidacionesParaEliminar(id) {
        let noCumple = false
        ventas.map(x => {
            if(x.Producto_ID === id) {
                /* console.log('El producto pertenece a al menos un registro de venta: ', x) */
                noCumple = true
            }
        })
        return noCumple
    }

    const eliminarProducto = async (id) => {
		try {
			await productoService.eliminarProducto(id);
			setProductos(productos.filter(x => x.Producto_ID !== id));
			console.log('Se eliminó el producto de la lista')
		} catch (err) {
			console.log('ERROR, no se pudo eliminar el producto de la lista: ', err)
		}
	};

    return (
        <View style={styles.opc}>
            <Text style={styles.txt}>{data.Producto_nombre}: {data.Producto_precio_por_unidad}$</Text>
            <Text style={styles.txt}>Marca: {data.Producto_marca}</Text>
            <Text style={data.Producto_cantidad > 0 ? styles.txtStock : styles.txtSinStock}>
                Unidades: {data.Producto_cantidad}
            </Text>
            <View style={styles.acciones}>
                <Button 
                    color='lightgreen'  
                    title='Modificar'
                    onPress={() => {
                        console.log(`Intenta modificar el producto: ${data.Producto_nombre}`)
						setForm({
                            visible: true,
                            nuevo: false,
                            registrado: noCumpleValidacionesParaEliminar(data.Producto_ID),
                            data: data
                        })
					}}
                />
                <Button 
                    color='lightblue'  
                    title='Descripción'
                    onPress={() => {
                        console.log(`Consulta sobre la descripción del producto: ${data.Producto_nombre}`)
                        Alert.alert(`${data.Producto_nombre} ${data.Producto_marca}`, data.Producto_descrip === "" ? 'Sin descripción' : data.Producto_descrip)
                    }}
                />
                <Button 
                    color='salmon'  
                    title='Eliminar'
                    onPress={() => {
                        console.log(`Intenta eliminar el producto: ${data.Producto_nombre}`)
                        if(noCumpleValidacionesParaEliminar(data.Producto_ID)) {
                            console.log('Validación: no cumple con los requisitos para eliminar el producto')
                            Alert.alert('Error', 'El producto pertenece a los registros de venta y no puede ser eliminado') 
                        } else {
                            eliminarProducto(data.Producto_ID)
                        }
                    }}
                />
            </View>
        </View>   
    )
}

const styles = StyleSheet.create({
    opc: {
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10
    },
    acciones: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txt: {
        fontSize: 20,
        padding: 5,
    },
    txtStock: {
        fontSize: 20,
        padding: 5,
        color: 'green'
    },
    txtSinStock: {
        fontSize: 20,
        padding: 5,
        color: 'red'
    }
})

export default Producto;