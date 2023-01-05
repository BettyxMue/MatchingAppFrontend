import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React, {Component, useEffect} from 'react'
import {styles} from "../resources/Styles";
import {LinearGradient} from "expo-linear-gradient";
import ProfileItem from "../components/profileComponents/ProfileItem";
import {UpdateUserProfile, getUserFromId} from "../connectors/ProfileServiceConnector";
import Toast from "react-native-root-toast";
import {getToken, getUser} from "../resources/InternalStorage";

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

    //const token = getToken
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI4NTAxMjQsInN1YiI6MiwidXNlciI6Mn0.bq0g_kbUuSf4sUNqdCS36j1G8_nFVzELttvMwrSWtas0Y9L9-xAptzPGYLhYuU-kkGCTbFwnMCCLfR7zFoknfSf6k_P4ek_UkMPVJIAl2qOEcCoFLxkNwEJlWF1_x1b0ns7TEDr0jgef6VuZlxbRWpD-atWoTZLUuLiKtr33yuI"

    useEffect(() => {
        SetUser().then(r => {
            setUserData(r)
        })
    }, [])

    async function SetUser() {
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

    async function Logout() {
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
                    <ScrollView>
                        <ProfileItem
                            name={name}
                            city={city}
                            toggle={2}
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
                                              onPress={() => navigation.navigate("Skills")}>
                                <Text style={styles.continueButtonText}>Vorhandene Skills ansehen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editProfileButton}
                                              onPress={() => navigation.navigate("Filter")}>
                                <Text style={styles.continueButtonText}>Gesuchte Skills ansehen</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ProfileScreen;