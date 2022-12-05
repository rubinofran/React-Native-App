import React from "react";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button, Modal, ScrollView, Text } from "react-native";
import { Link } from "react-router-native"; 

import { EventoInfoContext } from "../context/EventoInfoContext";

import eventoService from "../services/events";
import Evento from "../components/Evento"; 
import NavBar from "./NavBar";
import EventoForm from "./EventoForm";

const Formulario = ({ form, setForm, eventos, setEventos }) => {
	return (
		<Modal
        	transparent={false}
        	visible={form.visible}
		>
			<View>
				<EventoForm 
					form={form} 
					setForm={setForm}
					eventos={eventos}
					setEventos={setEventos}
				/>
			</View>
		</Modal>
	);
}

function EventoLista() {
	
    const [form, setForm] = useState({
		visible: Boolean,
		nuevo: Boolean,
		data: {}
	});

	const { eventoInfo, setEventoInfo } = useContext(EventoInfoContext)
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
		console.log('Ingresando al listado de eventos')
		async function fetchData() {
			const response = await eventoService.obtenerEventos();
			setEventos(response.data); 
			(response.data.some(x => {
				if(x.Evento_estado === 'activo') {
					setEventoInfo({ id: x.Evento_ID, estado: true })
					console.log(`Evento "${x.Evento_nombre}":`)
					return true;
				}
				setEventoInfo({ id: "", estado: false })
				return false;
			})) 
				? console.log('Activo')
				: console.log('No se encuentró ningún evento activo')
		}
		fetchData();
	}, []);

    return (
        <View>
            <NavBar />
            <View style={styles.subBar}>
				<Text style={styles.txt}>EVENTOS</Text>
				<Button
					color='lightgreen'  
					title='[+] Nuevo' 
					onPress={() => {
						console.log('Intenta agregar un nuevo evento')
						setForm({
							visible: true,
							nuevo: true,
							data: {
 								Evento_nombre: '',
								Evento_descrip: '',
								Evento_clave_BM: '',
								Evento_fecha: ''
							}
						})
					}}
				/>
				<Formulario
					form={form}
					setForm={setForm}
					eventos={eventos}
					setEventos={setEventos}
				/>
			</View>
			<View style={styles.subBar}>
				<Text style={eventoInfo.estado ? styles.txtActivo : styles.txtInactivoFinalizado}>
                	{eventoInfo.estado ? '(1 activo)' : '(0 activos)'}
            	</Text>
				{eventoInfo.estado ? 	
				<Link to='/ventas'>
					<Text style={styles.txt}>Ingresar</Text>
				</Link> : <Text style={styles.txt}>. . . . . . .</Text>}
			</View>
			<ScrollView style={styles.scrollView}>
				{eventos.map((x, auxKey) => (
					<Evento
						key={auxKey}
						data={x}
						eventos={eventos}
						setEventos={setEventos}
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
		marginBottom: 150
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
    },
	txtActivo: {
		fontSize: 20,
        color: 'green'
    },
    txtInactivoFinalizado: {
		fontSize: 20,
        color: 'red'
    },
})


export default EventoLista;