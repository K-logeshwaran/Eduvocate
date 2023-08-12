import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
} from "react-native";

const Dropdown = ({ label, data, onSelect }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{ alignSelf: "center", textTransform: "capitalize" }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={{ marginBottom: 450 }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(!!selected && selected.label) || label}
      </Text>
      <View style={styles.imgView}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/drop.png")}
          //source={{uri:"https://banner2.cleanpng.com/20180429/gre/kisspng-computer-icons-arrow-amount-5ae62ea9a595b3.9916039515250346656782.jpg"}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    height: 50,
    zIndex: 1,
    width: "85%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "#0086ff",
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "#0086ff",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "90%",
    height: "95%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    paddingBottom: 15,
    alignSelf: "center",
  },
  overlay: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tinyLogo: {
    width: 25,
    height: 25,
  },
  imgView:{
    paddingRight:12,
    justifyContent:"center",
    alignItems:"baseline",
    paddingBottom:5
  }
});

export default Dropdown;
