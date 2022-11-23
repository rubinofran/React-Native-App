import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Router from "./routes/index";

function App() {
  return (
    <View style={styles.container}>
      <Router />
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
