import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { StyleSheet, Text, View, Alert, Button, TextInput } from "react-native";

import { EventoInfoContext } from "../context/EventoInfoContext";

import eventoService from "../services/events";
import productoService from "../services/products";

function Evento({ data, eventos, setEventos, setForm, productos, ventas, setDetalles }) {

    const { eventoInfo, setEventoInfo } = useContext(EventoInfoContext)
    const [claveAux, setClaveAux] = useState("")

    function onChangeText(claveIngresada) {
        setClaveAux(claveIngresada)
    }

    function noCumpleValidaciones(clave) {
        return clave !== claveAux | productos.length == 0
    }

    function noCumpleValidacionesParaEliminar(id) {
        let noCumple = false
        ventas.map(x => {
            if(x.Evento_ID === id) {
                /* console.log('El evento pertenece a al menos un registro de venta: ', x) */
                noCumple = true
            }
        })
        return noCumple
    }

    const eliminarEvento = async (id) => {
		try {
			await eventoService.eliminarEvento(id);
			setEventos(eventos.filter(x => x.Evento_ID !== id));
			console.log('Se eliminó el evento de la lista')
		} catch (err) {
			console.log('ERROR, no se pudo eliminar el evento de la lista: ', err);
		}
	};

    const activarEvento = async (values) => {
        try {
            await eventoService.modificarEvento(values.Evento_ID, {
                Evento_nombre: values.Evento_nombre,
                Evento_descrip: values.Evento_descrip,
                Evento_clave_BM: values.Evento_clave_BM,
                Evento_monto: values.Evento_monto,
                Evento_fecha: values.Evento_fecha,
                Evento_estado: "activo"
            });
            values.Evento_estado = "activo"
            setEventos([...eventos.filter(x => x.Evento_ID !== values.Evento_ID), values]);
            setEventoInfo({ id: values.Evento_ID, estado: true, prods: productos })
            console.log('Se activó el evento de la lista')
        } catch (err) {
            console.log('ERROR, no se pudo activar el evento de la lista: ', err);
        }
	};

    useEffect(() => {
        if(data.Evento_estado === "activo") {
            async function fetchData() {
                const responseProd = await productoService.obtenerProductos()
                setEventoInfo({ id: data.Evento_ID, estado: true, prods: responseProd.data })    
            }
            fetchData();
        }
	}, []);

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
                        if(noCumpleValidaciones(data.Evento_clave_BM)) { 
                            console.log('Validación: no cumple con los requisitos para modificar el evento')
                            Alert.alert('Error', 'Para modificar un evento debe conocer la clave') 
                        } else {
						    setForm({
                                visible: true,
                                nuevo: false,
                                data: data
                            })
                        }
                        setClaveAux("")
					}}
                />
                <Button 
                    color='lightblue'  
                    title='Descripción'
                    onPress={() => {
                        console.log(`Consulta sobre la descripción del evento "${data.Evento_nombre}": ${data.Evento_descrip}`)
                        Alert.alert(data.Evento_nombre, data.Evento_descrip === "" ? 'Sin descripción' : data.Evento_descrip)
                    }}
                />
                <Button 
                    disabled={data.Evento_estado === "activo" | data.Evento_estado === "finalizado" ? true : false}
                    color='salmon'  
                    title='Eliminar'
                    onPress={() => {
                        console.log(`Intenta eliminar el evento: ${data.Evento_nombre}`)
                        if(noCumpleValidaciones(data.Evento_clave_BM)) { 
                            console.log('Validación: no cumple con los requisitos para eliminar el evento')
                            Alert.alert('Error', 'Para modificar un evento debe conocer la clave') 
                        } else if(noCumpleValidacionesParaEliminar(data.Evento_ID)) { 
                            console.log('Validación: no cumple con los requisitos para eliminar el evento')
                            Alert.alert('Error', 'El pevento pertenece a los registros de venta y no puede ser eliminado') 
                        } else {
                            eliminarEvento(data.Evento_ID)
                        }
                        setClaveAux("")
                    }}
                />
            </View>
            <View style={styles.acciones}>
                <Button
                    disabled={eventoInfo.estado | data.Evento_estado === "finalizado" ? true : false}
                    color='lightblue'  
                    title='Acceso al público'
                    onPress={() => {
                        console.log(`Intenta dar inicio al evento: ${data.Evento_nombre}`)
                        if(noCumpleValidaciones(data.Evento_clave_BM)) { 
                            console.log('Validación: no cumple con los requisitos para dar inicio al evento')
                            Alert.alert('Error', 'Para dar inicio a un evento debe conocer la clave y contar con al menos un producto registrado') 
                        } else {
                            activarEvento(data)
                        }
                        setClaveAux("")
					}}
                />
                <Button 
                    disabled={data.Evento_estado != "finalizado" ? true : false}
                    color='lightblue'  
                    title='Detalles'
                    onPress={() => {
                        console.log(`Consulta sobre los detalles del evento "${data.Evento_nombre}"`)
                        setDetalles({
                            visible: true,
                            data: data
                        })
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
        marginVertical: 10,
        marginHorizontal: 20,
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