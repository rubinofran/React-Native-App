import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Button, ScrollView, Text, FlatList } from "react-native";

import NavBar from "./NavBar";

const Info = ({ x }) => {
    return (
        <View style={styles.txtInf}>
            <Text style={styles.txt}>
                {x.id} 
            </Text>
            <Text style={styles.txt}>
                {x.cant} unidades por {x.precio}$
            </Text>
        </View>
    )
}

function EventoDetalles({ detalles, setDetalles, ventas, productos }) {
    
    const [recaud] = useState(() => {
        let rec = 0
        ventas.map(x => {
            if(x.Evento_ID === detalles.data.Evento_ID) {
                rec += x.Producto_precio
            }
        })
        return rec
    })

    const [info] = useState(() => {
        let inf = []
        ventas.map(x => {
            if(x.Evento_ID === detalles.data.Evento_ID) {
                const obj = { id: x.Producto_ID, precio: x.Producto_precio, cant: 1 }
                let contiene = false
                inf.map(y => {
                    if(y.id === obj.id) {
                        contiene = true
                        y.precio += obj.precio 
                        y.cant += 1
                    } 
                })
                if(!contiene)
                    inf.push(obj)
            }
        })
        inf.map(z => {
            productos.map(p => {
                if(p.Producto_ID === z.id) {
                    z.id = p.Producto_nombre + ` (${p.Producto_marca})`
                }
            })
        })
        return inf
    })

    function calcularRelac(monto, recaud) {
        if(monto == recaud)  
            return `Los valores coinciden`
        if(monto < recaud)
            return `Existe una pérdida de ${recaud - monto}$`
        return `Existe una ganancia de ${monto - recaud}$`  
    }

    useEffect(() => {
        /* console.log('Evento: ', detalles.data) */
/*        console.log(info)
        console.log('Recaudación: ', recaud)
        console.log('Productos: ', productos)
		console.log('Evento: ', detalles.data)
        ventas.map(x => {
            if(x.Evento_ID === detalles.data.Evento_ID) {
                console.log('Venta: ', x)
            }
        }) */
	}, []);

    return (
        <View style={styles.color}>
            <NavBar />
{/*             <View style={styles.subBar}>
                <Text style={styles.txt}>DETALLES</Text>
				<Button
					color='salmon'  
					title='atras' 
					onPress={() => {
						console.log('Vuelve al listado de eventos')
						setDetalles({
							visible: false,
                            data: {}
						})
					}}
				/>
            </View> */}
            <Text style={styles.txt}>
                {detalles.data.Evento_nombre} ({detalles.data.Evento_fecha})
            </Text>
            
            <Text style={styles.txt}>
                Descripción: {detalles.data.Evento_descrip === "" ? 'Sin descripción' : detalles.data.Evento_descrip}
            </Text>
            <Text style={styles.txt}>
                Ganancias registradas:
            </Text>
            <Text style={styles.txtInf}>
                {detalles.data.Evento_monto}$
            </Text>
            <Text style={styles.txt}>
                Ganancias esperadas según las ventas:
            </Text>
            <Text style={styles.txtInf}>
                {recaud}$
            </Text>
            <Text style={styles.txt}>
                Relación entre el monto registrado y la ganancia esperada: 
            </Text>
            <Text style={styles.txtInf}>
                {calcularRelac(detalles.data.Evento_monto, recaud)}
            </Text>
            <Text style={styles.txt}>
                Ganancia esperada por cada producto:
            </Text>
            <ScrollView style={styles.scrollView}>
                {info.map((x, auxKey) => {
                    return (
                        <Info
                            key={auxKey}
                            x={x}
                        />
                    )
                })}
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    color: {
        backgroundColor: 'lightblue'
    },
    scrollView: {
		backgroundColor: 'grey',
        maxHeight: 100,
        minHeight: 100
	},
    subBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: 'lightgrey',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
	txt: {
        fontSize: 20,
        marginHorizontal: 20
    },
    txtInf: {
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10
    }
})

export default EventoDetalles;