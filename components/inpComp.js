import { Text, View, TextInput, StyleSheet } from "react-native";
function InputComp({ placeholder, lable, multilineBool, textChange }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "grey",
          fontWeight: "bold",
          fontSize: 11,
          marginBottom: 1,
        }}
      >
        {lable}
      </Text>
      <TextInput
        mode="outlined"
        //ref={textInput}
        label={lable || "Email"}
        //secureTextEntry={secureTextEntry}
        onChangeText={textChange}
        //returnKeyType={returnKeyType}
        //onSubmitEditing={onSubmitEditing}
        multiline={multilineBool}
        
        
        //keyboardType={keyboardType}
        //value={text || value}
        style={styles.inputStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical:7,
    
    width: "90%",
    alignSelf: "center",
  },
  inputStyle: {
    fontSize: 15,
    paddingLeft: 0,
    borderBottomWidth: 0.7,
    borderColor: "black",
    fontWeight: "bold",
  },
});

export default InputComp;
