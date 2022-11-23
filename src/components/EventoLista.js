import { useState, useEffect } from "react";
import { StyleSheet, View, Button, Modal, ScrollView, Text } from "react-native";

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

    const [eventos, setEventos] = useState([]);
	const [algunEventoActivo, setAlgunEventoActivo] = useState(true)

    useEffect(() => {
		console.log('Ingresando al listado de eventos')
		async function fetchData() {
			const response = await eventoService.obtenerEventos();
			setEventos(response.data); 
			(response.data.some(x => x.Evento_estado === 'activo')) ? setAlgunEventoActivo(true) : setAlgunEventoActivo(false)
		}
		fetchData();
	}, []);

    return (
        <View>
            <NavBar />
            <View style={styles.subBar}>
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
				<Text style={styles.txt}>EVENTOS</Text>
				<Text style={algunEventoActivo ? styles.txtActivo : styles.txtInactivoFinalizado}>
                	{algunEventoActivo ? '(1 activo)' : '(0 activos)'}
            	</Text>
				<Formulario
					form={form}
					setForm={setForm}
					eventos={eventos}
					setEventos={setEventos}
				/>
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