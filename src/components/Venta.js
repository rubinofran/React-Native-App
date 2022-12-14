import React from "react";
import { useContext } from "react"; 
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import { EventoInfoContext } from "../context/EventoInfoContext";

import productoService from "../services/products";
import ventaService from "../services/sales";

function Venta({ data, productos, setProductos, noCumpleValidaciones }) { 

    const { eventoInfo } = useContext(EventoInfoContext)
    const cantMax = eventoInfo.prods.filter(x => x.Producto_ID == data.Producto_ID)[0].Producto_cantidad 

	const reponerProducto = async (values) => {
        try {
            /* Modificación en BD productos */
            await productoService.modificarProducto(values.Producto_ID, {
                Producto_nombre: values.Producto_nombre,
                Producto_descrip: values.Producto_descrip,
                Producto_marca: values.Producto_marca,
                Producto_precio_por_unidad: values.Producto_precio_por_unidad,
                Producto_cantidad: values.Producto_cantidad + 1
            });
            values.Producto_cantidad += 1
            setProductos([...productos.filter(x => x.Producto_ID !== values.Producto_ID), values]);
            /* Baja en BD ventas */
            await ventaService.eliminarVenta(eventoInfo.id, values.Producto_ID, values.Producto_precio_por_unidad)
            console.log(`Se repuso una unidad del producto "${values.Producto_nombre}" marca ${values.Producto_marca}`)
        } catch (err) {
            console.log('ERROR, no se pudo reponer la unidad del producto: ', err)
        }
	};

	const venderProducto = async (values) => {
        try {
            /* Modificación en BD productos */
            await productoService.modificarProducto(values.Producto_ID, {
                Producto_nombre: values.Producto_nombre,
                Producto_descrip: values.Producto_descrip,
                Producto_marca: values.Producto_marca,
                Producto_precio_por_unidad: values.Producto_precio_por_unidad,
                Producto_cantidad: values.Producto_cantidad - 1
            });
            values.Producto_cantidad -= 1
            setProductos([...productos.filter(x => x.Producto_ID !== values.Producto_ID), values])
            /* Alta en BD ventas */
            await ventaService.agregarVenta({
                Evento_ID: eventoInfo.id,
                Producto_ID: values.Producto_ID,
                Producto_precio: values.Producto_precio_por_unidad
            });
            console.log(`Se vendió una unidad del producto "${values.Producto_nombre}" marca ${values.Producto_marca}`)
        } catch (err) {
            console.log('ERROR, no se pudo vender la unidad del producto: ', err)
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
                    disabled={data.Producto_cantidad < cantMax ? false : true}
                    color='lightgreen'  
                    title='[+] Reponer'
                    onPress={() => {
                        console.log(`Intenta reponer el producto: ${data.Producto_nombre}`)
                        if(noCumpleValidaciones()) { 
                            console.log('Validación: este evento ya fue finalizado')
							Alert.alert('Error', 'Este evento ya fue finalizado')
                        } else { 
                            reponerProducto(data)
                        }
                    }}
                />
                <Button 
                    disabled={data.Producto_cantidad > 0 ? false : true}
                    color='salmon'  
                    title='[-] Vender'
                    onPress={() => {
                        console.log(`Intenta vender el producto: ${data.Producto_nombre}`)
                        if(noCumpleValidaciones()) { 
                            console.log('Validación: este evento ya fue finalizado')
							Alert.alert('Error', 'Este evento ya fue finalizado') 
                        } else {
                            venderProducto(data)
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