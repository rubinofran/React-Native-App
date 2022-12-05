import React from "react";
import { useState, useContext } from "react";
import { StyleSheet, Text, View, Alert, Button, TextInput } from "react-native";

import { EventoInfoContext } from "../context/EventoInfoContext";

import eventoService from "../services/events";

function Evento({ data, eventos, setEventos, setForm }) {

    const { eventoInfo, setEventoInfo } = useContext(EventoInfoContext)
    const [claveAux, setClaveAux] = useState("")
    
    function onChangeText(claveIngresada) {
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

    const activarEvento = async (values, aux) => {
        /* de forma provisoria para observar si actualiza bien el estado */
        try {
            await eventoService.modificarEvento(values.Evento_ID, {
                Evento_nombre: values.Evento_nombre,
                Evento_descrip: values.Evento_descrip,
                Evento_clave_BM: values.Evento_clave_BM,
                Evento_monto: values.Evento_monto,
                Evento_fecha: values.Evento_fecha,
                Evento_estado: aux ? "activo" : "inactivo"
            });
            values.Evento_estado = aux ? "activo" : "inactivo"
            setEventos([...eventos.filter(x => x.Evento_ID !== values.Evento_ID), values]);
            setEventoInfo({ id: values.Evento_ID, estado: aux })
            console.log('Se activó el evento de la lista')
        } catch (err) {
            console.log('ERROR, no se pudo activar el evento de la lista: ', err);
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
                /* VALIDACIÓN, HABILITAR CUANDO ESTÉ COMPLETO EL SISTEMA */
                editable={data.Evento_estado === "activo" | data.Evento_estado === "finalizado" ? false : true}
                style={styles.txt}
                placeholder='Clave para eliminar o modificar'
                value={claveAux}
                onChangeText={onChangeText}
                maxLength={10}
            />
            <View style={styles.acciones}>
                <Button 
                    disabled={data.Evento_estado === "activo" | data.Evento_estado === "finalizado" ? true : false}
                    color='lightgreen'  
                    title='Modificar'
                    onPress={() => {
                        console.log(`Intenta modificar el evento: ${data.Evento_nombre}`)
                        if(noCumpleValidaciones(data.Evento_clave_BM)) { /* FALTAN VALIDACIONES */
                            console.log('Validación: no cumple con los requisitos para eliminar el evento')
                            Alert.alert('Para modificar un evento debe conocer la clave') 
                        } else {
                            setClaveAux("")
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
                        console.log(`Consulta sobre la descripción del evento "${data.Evento_nombre}": ${data.Evento_descrip}`)
                        Alert.alert(data.Evento_descrip === ""? 'Sin descripción' : data.Evento_descrip)
                    }}
                />
                <Button 
                    disabled={data.Evento_estado === "activo" | data.Evento_estado === "finalizado" ? true : false}
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
            <View style={styles.acciones}>
                <Button 
                    /* VALIDACIÓN, HABILITAR CUANDO ESTÉ COMPLETO EL SISTEMA */
                    disabled={eventoInfo.estado | data.Evento_estado === "finalizado" ? true : false}
                    color='lightblue'  
                    title='Acceso al público'
                    onPress={() => {
                        console.log(`Intenta dar inicio al evento: ${data.Evento_nombre}`)
                        if(noCumpleValidaciones(data.Evento_clave_BM)) { /* FALTAN VALIDACIONES */
                            console.log('Validación: no cumple con los requisitos para eliminar el evento')
                            Alert.alert('Para dar inicio a un evento debe conocer la clave') 
                        } else {
                            activarEvento(data, data.Evento_estado === "inactivo" ? true : false)
                            setClaveAux("")
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