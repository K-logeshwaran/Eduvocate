import { View, Text,StyleSheet } from "react-native";

function HeaderBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Scanning Appp</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        height:75,
        backgroundColor:"#fff",
        paddingTop:27.5,
        borderStyle:"solid",
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2'
    },
    txt:{
        fontSize:20,
        fontWeight:"900",
        paddingLeft:10,
        color:"rgba(0,0,0,.7)"
    }

})
export default HeaderBar;
