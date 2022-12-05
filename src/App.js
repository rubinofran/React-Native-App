import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Router from "./routes/index";

import { useState, useMemo } from "react";
import { EventoInfoContext } from "./context/EventoInfoContext";

function App() {

  const [eventoInfo, setEventoInfo] = useState({ id: "", estado: false});
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
      marginTop: Constants.statusBarHeight + 10,
      flex: 1,
      backgroundColor: 'lightblue'
  },
})

export default App;
