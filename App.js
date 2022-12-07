import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Router from "./src/routes/index";

import { useState, useMemo } from "react";
import { EventoInfoContext } from "./src/context/EventoInfoContext";

function App() {

  const [eventoInfo, setEventoInfo] = useState({ id: "", estado: false, prods: []});
	const eventoInfoProvider = useMemo(
		() => ({ eventoInfo, setEventoInfo }),
		[eventoInfo, setEventoInfo]
	);

  return (
    <View style={styles.container}>
      <EventoInfoContext.Provider value={eventoInfoProvider}>
        <Router />
      </EventoInfoContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: 'lightblue'
  },
})

export default App;
