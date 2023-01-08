// @ts-nocheck
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useRef } from "react";
import { styles } from "../resources/Styles";
import { LinearGradient } from "expo-linear-gradient";
import ProfileItem from "../components/profileComponents/ProfileItem";
import { UpdateUserProfile, getUserFromId, DeleteUser } from "../connectors/ProfileServiceConnector";
import Toast from "react-native-root-toast";
import { getToken, getUser, storeUser } from "../resources/InternalStorage";
import BottomBar from "../components/Layout/BottomBar";
import { Ionicons } from "@expo/vector-icons";


const ProfileScreen = ({ navigation }) => {

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
    const [profilePicture, setProfilePicture] = React.useState("")
    const [isLoading, setLoading] = React.useState(true)

    let genderString;

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
            setProfilePicture(r.profilePicture)
            setLoading(false)
            if (!isLoading) {
                if (r.name == "" || r.firstName == "") {
                    showErrorMessage("Bitte fülle die fehlenden Profildaten noch aus!")
                }
            }
        }
        )
    }

    async function showErrorMessage(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            backgroundColor: "#f5543b",
            textColor: "white",
        });
        setTimeout(function hideToast() {
            Toast.hide(toast)
        }, 5000);
    }

    async function onContinueButton() {
        if (gender == undefined) {
            showErrorMessage("Bitte wähle ein Geschlecht aus!")
            return
        } else if (price == "" || price == 0) {
            showErrorMessage("Bitte trage deinen Preis pro Stunde ein!")
            return
        }

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
            default:
                genderNr = 0
                break
        }
        setLoading(true)
        UpdateUserProfile(genderNr, price, phoneNumber, firstName, name, userName, email, city, plz, street, houseNumber, profilePicture).then(r => {
            showMessage("User erfolgreich geupdated!")
            setLoading(false)
        });
        setToggleEdit(true)
    }

    function Logout() {
        navigation.navigate("Start")
        storeUser(null)
    }
    function Delete() {
        DeleteUser().then(r => {
            navigation.navigate("Start")
            storeUser(null)
        })
    }

    if (isLoading) {
        return (
            <Text style={{
                textAlign: "center",
                fontStyle: "italic",
                fontSize: 30,
                marginVertical: "100%"
            }}>Loading...</Text>
        )
    }

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
                    <View style={{
                        height: "100%",
                        width: "100%"
                    }}>
                        <View style={{
                            marginBottom: "1.5%",
                            width: "100%",
                        }}>
                            <TouchableOpacity style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignContent: "center",
                                justifyContent: "center"
                            }} onPress={() => {
                                navigation.navigate("Details")
                            }}>
                                <Ionicons name="search-circle" size={35} color="#3860ff" />
                            </TouchableOpacity>
                        </View>
                        <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
                            <View style={{
                                width: "100%",
                                height: "100%",
                                paddingVertical: "1%",
                                flex: 1,
                            }}>
                                {toggleEdit ?
                                    <View >
                                        <ScrollView contentContainerStyle={{
                                            paddingBottom: "80%"
                                        }}>
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
                                                profilePicture={profilePicture}
                                                price={price}
                                            />

                                            <View>
                                                <TouchableOpacity style={styles.editProfileButton2}
                                                    onPress={() => setToggleEdit(false)}>
                                                    <Text style={styles.continueButtonText}>Profil bearbeiten</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.editProfileButton2}
                                                    onPress={() => navigation.navigate("Skills")}>
                                                    <Text style={styles.continueButtonText}>Skills bearbeiten</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.editProfileButton2}
                                                    onPress={() => navigation.navigate("Filter")}>
                                                    <Text style={styles.continueButtonText}>Filter bearbeiten</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.editProfileButton2}
                                                    onPress={() => navigation.navigate("Invoices")}>
                                                    <Text style={styles.continueButtonText}>Rechnungen ansehen</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.editProfileButton2}
                                                    onPress={Logout}>
                                                    <Text style={styles.continueButtonText}>Logout</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{
                                                    alignContent: "center",
                                                    alignItems: "center",
                                                    alignSelf: "center",
                                                    justifyContent: "center",
                                                    width: "90%",
                                                    borderRadius: 10,
                                                    backgroundColor: 'red',
                                                    padding: "2.5%",
                                                    marginTop: "2.5%",
                                                }}
                                                    onPress={Delete}>
                                                    <Text style={styles.continueButtonText}>Profil löschen</Text>
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
                                                profilePicture={profilePicture}
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
                                                setProfilePicture={setProfilePicture}
                                            />
                                        </ScrollView>
                                    </View>
                                }
                            </View>
                        </LinearGradient>
                    </View>
                </KeyboardAvoidingView>
            </View>
            <BottomBar />
        </SafeAreaView>
    )
}

export default ProfileScreen;