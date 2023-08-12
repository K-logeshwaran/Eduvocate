import { View, Image, StyleSheet } from "react-native";
import Seperator from "./seperator";

function HeaderBar() {
  return (
    <View style={styles.container}>
      
      
        <Image
          style={{
            width: 45,
            height: 45,
            borderRadius:50,
          }}
          source={require("../assets/logo.png")}
        ></Image>
      
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:20,
    position: "absolute",
    top: "0%",
    width: "90%",
    alignSelf:"center",
    borderBottomWidth:1.7,
    borderBottomColor:"#bdc1c3"
  },


});
export default HeaderBar;
