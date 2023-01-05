import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React, {Component, useEffect} from 'react'
import {styles} from "../resources/Styles";
import {LinearGradient} from "expo-linear-gradient";
import ProfileItem from "../components/profileComponents/ProfileItem";
import {UpdateUserProfile, getUserFromId} from "../connectors/ProfileServiceConnector";
import Toast from "react-native-root-toast";
import {getToken, getUser} from "../resources/InternalStorage";
import BottomBar from "../components/layout/BottomBar";

const ProfileScreen = ({navigation}) => {

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

    const [toggleEdit, setToggleEdit] = React.useState(true)

    const [userId, setUserId] = React.useState("")
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

    let genderString;

    useEffect(() => {
        SetUser().then(r => {
            setUserData(r)
        })
    }, [])

    async function SetUser(){
        const user = await getUser()
        setUserId(user.id)
        return user.id
    }

    async function setUserData(userId) {
        getUserFromId(userId).then(r => {
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
                onChangeCity(r.city.place)
                onChangePLZ((r.city.plz).toString())
                onChangeGender(genderString)
                onChangeEmail(r.email)
                onChangeHouseNumber(r.houseNumber)
                onChangePhoneNumber(r.telephoneNumber)
                onChangeStreet(r.street)
                onChangePrice((r.price).toString())
            }
        )
    }

    async function onContinueButton() {
        let genderNr
        switch (gender) {
            case "Männlich":
                genderNr = 1
                break
            case "Weiblich":
                genderNr = 2
                break
            case "Divers":
                genderNr = 3
                break
        }

        UpdateUserProfile(genderNr, price, phoneNumber, firstName, name, userName, email, city, plz, street, houseNumber).then(r => {
            showMessage("User erfolgreich geupdated!")
        });
        setToggleEdit(true)
    }

    async function Logout(){
        //TODO: Logout
    }

    return (
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            alignContent: "center"
        }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
                alignContent: "center",
                flex: 1
            }}>
                <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
                    {toggleEdit ?
                        <View>
                            <ScrollView>
                                <ProfileItem
                                    name={name}
                                    city={city}
                                    toggle={1}
                                    username={userName}
                                    firstName={firstName}
                                    gender={gender}
                                    email={email}
                                    street={street}
                                    houseNumber={houseNumber}
                                    plz={plz.toString()}
                                    phoneNumber={phoneNumber}
                                    //profilePicture={userId.profilePicture[0]}
                                    price={price}
                                />

                                <View>
                                    <TouchableOpacity style={styles.editProfileButton}
                                                      onPress={() => setToggleEdit(false)}>
                                        <Text style={styles.continueButtonText}>Profil bearbeiten</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editProfileButton}
                                                      onPress={() => navigation.navigate("OtherProfile", {
                                                              otherId: 17
                                                          })}>
                                        <Text style={styles.continueButtonText}>Skills bearbeiten</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editProfileButton}
                                                      onPress={() => navigation.navigate("Filter")}>
                                        <Text style={styles.continueButtonText}>Filter bearbeiten</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editProfileButton}
                                                      onPress={() => Logout}>
                                        <Text style={styles.continueButtonText}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        <View>
                            <ScrollView>
                                <ProfileItem
                                    name={name}
                                    city={city}
                                    toggle={0}
                                    username={userName}
                                    firstName={firstName}
                                    gender={gender}
                                    email={email}
                                    street={street}
                                    houseNumber={houseNumber}
                                    plz={plz}
                                    phoneNumber={phoneNumber}
                                    //profilePicture={userId.profilePicture[0]}
                                    price={price}
                                    onContinueButton={onContinueButton}
                                    onChangeCity={onChangeCity}
                                    onChangeGender={onChangeGender}
                                    onChangeEmail={onChangeEmail}
                                    onChangeFirstName={onChangeFirstName}
                                    onChangeName={onChangeName}
                                    onChangePLZ={onChangePLZ}
                                    onChangePrice={onChangePrice}
                                    onChangeStreet={onChangeStreet}
                                    onChangeHouseNumber={onChangeHouseNumber}
                                    onChangeUsername={onChangeUserName}
                                    onChangeTelephoneNumber={onChangePhoneNumber}
                                />
                            </ScrollView>
                        </View>
                    }
                </LinearGradient>
                <BottomBar />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ProfileScreen;