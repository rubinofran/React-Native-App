import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { StyleSheet, View, TextInput, Button, Alert, Text } from "react-native";

import productoService from "../services/products";
import NavBar from "./NavBar";

function ProductoForm({ form, setForm, productos, setProductos }) {

    const [productoAux] = useState(form.data)
    const buttonTitle = form.nuevo ? 'agregar' : 'modificar'

    function camposIncorrectos(values) {

        const precio = Number(values.Producto_precio_por_unidad)
        const cant = Number(values.Producto_cantidad)
        
        return  values.Producto_nombre === ""|
                values.Producto_marca === "" | 
                values.Producto_precio_por_unidad === "" |
                values.Producto_cantidad === "" |
                !(typeof precio === 'number' && isFinite(precio)) |
                !(typeof cant === 'number' && isFinite(cant)) |
                values.Producto_precio_por_unidad <= 0 | 
                values.Producto_cantidad < 0   
    }

    function noCumpleValidaciones(values) {
        return (form.registrado & values.Producto_nombre != productoAux.Producto_nombre) |
               (form.registrado & values.Producto_marca  != productoAux.Producto_marca)
    }

	const agregarProducto = async (values) => {
		try {
			await productoService.agregarProducto({
				Producto_nombre: values.Producto_nombre,
                Producto_descrip: values.Producto_descrip,
                Producto_marca: values.Producto_marca,
                Producto_precio_por_unidad: values.Producto_precio_por_unidad,
                Producto_cantidad: values.Producto_cantidad 
			});
			setProductos([...productos, values]);
            console.log('Se agregó el nuevo producto a la lista')
		} catch (err) {
			console.log('ERROR, no se pudo agregar el nuevo producto a la lista: ', err)
		}
	};

	const modificarProducto = async (values) => {
        try {
            await productoService.modificarProducto(values.Producto_ID, {
                Producto_nombre: values.Producto_nombre,
                Producto_descrip: values.Producto_descrip,
                Producto_marca: values.Producto_marca,
                Producto_precio_por_unidad: values.Producto_precio_por_unidad,
                Producto_cantidad: values.Producto_cantidad 
            });
            setProductos([...productos.filter(x => x.Producto_ID !== values.Producto_ID), values]);
            console.log('Se modificó el producto de la lista')
        } catch (err) {
            console.log('ERROR, no se pudo modificar el producto de la lista: ', err)
        }
	};

    return (
        <Formik
            initialValues={productoAux}
            onSubmit={values => {
                console.log(`Intenta ${buttonTitle}:`, values);
                if(camposIncorrectos(values)) {
                    console.log('Primera validación: alguno de los campos no fue completado correctamente')
                    Alert.alert('Error *','Alguno de los campos no fue completado correctamente')
                } else if(noCumpleValidaciones(values)) {
                    console.log(`Segunda validación: no cumple con los requisitos para ${buttonTitle} el producto`)
                    Alert.alert('Error', 'El producto pertenece a los registros de venta y no se pueden modificar su nombre o marca')
                } else {
                    form.nuevo ? agregarProducto(values) : modificarProducto(values) 
                    setForm({
                        visible: false,
                        nuevo: true,
                        registrado: false,
                    });
                }
            }}
        >
            {({ handleChange, handleSubmit, values }) => {
                return (
                    <View>
                        <NavBar />
                        <View style={styles.subBar}>
                            <Text style={styles.txt}>CAMPOS OBLIGATORIOS *</Text>
                        </View>
                        <View style={styles.form}>
                            <TextInput 
                                style={styles.input}
                                placeholder='Nombre o tipo *'
                                value={values.Producto_nombre}
                                onChangeText={handleChange('Producto_nombre')}
                                maxLength={30}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder='Descripción'
                                value={values.Producto_descrip}
                                onChangeText={handleChange('Producto_descrip')}
                                maxLength={50}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder='Marca *'
                                value={values.Producto_marca}
                                onChangeText={handleChange('Producto_marca')} 
                                maxLength={20}                       
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder='Precio por unidad (> 0) *'
                                value={values.Producto_precio_por_unidad.toString()}
                                onChangeText={handleChange('Producto_precio_por_unidad')}                        
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder='Cantidad de unidades (>= 0) *'
                                value={values.Producto_cantidad.toString()}
                                onChangeText={handleChange('Producto_cantidad')}                        
                            />
                            <View style={styles.acciones}>
                                <Button 
                                    color='lightgreen'
                                    title={buttonTitle}
                                    onPress={handleSubmit}
                                />
                                <Button 
                                    color='salmon'  
                                    title='cancelar' 
                                    onPress={() => {
                                        console.log('Se cancela la operación')
                                        setForm({
                                            visible: false,
                                            nuevo: true,
                                            registrado: false,
                                        })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                )
            }}
        </Formik>
    );
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: 'lightblue',
        minHeight: 700
    },
    input: {
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 10,
        fontSize: 20
    },
    acciones: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    subBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: 'lightblue',
    },
	txt: {
        fontSize: 20
    }
})

export default ProductoForm;