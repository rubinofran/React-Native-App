import React from "react";
import { useState, useContext } from "react";
import { Formik } from "formik";
import { StyleSheet, View, TextInput, Button, Alert, Text} from "react-native";

import eventoService from "../services/events";

import NavBar from "./NavBar";

function VentaForm({ form, setForm, eventoActivo, setEventoActivo }) {
    
    const [eventoAux] = useState(form.data)

    function camposIncorrectos(values) {
        return  values.Evento_clave_BM === "" | 
                values.Evento_monto <= 0
    }

    function noCumpleValidaciones(clave) {
        return clave != eventoActivo.Evento_clave_BM
    }

    const finalizarEvento = async (monto) => {
        try {
            await eventoService.modificarEvento(eventoActivo.Evento_ID, {
                Evento_nombre: eventoActivo.Evento_nombre,
                Evento_descrip: eventoActivo.Evento_descrip,
                Evento_clave_BM: eventoActivo.Evento_clave_BM,
                Evento_monto: monto,
                Evento_fecha: eventoActivo.Evento_fecha,
                Evento_estado: "finalizado"
            });
            console.log('Se finalizó el evento')
        } catch (err) {
            console.log('ERROR, no se pudo finalizar el evento: ', err);
        }
	};

    return (
        <Formik
            initialValues={eventoAux}
            onSubmit={values => {
                console.log(`Intenta finalizar con:`, values);
                if(camposIncorrectos(values)) {
                    console.log('Primera validación: alguno de los campos no fue completado correctamente')
                    Alert.alert('Error *', 'Alguno de los campos no fue completado correctamente')
                } else if(noCumpleValidaciones(values.Evento_clave_BM)) {
                    console.log(`Segunda validación: no cumple con los requisitos para finalizar el evento`)
                    Alert.alert('Error', 'Para finalizar un evento debe conocer la clave')
                } else {
                    finalizarEvento(values.Evento_monto) 
                    setForm({
                        visible: false
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
                                placeholder='Clave para finalizar *'
                                value={values.Evento_clave_BM}
                                onChangeText={handleChange('Evento_clave_BM')}
                                maxLength={10}
                            />
                            <TextInput 
                                style={styles.input}
                                placeholder='Dinero recaudado (> 0) *'
                                value={values.Evento_monto.toString()}
                                onChangeText={handleChange('Evento_monto')}                        
                            />
                            <View style={styles.acciones}>
                                <Button 
                                    color='lightgreen'
                                    title='finalizar'
                                    onPress={handleSubmit}
                                />
                                <Button 
                                    color='salmon'  
                                    title='cancelar' 
                                    onPress={() => {
                                        console.log('Se cancela la operación')
                                        setForm({
                                            visible: false
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
        backgroundColor: 'lightblue'
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

export default VentaForm;