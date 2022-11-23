
import { useState } from "react";
import { StyleSheet, Text, View, Alert, Button, TextInput } from "react-native";

import eventoService from "../services/events";

function Evento({ data, eventos, setEventos, setForm }) {

    const [claveAux, setClaveAux] = useState("")
    function onChangeText(claveIngresada) {
        /* console.log(claveIngresada) */
        setClaveAux(claveIngresada)
    }

    function noCumpleValidaciones(data) {
        return data !== claveAux
    }

    const eliminarEvento = async () => {
		try {
			await eventoService.eliminarEvento(data.Evento_ID);
			setEventos(eventos.filter(x => x.Evento_ID !== data.Evento_ID));
			console.log('Se eliminó el evento de la lista')
		} catch (err) {
			console.log('ERROR, no se pudo eliminar el evento de la lista: ', err);
		}
	};

    return (
        <View style={styles.opc}>
            <Text style={styles.txt}>
                {data.Evento_nombre}
            </Text>
            <Text style={data.Evento_estado === "activo" ? styles.txtActivo : styles.txtInactivoFinalizado}>
                {data.Evento_estado}
            </Text>
            <Text style={styles.txt}>
                {data.Evento_fecha}
            </Text>
            <TextInput 
                style={styles.txt}
                placeholder='Clave para eliminar o modificar'
                value={claveAux}
                onChangeText={onChangeText}
                maxLength={10}
            />
            <View style={styles.acciones}>
                <Button 
                    color='lightgreen'  
                    title='Modificar'
                    onPress={() => {
                        console.log(`Intenta modificar el evento: ${data.Evento_nombre}`)
                        if(noCumpleValidaciones(data.Evento_clave_BM)) { /* FALTAN VALIDACIONES */
                            console.log('Validación: no cumple con los requisitos para eliminar el evento')
                            Alert.alert('Para modificar un evento debe conocer la clave') 
                        } else {
						    setForm({
                                visible: true,
                                nuevo: false,
                                data: data
                            })
                        }
					}}
                />
                <Button 
                    color='lightblue'  
                    title='Descripción'
                    onPress={() => {
                        console.log(`Consulta sobre la descripción del evento: ${data.Evento_nombre}`)
                        Alert.alert(data.Evento_descrip === ""? 'Sin descripción' : data.Evento_descrip)
                    }}
                />
                <Button 
                    color='salmon'  
                    title='Eliminar'
                    onPress={() => {
                        console.log(`Intenta eliminar el evento: ${data.Evento_nombre}`)
                        if(noCumpleValidaciones(data.Evento_clave_BM)) { /* FALTAN VALIDACIONES */
                            console.log('Validación: no cumple con los requisitos para eliminar el evento')
                            Alert.alert('Para eliminar un evento debe conocer la clave') 
                        } else {
                            eliminarEvento()
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
    txtActivo: {
        fontSize: 20,
        padding: 5,
        color: 'green'
    },
    txtInactivoFinalizado: {
        fontSize: 20,
        padding: 5,
        color: 'red'
    }
})

export default Evento;