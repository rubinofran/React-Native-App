import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

/* import productoService from "../services/products"; */

function Venta({ data, productos, setProductos, noCumpleValidaciones }) {

/*     const eliminarProducto = async () => {
		try {
			await productoService.eliminarProducto(data.Producto_ID);
			setProductos(productos.filter(x => x.Producto_ID !== data.Producto_ID));
			console.log('Se eliminó el producto de la lista')
		} catch (err) {
			console.log('ERROR, no se pudo eliminar el producto de la lista: ', err);
		}
	}; */

    return (
        <View style={styles.opc}>
            <Text style={styles.txt}>{data.Producto_nombre}: {data.Producto_precio_por_unidad}$</Text>
            <Text style={styles.txt}>Marca: {data.Producto_marca}</Text>
{/*             <Text style={data.Producto_cantidad > 0 ? styles.txtStock : styles.txtSinStock}>
                Unidades: {data.Producto_cantidad}
            </Text> */}
            <View style={styles.acciones}>
                <Button 
                    color='lightgreen'  
                    title='[+] Reponer'
                    onPress={() => {
                        console.log(`Intenta reponer el producto: ${data.Producto_nombre}`)
                        if(noCumpleValidaciones) { /* FALTAN VALIDACIONES */
                            console.log('Validación: este evento ya fue finalizado')
                            Alert.alert('Este evento ya fue finalizado') 
                        }
                    }}
                />
                <Button 
                    disabled={data.Producto_cantidad > 0 ? false : true}
                    color='salmon'  
                    title='[-] Vender'
                    onPress={() => {
                        console.log(`Intenta vender el producto: ${data.Producto_nombre}`)
                        if(noCumpleValidaciones) { /* FALTAN VALIDACIONES */
                            console.log('Validación: este evento ya fue finalizado')
                            Alert.alert('Este evento ya fue finalizado') 
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
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
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

export default Venta;