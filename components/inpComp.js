import {
    Text,
    View,
    TextInput,
    StyleSheet
  } from "react-native";
function InputComp({placeholder,lable,multilineBool,textChange}) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 15,
          marginBottom: 5,
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
       placeholder={placeholder}
        //keyboardType={keyboardType}
        //value={text || value}
        style={styles.inputStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginBottom:7
    },
    inputStyle:{
        fontSize:15,
        paddingLeft:10,
        borderWidth:.5,
        borderColor:"black"
    }
})

export default InputComp;
