import { View, StyleSheet } from "react-native";
function Seperator({width}) {
  return <View style={[styles.separator,{width}]} />;
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf:"center",
  },
});

export default Seperator;
