import React from "react";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button, Modal, ScrollView, Text, Alert } from "react-native";

import { EventoInfoContext } from "../context/EventoInfoContext";

import productoService from "../services/products";
import eventoService from "../services/events";
import Venta from "../components/Venta";
import NavBar from "./NavBar";
import VentaForm from "./VentaForm";

const Formulario = ({ form, setForm, eventoActivo, setEventoActivo }) => {
	return (
		<Modal
        	transparent={false}
        	visible={form.visible}
		>
			<View>
				<VentaForm 
					form={form} 
					setForm={setForm}
					eventoActivo={eventoActivo}
					setEventoActivo={setEventoActivo}
				/>
			</View>
		</Modal>
	);
}

function VentaLista() {

	const [form, setForm] = useState({
		visible: Boolean,
		data: {}
	});

    const [productos, setProductos] = useState([]);
    const [eventoActivo, setEventoActivo] = useState({});
	const { eventoInfo, setEventoInfo } = useContext(EventoInfoContext)

	async function val() {
		const response = await eventoService.obtenerEvento(eventoInfo.id)
		setEventoActivo(response.data)
	}

	function noCumpleValidaciones() {
		console.log(eventoActivo.Evento_estado != "activo")
		return false
	}

	useEffect(() => {
		async function fetchData() {
			console.log('Obteniendo información del evento activo')
			let response = await eventoService.obtenerEvento(eventoInfo.id)
			setEventoActivo(response.data)
			/* PROVISORIO para pruebas, la lista debe ser de cada evento */
			console.log('Ingresando al listado de productos que se venden en el evento')
			response = await productoService.obtenerProductos();
			setProductos(response.data);
		}
		fetchData();
	}, []);

    return (
		<View>
			<NavBar />
			<View style={styles.subBar}>
				<Text style={styles.txt}>{eventoActivo.Evento_nombre}</Text>
				<Button
					color='salmon'  
					title='Finalizar' 
					onPress={() => {
						console.log('Intenta finalizar el evento')
						val()
						if(noCumpleValidaciones()) { /* FALTAN VALIDACIONES */
							console.log('Validación: este evento ya fue finalizado')
							Alert.alert('Este evento ya fue finalizado') 
						} else {
							setForm({
								visible: true,
								data: {
									Evento_clave_BM: '', 
									Evento_monto: 0
								}
							})
						}
					}}
				/>
				<Formulario
					form={form}
					setForm={setForm}
					eventoActivo={eventoActivo}
					setEventoActivo={setEventoActivo}
				/>
			</View>
			<ScrollView style={styles.scrollView}>
				{productos.map((x, auxKey) => (
					<Venta
						key={auxKey}
						data={x}
						productos={productos}
						setProductos={setProductos}
						noCumpleValidaciones={noCumpleValidaciones}
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

export default VentaLista;