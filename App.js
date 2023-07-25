import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
  StatusBar,
  Image,
  TextInput,
  Button,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import HeaderBar from "./components/headerBar";
import InputComp from "./components/inpComp";
import Seperator from "./components/seperator";
import Btn from "./components/btn";

const apiUrl = "https://27c7-2409-4072-6d99-9698-b4d7-aa55-f4b8-5c3e.ngrok-free.app";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [stuData, setStudData] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [staffName, setStaffName] = useState(true);
  const [staffDep, setStaffDep] = useState(true);
  const [remark, setRemark] = useState(true);
  const [value, onChangeText] = useState("Useless Multiline Placeholder");

  const getStudentDetails = async () => {
    console.log(`${apiUrl}/student/${stuData}`);
    try {
      const response = await fetch(`${apiUrl}/student/${stuData}`);
      const json = await response.json();
      console.log(json);
      console.log(`${apiUrl}/student/image/${json?.imageUrl}`);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    setScanned(false);
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(true);
    setStudData(data);
    setModalVisible(true);
  };

  if (hasPermission === null) {
    return <ActivityIndicator />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function sendMail(dep, rm, rgno, staffName,staffdep) {
    setModal2Visible(true);
    const res = await fetch(`${apiUrl}/remark`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dept: dep.replace(" ", ""),
        rem: rm,
        rgno,
        staffName,
        staffdep
      }),
    });
    console.log(
      JSON.stringify({
        dept: dep.replace(" ", ""),
        rem: rm,
        rgno,
        staffName,
        staffdep
      })
    );
    let js = await res.json();
    if (js.code == 200) {
      setModal2Visible(false);
      alert("Message Send Successfully");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="rgba(0,0,0,0.4)" />
      <HeaderBar />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.layerTop}>
          <Text style={styles.txt}>Place Id card before camera</Text>
        </View>
      </BarCodeScanner>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onShow={() => {
          getStudentDetails();
          console.log(`${apiUrl}/student/image/${data?.imageUrl}`);
        }}
        onRequestClose={() => {
          setScanned(false);
          setModalVisible(!modalVisible);
        }}
      >
        <HeaderBar />
        <View>
          <View style={styles.modalView}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                <View style={styles.stuDetail}>
                  <View style={styles.lft}>
                    <Image
                      source={{
                        uri: `${apiUrl}/student/image/${data?.imageUrl}`,
                      }}
                      style={{ width: 150, height: 150 }}
                      loadingIndicatorSource={<ActivityIndicator />}
                    />
                  </View>
                  <View style={styles.lft}>
                    <Text style={styles.stuInfo}>Name : {data?.name}</Text>
                    <Text style={styles.stuInfo}>Reg No : {data?.regno}</Text>
                    <Text style={styles.stuInfo}>Class : {data?.class}</Text>
                    <Text style={styles.stuInfo}>Shift : {data?.shift}</Text>
                  </View>
                </View>
                <Seperator width={"95%"} />
                <View>
                  <InputComp
                    lable={"Remarks:"}
                    multilineBool={true}
                    placeholder={"Enter Remark"}
                    textChange={setRemark}
                  />
                  <InputComp
                    lable={"Staff Name:"}
                    multilineBool={false}
                    placeholder={"Enter your Name"}
                    textChange={setStaffName}
                  />
                  <InputComp
                    lable={"Staff Department:"}
                    multilineBool={false}
                    placeholder={"Enter your Department"}
                    textChange={setStaffDep}
                  />
                  <Seperator width={"95%"} />
                  <Btn
                    title={"Submit"}
                    clr={"#1877F2"}
                    onPress={() => {
                      console.log(staffDep, remark, data.regno, staffName);
                      sendMail(data?.dep, remark, data.regno);
                    }}
                  />
                </View>
              </>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setScanned(false);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close Screen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal2Visible}
        // onRequestClose={() => {
        //   setModal2Visible(!modal2Visible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modal2}>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#fff" }}>
              Sending Message
            </Text>
            <ActivityIndicator color={"#fff"} size={"large"} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
//npx expo start --tunnel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  txt: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "900",
    color: "rgba(50,30,70,0.9)",
    textAlignVertical: "center",
    paddingVertical: 15,
  },
  layerTop: {
    position: "absolute",
    top: "10%",
    width: "100%",
  },
  stuDetail: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  stuInfo: {
    fontSize: 15,
    paddingVertical: 3,
    fontWeight: "300",
  },
  lft: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 1,
  },
  rgt: {
    flex: 0.7,
  },
  btns: {
    width: "90%",
    alignSelf: "center",
  },
  modal2: {
    backgroundColor: "rgba(0,0,0,.6)",
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    gap: 35,
    borderRadius: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
