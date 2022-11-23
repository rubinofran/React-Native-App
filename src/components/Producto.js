
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import productoService from "../services/products";

function Producto({ data, productos, setProductos, setForm }) {

    function noCumpleValidaciones(data) {
        return true
    }

    const eliminarProducto = async () => {
		try {
			await productoService.eliminarProducto(data.Producto_ID);
			setProductos(productos.filter(x => x.Producto_ID !== data.Producto_ID));
			console.log('Se eliminó el producto de la lista')
		} catch (err) {
			console.log('ERROR, no se pudo eliminar el producto de la lista: ', err);
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
                            data: data
                        })
					}}
                />
                <Button 
                    color='lightblue'  
                    title='Descripción'
                    onPress={() => {
                        console.log(`Consulta sobre la descripción del producto: ${data.Producto_nombre}`)
                        Alert.alert(data.Producto_descrip === ""? 'Sin descripción' : data.Producto_descrip)
                    }}
                />
                <Button 
                    color='salmon'  
                    title='Eliminar'
                    onPress={() => {
                        console.log(`Intenta eliminar el producto: ${data.Producto_nombre}`)
                        if(noCumpleValidaciones()) {
                            console.log('Validación: no cumple con los requisitos para eliminar el producto')
                            Alert.alert('VALIDAR') 
                        } else {
                            eliminarProducto()
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

export default Producto;