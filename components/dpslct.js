import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";

function DpSlct({ label, data, onSelect }) {
  const [render, setRender] = useState(false);
  const onBtnPress = () => {};
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}} style={styles.touchable}>
      <Text style={styles.deps}>{item.label}</Text>
    </TouchableOpacity>
  );
  return (
    <TouchableOpacity onPress={() => setRender(true)}>
      <Text>{label}</Text>
      <Modal
        visible={render}
        animationType="slide"
        onRequestClose={() => {
          setRender(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.viewTwo}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewTwo: {
    backgroundColor: "rgba(0,0,0,.6)",
    width: 300,
    height: 400,
    alignItems: "center",
    gap: 35,
    borderRadius: 7,
  },
  touchable: {
    width: 300,
    marginVertical: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deps: {
    fontSize: 15,

    alignSelf: "center",
  },
 
});
export default DpSlct;
