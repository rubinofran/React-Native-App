import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Button, ScrollView, Text} from "react-native";

import NavBar from "./NavBar";

const Info = ({ x }) => {
    return (
        <View style={styles.txtInfoRow}>
            <Text style={styles.txt}>
                {x.id} 
            </Text>
            <Text style={styles.txt}>
                {x.cant}
            </Text>
            <Text style={styles.txt}>
                {x.precio}
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
            return `los valores coinciden`
        if(monto < recaud)
            return `existe una pérdida de ${recaud - monto}$`
        return `existe una ganancia de ${monto - recaud}$`  
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
        <View>
            <NavBar />
            <View style={styles.subBar}>
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
            </View>
            <ScrollView style={styles.scrollView}>
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
                    Relación entre el monto registrado y la ganancia esperada: {calcularRelac(detalles.data.Evento_monto, recaud)}
                </Text>

                <View style={styles.txtInfoRow}>
                    <Text style={styles.txt}>
                        PRODUCTO 
                    </Text>
                    <Text style={styles.txt}>
                        VENDIDOS
                    </Text>
                    <Text style={styles.txt}>
                        GANANCIA
                    </Text>
                </View>
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
    scrollView: {
		backgroundColor: 'lightblue',
		/* marginHorizontal: 10, */
		/* marginBottom: 150 */
        padding: 10,
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
    txtInf: {
        fontSize: 20,
        textAlign: 'center'
    },
    txtInfoRow: {
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})

export default EventoDetalles;