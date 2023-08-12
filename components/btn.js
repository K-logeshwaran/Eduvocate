import { View ,Button} from "react-native";
function Btn({onPress,title,clr}) {
  return (
    <View style={[{ width: "50%", alignSelf:"center",marginTop:10}]}>
      <Button
        onPress={onPress}
        title={title}
        color={clr}
        
      />
    </View>
  );
}

export default Btn;
