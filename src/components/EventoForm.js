import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { StyleSheet, View, TextInput, Button, Alert, Text} from "react-native";

import eventoService from "../services/events";
import NavBar from "./NavBar";

function EventoForm({ form, setForm, eventos, setEventos }) {

    const [eventoAux] = useState(form.data)
    const buttonTitle = form.nuevo ? 'agregar' : 'modificar'

    function fechaInvalida(fecha) {
        if(fecha.length < 10) {
            return true
        }
        if(fecha.charAt(2) !== '/' | fecha.charAt(5) !== '/') { // No contiene separadores
            return true
        }
        const dma = fecha.split('/') 
        const meses = [ 
            {nro: "01", d: "31"}, {nro: "02", d: "28"}, {nro: "03", d: "31"}, {nro: "04", d: "30"},
            {nro: "05", d: "31"}, {nro: "06", d: "30"}, {nro: "07", d: "31"}, {nro: "08", d: "30"},
            {nro: "09", d: "30"}, {nro: "10", d: "31"}, {nro: "11", d: "30"}, {nro: "12", d: "30"} 
        ]
        if(meses.some(m => dma[1] === m.nro && dma[0] <= m.d)) { // fecha válida
            return false
        }
        return true
    }

    function camposIncorrectos(values) {
        return  values.Evento_nombre === "" |
                values.Evento_clave_BM === "" |
                values.Evento_fecha === "" |
                fechaInvalida(values.Evento_fecha)
    }

    function noCumpleValidaciones(values) {
        return false /* PENDIENTE */
    }
	const agregarEvento = async (values) => {
		try {
			await eventoService.agregarEvento({
				Evento_nombre: values.Evento_nombre,
                Evento_descrip: values.Evento_descrip,
                Evento_clave_BM: values.Evento_clave_BM,
                Evento_fecha: values.Evento_fecha
			});
			setEventos([...eventos, values]);
            console.log('Se agregó el nuevo evento a la lista')
		} catch (err) {
			console.log('ERROR, no se pudo agregar el nuevo evento a la lista: ', err)
		}
	};

	const modificarEvento = async (values) => {
        try {
            await eventoService.modificarEvento(values.Evento_ID, {
                Evento_nombre: values.Evento_nombre,
                Evento_descrip: values.Evento_descrip,
                Evento_clave_BM: values.Evento_clave_BM,
                Evento_monto: values.Evento_monto,
                Evento_fecha: values.Evento_fecha,
                Evento_estado: values.Evento_estado
            });
            setEventos([...eventos.filter(x => x.Evento_ID !== values.Evento_ID), values])
            console.log('Se modificó el evento de la lista')
        } catch (err) {
            console.log('ERROR, no se pudo modificar el evento de la lista: ', err)
        }
	};

    return (
        <Formik
            initialValues={eventoAux}
            onSubmit={values => {
                console.log(`Intenta ${buttonTitle}:`, values);
                if(camposIncorrectos(values)) {
                    console.log('Primera validación: alguno de los campos no fue completado correctamente')
                    Alert.alert('Error *', 'Alguno de los campos no fue completado correctamente')
                } else if(noCumpleValidaciones(values)) {
                    console.log(`Segunda validación: no cumple con los requisitos para ${buttonTitle} el evento`)
                    Alert.alert('Error', 'VALIDAR Y MENSAJE')
                } else {
                    form.nuevo ? agregarEvento(values) : modificarEvento(values) 
                    setForm({
                        visible: false,
                        nuevo: true
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
                                value={values.Evento_nombre}
                                onChangeText={handleChange('Evento_nombre')}
                                maxLength={30}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder='Descripción'
                                value={values.Evento_descrip}
                                onChangeText={handleChange('Evento_descrip')}
                                maxLength={50}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder='Clave para eliminar o modificar *'
                                value={values.Evento_clave_BM}
                                onChangeText={handleChange('Evento_clave_BM')}
                                maxLength={10}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder='Fecha (dd/mm/aaaa) *'
                                value={values.Evento_fecha}
                                onChangeText={handleChange('Evento_fecha')}
                                maxLength={10}
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
                                            nuevo: true
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
    },
})

export default EventoForm;