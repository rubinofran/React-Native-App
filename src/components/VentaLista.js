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

	function noCumpleValidaciones() {
		return eventoActivo.Evento_estado != "activo" 
	}

	useEffect(() => {
		async function fetchData() {
			console.log('Obteniendo información del evento activo')
			const responseEv = await eventoService.obtenerEvento(eventoInfo.id)
			setEventoActivo(responseEv.data)
			const responseProd = await productoService.obtenerProductos();
			setProductos(responseProd.data);
		}
		fetchData();
	}, [form]);

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
						if(noCumpleValidaciones()) { 
							console.log('Validación: este evento ya fue finalizado')
							Alert.alert('Error', 'Este evento ya fue finalizado') 
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
				{productos.map((x, auxKey) => 
					x.Producto_cantidad != 0 ?
					<Venta
						key={auxKey}
						data={x}
						productos={productos}
						setProductos={setProductos}
						noCumpleValidaciones={noCumpleValidaciones}
					/> : void(0)
				)}
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