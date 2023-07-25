import { View ,Button} from "react-native";
function Btn({onPress,title,clr}) {
  return (
    <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
      <Button
        onPress={onPress}
        title={title}
        color={clr}
      />
    </View>
  );
}

export default Btn;
