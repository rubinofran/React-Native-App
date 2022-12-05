import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Button, Modal, ScrollView, Text } from "react-native";

import productoService from "../services/products";
import Producto from "../components/Producto";
import NavBar from "./NavBar";
import ProductoForm from "./ProductoForm";

const Formulario = ({ form, setForm, productos, setProductos }) => {
	return (
		<Modal
        	transparent={false}
        	visible={form.visible}
		>
			<View>
				<ProductoForm 
					form={form} 
					setForm={setForm}
					productos={productos}
					setProductos={setProductos}
				/>
			</View>
		</Modal>
	);
}

function ProductoLista() {

	const [form, setForm] = useState({
		visible: Boolean,
		nuevo: Boolean,
		data: {}
	});

    const [productos, setProductos] = useState([]);

    useEffect(() => {
		async function fetchData() {
			console.log('Ingresando al listado de productos')
			const response = await productoService.obtenerProductos();
			setProductos(response.data);
		}
		fetchData();
	}, []);

    return (
		<View>
            <NavBar />
			<View style={styles.subBar}>
				<Text style={styles.txt}>PRODUCTOS</Text>
				<Button
					color='lightgreen'  
					title='[+] Nuevo' 
					onPress={() => {
						console.log('Intenta agregar un nuevo producto')
						setForm({
							visible: true,
							nuevo: true,
							data: {
								Producto_nombre: '',
								Producto_descrip: '',
								Producto_marca: '',
								Producto_precio_por_unidad: 0,
								Producto_cantidad: 0
							}
						})
					}}
				/>
				<Formulario
					form={form}
					setForm={setForm}
					productos={productos}
					setProductos={setProductos}
				/>
			</View>
			<ScrollView style={styles.scrollView}>
				{productos.map((x, auxKey) => (
					<Producto
						key={auxKey}
						data={x}
						productos={productos}
						setProductos={setProductos}
						setForm={setForm}
					/>
				))}
			</ScrollView>
		</View>
    )
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: 'lightblue',
		marginHorizontal: 10,
		marginBottom: 100
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

export default ProductoLista;