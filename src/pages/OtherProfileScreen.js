// @ts-nocheck
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect } from 'react'
import { styles } from "../resources/Styles";
import { LinearGradient } from "expo-linear-gradient";
import ProfileItem from "../components/profileComponents/ProfileItem";
import { UpdateUserProfile, getUserFromId } from "../connectors/ProfileServiceConnector";
import Toast from "react-native-root-toast";
import { getToken, getUser } from "../resources/InternalStorage";
import BottomBar from "../components/Layout/BottomBar";

const ProfileScreen = ({ navigation, route }) => {

    async function showMessage(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            backgroundColor: "grey",
            textColor: "white",
        });
        setTimeout(function hideToast() {
            Toast.hide(toast)
        }, 5000);
    }

    const { otherUserId } = route.params

    const [userName, onChangeUserName] = React.useState("")
    const [email, onChangeEmail] = React.useState("")
    const [city, onChangeCity] = React.useState("")
    const [plz, onChangePLZ] = React.useState("")
    const [street, onChangeStreet] = React.useState("")
    const [houseNumber, onChangeHouseNumber] = React.useState("")
    const [phoneNumber, onChangePhoneNumber] = React.useState("")
    const [firstName, onChangeFirstName] = React.useState("")
    const [name, onChangeName] = React.useState("")
    const [gender, onChangeGender] = React.useState("")
    const [price, onChangePrice] = React.useState("")
    const [pic, onChangePic] = React.useState("")
    const [achievedSkills, onChangeAchievedSkills] = React.useState("")
    const [searchedSkills, onChangeSearchedSkills] = React.useState("")

    let genderString;

    useEffect(() => {
        setUserData(otherUserId)
    }, [otherUserId])

    async function setUserData(otherUserId) {
        getUserFromId(otherUserId).then(r => {
            switch (r.gender) {
                case 1:
                    genderString = "Männlich"
                    break
                case 2:
                    genderString = "Weiblich"
                    break
                case 3:
                    genderString = "Divers"
                    break
                default:
                    genderString = "Keine Angabe"
                    break
            }
            onChangeUserName(r.username)
            onChangeFirstName(r.firstName)
            onChangeName(r.name)
            //onChangeCity(r.city.place)
            onChangePLZ((r.CityIdentifier).toString())
            onChangeGender(genderString)
            onChangeEmail(r.email)
            onChangeHouseNumber(r.houseNumber)
            onChangePhoneNumber(r.telephoneNumber)
            onChangeStreet(r.street)
            onChangePrice((r.price))
            onChangePic(r.profilePicture)
            onChangeAchievedSkills(r.achievedSkills)
            onChangeSearchedSkills(r.searchedSkills)
        }
        )
    }

    function goBack() {
        navigation.goBack()
    }

    const backButtonChar = "\u276e"

    return (
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            alignContent: "center"
        }}>
            <View style={{
                height: "95%",
                width: "100%"
            }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
                    alignContent: "center",
                    flex: 1
                }}>
                    {/*<View style={{
                    marginBottom: "1%",
                    width: "100%"
                }}>
                    <TouchableOpacity style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignContent: "center",
                        justifyContent: "center"
                    }}
                    onPress={goBack}>
                        <Text style={{
                            fontSize: 40,
                            fontWeight: "bold",
                            color: "#4287f5"
                        }}>{backButtonChar}</Text>
                    </TouchableOpacity>
                </View>*/}
                    <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
                        <View style={{
                            width: "100%",
                            height: "100%",
                            paddingVertical: "1%",
                            flex: 1,
                        }}>
                            <ScrollView contentContainerStyle={{
                                paddingBottom: "60%"
                            }}>
                                <ProfileItem
                                    name={name}
                                    //city={city}
                                    toggle={2}
                                    username={userName}
                                    firstName={firstName}
                                    gender={gender}
                                    email={email}
                                    //street={street}
                                    //houseNumber={houseNumber}
                                    plz={plz.toString()}
                                    phoneNumber={phoneNumber}
                                    profilePicture={pic}
                                    price={price}
                                    achievedSkills={achievedSkills}
                                    searchedSkills={searchedSkills}
                                />
                            </ScrollView>
                        </View>
                    </LinearGradient>
                </KeyboardAvoidingView>
            </View>
            <BottomBar />
        </SafeAreaView>
    )
}

export default ProfileScreen;