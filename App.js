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
} from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import HeaderBar from "./components/headerBar";
import InputComp from "./components/inpComp";
import Seperator from "./components/seperator";
import Btn from "./components/btn";
import Dropdown from "./components/dropDown";

const apiUrl = "https://df4c-157-46-125-30.ngrok-free.app";

export default function App() {
  const [selected, setSelected] = useState(undefined);
  const dta = [
    { label: "Commerce", value: "commerce" },
    { label: "Economics", value: "economics" },
    { label: "English", value: "english" },
    { label: "History", value: "history" },
    { label: "Management Studies", value: "management_studies" },
    { label: "Social Work", value: "social_work" },
    { label: "Tamil", value: "tamil" },
    { label: "Actuarial Science", value: "actuarial_science" },
    { label: "Aviation", value: "aviation" },
    {
      label: "Biotechnology & Bioinformatics",
      value: "biotechnology_bioinformatics",
    },
    { label: "Botany", value: "botany" },
    { label: "Chemistry", value: "chemistry" },
    { label: "Computer Applications(BCA)", value: "computer_applications_bca" },
    { label: "Computer Applications(MCA)", value: "computer_applications_mca" },
    { label: "Computer Science", value: "computer_science" },
    { label: "Data Science", value: "data_science" },
    { label: "Environmental Sciences", value: "environmental_sciences" },
    { label: "Information Technology", value: "information_technology" },
    {
      label: "Library & Information Science",
      value: "library_information_science",
    },
    { label: "Mathematics", value: "mathematics" },
    { label: "Food and Nutrition", value: "food_and_nutrition" },
    { label: "Physics", value: "physics" },
    { label: "Physical Education", value: "physical_education" },
    { label: "Visual Communication", value: "visual_communication" },
    { label: "Zoology", value: "zoology" },
  ];
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [stuData, setStudData] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [staffName, setStaffName] = useState(true);
  const [staffDep, setStaffDep] = useState(true);
  const [remark, setRemark] = useState(true);
  //`const [value, onChangeText] = useState("Useless Multiline Placeholder");

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
    // console.log(prompt("enter url"));
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

  async function sendMail(dep, rm, rgno, staffName, staffdep) {
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
        staffdep,
      }),
    });

    let js = await res.json();
    if (js.code == 200) {
      console.log({
        dep,
        rm,
        rgno,
        staffName,
        staffdep: staffdep.toUpperCase(),
      });
      setModal2Visible(false);
      setModal3Visible(true);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="rgba(0,0,0,0.4)" />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <HeaderBar />
        <View style={styles.layerTop}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              paddingTop: 10,
            }}
          >
            PLACE THE{" "}
            <Text
              style={{
                color: "#0085ff",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              ID
            </Text>{" "}
            BEFORE CAMERA
          </Text>
        </View>
        <View style={styles.layerLeft}></View>
        <View style={styles.layerRight}></View>
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
        <View>
          <View style={styles.modalView}>
            {isLoading ? (
              <View>
                <HeaderBar />

                <ActivityIndicator color={"#fff"} size={"large"} />
              </View>
            ) : (
              <>
                <View style={styles.headerContainer}>
                  <View style={styles.headerContent}>
                    <Pressable
                      style={styles.img1}
                      onPress={() => {
                        setScanned(false);
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Image
                        style={{
                          width: 45,
                          height: 45,
                        }}
                        source={require("./assets/back.png")}
                      ></Image>
                    </Pressable>
                    <View style={styles.img2}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                        source={require("./assets/logo.png")}
                      ></Image>
                    </View>
                    <View
                      style={{
                        width: 50,
                        backgroundColor: "#fff",
                      }}
                    ></View>
                  </View>
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
                      <Text style={[styles.stuInfo, styles.stuname]}>
                        {" "}
                        {data?.name}
                      </Text>
                      <Text style={styles.stuInfo}> {data?.regno}</Text>
                      <Text style={styles.stuInfo}>
                        {" "}
                        {data?.class.toUpperCase()}
                      </Text>
                      <Text style={styles.stuInfo}>
                        {" "}
                        {data?.shift.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <Seperator width={"95%"} /> */}
                <View>
                  <InputComp
                    lable={"Remarks"}
                    multilineBool={true}
                    placeholder={"Enter Remark"}
                    textChange={setRemark}
                  />
                  <InputComp
                    lable={"Staff Name"}
                    multilineBool={false}
                    placeholder={"Enter your Name"}
                    textChange={setStaffName}
                  />
                  <Seperator width={"95%"} />
                  <Dropdown
                    label="Select Department"
                    data={dta}
                    onSelect={setSelected}
                  />

                  <Seperator width={"95%"} />
                  <Btn
                    title={"Submit"}
                    clr={"#0086ff"}
                    onPress={() => {
                      console.log(staffDep, remark, data.regno, staffName);
                      sendMail(
                        data?.dep,
                        remark,
                        data.regno,
                        staffName,
                        selected.value
                      );
                    }}
                  />
                </View>
              </>
            )}
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
            <Text style={{ fontSize: 30, fontWeight: "200", color: "#fff" }}>
              Sending Message
            </Text>
            <ActivityIndicator color={"#fff"} size={"large"} />
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={false} visible={modal3Visible}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0085fe",
            position: "relative",
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              position: "absolute",
              top: "3%",
              alignSelf: "center",
            }}
            source={require("./assets/logo-white.png")}
          ></Image>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position: "absolute",
              top: "35%",
              alignSelf: "center",
            }}
            source={require("./assets/tick.png")}
          ></Image>
          <Text
            style={{
              position: "absolute",
              top: "55%",
              alignSelf: "center",
              fontWeight: "600",
              color: "#fff",
              fontSize: 20,
            }}
          >
            COMPLAINT SUCCESS
          </Text>
          <Pressable
            style={{
              position: "absolute",
              bottom: "7%",
              alignSelf: "center",
              borderWidth: 0.5,
              width: "80%",
              paddingVertical: 10,
              backgroundColor: "#fff",
              borderColor: "#fff",
              borderRadius: 5,
            }}
            onPress={() => {
              setModal3Visible(false);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "rgb(0, 133, 254)",
              }}
            >
              GET BACK
            </Text>
          </Pressable>
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

  stuDetail: {
    paddingLeft: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingTop: 10,
  },
  stuInfo: {
    fontSize: 15,
    paddingVertical: 3,
    fontWeight: "bold",
    color: "#8b929c",
  },
  stuname: {
    color: "#000",
    fontSize: 18,
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
    // backgroundColor: "rgba(0,0,0,.6)",
    // width: 250,
    // height: 150,
    // justifyContent: "center",
    // alignItems: "center",
    // gap: 35,
    // borderRadius: 7,
    backgroundColor: "rgba(0, 0,0,.7)",
    width: "100%",
    height: "80%",
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
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  headerContainer: {},
  img1: {
    marginLeft: 15,
  },
  img2: {
    alignSelf: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 20,
    fontWeight: "900",
    paddingLeft: 10,
    color: "rgba(0,0,0,.7)",
  },
  headerContent: {
    height: 95,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  headerContainer: {
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.21,
    shadowRadius: 8.19,
    elevation: 2,
    marginBottom: 20,
  },
  layerTop: {
    position: "absolute",
    top: "15%",
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
  },
  layerLeft: {
    position: "absolute",
    top: "16%",
    left: "0%",
    width: "10%",
    height: "80%",
    backgroundColor: "#fff",
  },
  layerRight: {
    position: "absolute",
    top: "16%",
    right: "0%",
    width: "10%",
    height: "80%",
    backgroundColor: "#fff",
  },
});
