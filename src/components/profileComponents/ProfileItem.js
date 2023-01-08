// @ts-nocheck
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../resources/Styles";
import SelectDropdown from 'react-native-select-dropdown'
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const ProfileItem = ({
    toggle,
    username,
    firstName,
    name,
    city,
    gender,
    email,
    street,
    houseNumber,
    plz,
    phoneNumber,
    profilePicture,
    price,
    searchedSkills,
    achievedSkills,
    onChangeFirstName,
    onChangeUsername,
    onChangeName,
    onChangePLZ,
    onChangeCity,
    onChangeHouseNumber,
    onChangeTelephoneNumber,
    onChangeStreet,
    onContinueButton,
    onChangePrice,
    onChangeEmail,
    onChangeGender,
    setProfilePicture
}) => {

    const genders = ["Weiblich", "Männlich", "Divers"]

    const [searchedSkillsToggle, setSearchedSkillsToggle] = React.useState(false)
    const [achievedSkillsToggle, setAchievedSkillsToggle] = React.useState(false)
    const [nameToggle, setNameToggle] = React.useState(true)

    const [pPicture, setPPicture] = React.useState("")

    let userSearchedSkills = []
    let userAchievedSkills = []

    useEffect(() => {
        EvaluateData()
    })

    async function uploadPicture() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
            quality: 0.3
        })
        if (!result.canceled) {
            setProfilePictureBase64(result.assets[0].base64)
        }
    }

    function setProfilePictureBase64(data) {
        let profilePictureString = data.slice()
        setProfilePicture(profilePictureString)
    }

    const GetImageSource = (source) => {
        return `data:image/jpeg;base64,${source}`
    }

    function EvaluateData() {
        if (searchedSkills != undefined && searchedSkills != "") {
            setSearchedSkillsToggle(true)
            /* searchedSkills.map((skill, index) => {
                 userAchievedSkills[index] = {
                     name: skill.name,
                     levelId: skill.SkillIdentifier
                 }
             })*/
        }
        if (achievedSkills != undefined && achievedSkills != "") {
            setAchievedSkillsToggle(true)
            /* achievedSkills.map((skill, index) => {
                 userAchievedSkills[index] = {
                     name: skill.name,
                     levelId: skill.SkillIdentifier
                 }
             })*/
        }
        if (firstName == "" && name == "") {
            setNameToggle(false)
        }
    }

    function renderSwitch(id) {
        switch (id) {
            case 1:
                return "Anfänger"
                break
            case 2:
                return "Fortgeschritten"
                break
            case 3:
                return "Experte"
                break
            default:
                return "Keine Angabe"
                break
        }
    }
    // Toggle 0: Edit Profile, Toggle 1: Show Profile, Toggle 2: Show profile of other user
    if (toggle === 1) {
        return (
            <View style={styles.containerProfileItem}>
                <Image style={{
                        width: "85%",
                        height: "40%",
                        resizeMode: "cover",
                        borderRadius: 20,
                        alignSelf: "center"
                    }}
                source={(profilePicture != null && profilePicture != "") ? { uri: GetImageSource(profilePicture) } : { uri: "https://cdn-icons-png.flaticon.com/512/3106/3106921.png" }} />
                {nameToggle ?
                    <View style={styles.profileDescription}>
                        <Text style={styles.descriptionProfileItem}>Willkommen,</Text>
                        <Text style={styles.name}>{firstName} {name}</Text>
                    </View>
                    :
                    <></>
                }
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Username:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {username}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Geschlecht:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {gender}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Adresse:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {street} {houseNumber}
                    </Text>
                    <Text style={styles.descriptionProfileItem}>
                        {plz} {city}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Telefonnummer:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {phoneNumber}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>E-Mail-Adresse:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {email}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Preis pro Stunde:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {price} €
                    </Text>
                </View>
            </View>
        );
    }
    if (toggle === 0) {
        return (
            <View style={styles.containerProfileItem}>
                <TouchableOpacity style={{

                }}
                    onPress={uploadPicture}>
                    <Text style={{
                        color: "blue",
                        textAlign: "center",
                        fontSize: 15,
                        marginBottom: "2%"
                    }}
                    >Lade dein Profilbild hoch</Text>
                </TouchableOpacity>
                <View style={{ width: "100%" }}>
                    <View style={{
                        marginVertical: "2.5%",
                        marginHorizontal: "7%"
                    }}>
                        <Text style={styles.titleProfileItem}>Vor- und Zuname:</Text>
                        <TextInput
                            onChangeText={onChangeFirstName}
                            value={firstName}
                            style={styles.registerInputTextInput2}
                            textContentType="givenName"
                            placeholder="Vorname"
                        />
                        <TextInput
                            onChangeText={onChangeName}
                            value={name}
                            style={styles.registerInputTextInput2}
                            textContentType="familyName"
                            placeholder="Nachname"
                        />
                    </View>
                    <View style={styles.profileDescription}>
                        <Text style={styles.titleProfileItem}>Username:</Text>
                        <TextInput
                            onChangeText={onChangeUsername}
                            value={username}
                            style={styles.registerInputTextInput2}
                            textContentType="username"
                            placeholder="Username"
                        />
                    </View>
                    <View style={styles.profileDescription}>
                        <Text style={styles.titleProfileItem}>Geschlecht:</Text>
                        <SelectDropdown
                            data={genders}
                            onSelect={(selectedItem, index) => {
                                onChangeGender(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            defaultButtonText={gender}
                        />
                    </View>
                    <View style={styles.profileDescription}>
                        <Text style={styles.titleProfileItem}>Adresse:</Text>
                        <View style={{ width: "100%" }}>
                            <View style={{ flexDirection: "row" }}>
                                <TextInput
                                    onChangeText={onChangeStreet}
                                    value={street}
                                    style={{
                                        flexWrap: "wrap-reverse",
                                        width: "75%",
                                        height: "68%",
                                        padding: "3%",
                                        backgroundColor: "#edebeb",
                                        marginVertical: "3.5%",
                                        borderRadius: 10,
                                        marginRight: "3%"
                                    }}
                                    textContentType="streetAddressLine1"
                                    placeholder="Straße"
                                />
                                <TextInput
                                    onChangeText={onChangeHouseNumber}
                                    value={houseNumber}
                                    style={{
                                        flexWrap: "wrap-reverse",
                                        width: "22%",
                                        height: "68%",
                                        padding: "3%",
                                        backgroundColor: "#edebeb",
                                        marginVertical: "3.5%",
                                        borderRadius: 10
                                    }}
                                    textContentType="streetAddressLine1"
                                    placeholder="Nr."
                                />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TextInput
                                    onChangeText={onChangePLZ}
                                    value={plz}
                                    style={{
                                        flexWrap: "wrap-reverse",
                                        width: "30%",
                                        height: "68%",
                                        padding: "3%",
                                        backgroundColor: "#edebeb",
                                        marginVertical: "3.5%",
                                        borderRadius: 10,
                                        marginRight: "3%"
                                    }}
                                    textContentType="postalCode"
                                    placeholder="PLZ"
                                />
                                <TextInput
                                    onChangeText={onChangeCity}
                                    value={city}
                                    style={{
                                        flexWrap: "wrap-reverse",
                                        width: "67%",
                                        height: "67%",
                                        padding: "2.5%",
                                        backgroundColor: "#edebeb",
                                        marginVertical: "3.5%",
                                        borderRadius: 10
                                    }}
                                    textContentType="addressCity"
                                    placeholder="Ort"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.profileDescription}>
                        <Text style={styles.titleProfileItem}>Telefonnummer:</Text>
                        <TextInput
                            onChangeText={onChangeTelephoneNumber}
                            value={phoneNumber}
                            style={styles.registerInputTextInput2}
                            textContentType="telephoneNumber"
                            placeholder="Handynummer"
                        />
                    </View>
                    <View style={styles.profileDescription}>
                        <Text style={styles.titleProfileItem}>E-Mail-Addresse:</Text>
                        <TextInput
                            onChangeText={onChangeEmail}
                            value={email}
                            style={styles.registerInputTextInput2}
                            textContentType="emailAddress"
                            placeholder="E-Mail-Adresse"
                        />
                    </View>
                    <View style={styles.profileDescription}>
                        <Text style={styles.titleProfileItem}>Preis pro Stunde: (in €)</Text>
                        <TextInput
                            onChangeText={onChangePrice}
                            value={price}
                            style={styles.registerInputTextInput2}
                            textContentType="none"
                            placeholder="€/h"
                        />
                    </View>
                    <TouchableOpacity style={{
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        width: "86%",
                        borderRadius: 10,
                        backgroundColor: 'blue',
                        padding: "3%",
                        marginTop: "3%"
                    }}
                        onPress={onContinueButton}>
                        <Text style={styles.continueButtonText}>Speichern</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    if (toggle === 2) {
        return (
            <View style={styles.containerProfileItem}>
                <View>
                    {/*<Image source={require("./../../assests/defaultPicture.jpg")} /> {/*how to change pb?*/}
                    {/*<Image source={{uri: GetImageSource(card.profilePictures)}}*/}
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.name}>{firstName} {name}</Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Username:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {username}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Geschlecht:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {gender}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Wohnort:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {plz}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Telefonnummer:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {phoneNumber}
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Preis pro Stunde:</Text>
                    <Text style={styles.descriptionProfileItem}>
                        {price} €
                    </Text>
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Gesuchte Skills:</Text>
                    {searchedSkillsToggle ? (
                        searchedSkills.map(skill =>
                            <Text style={styles.descriptionProfileItem}>
                                {skill.name} - Level: {renderSwitch(skill.SkillIdentifier)}
                            </Text>
                        )
                    )
                        : (
                            <Text style={styles.descriptionProfileItem}>
                                noch keine Skills vorhanden
                            </Text>
                        )
                    }
                </View>
                <View style={styles.profileDescription}>
                    <Text style={styles.titleProfileItem}>Erlernte Skills:</Text>
                    {achievedSkillsToggle ?
                        achievedSkills.map(skill =>
                            <Text style={styles.descriptionProfileItem}>
                                {skill.name} - Level: {renderSwitch(skill.SkillIdentifier)}
                            </Text>
                        )
                        :
                        <Text style={styles.descriptionProfileItem}>
                            noch keine Skills vorhanden
                        </Text>
                    }
                </View>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Fehler beim Laden des Profils...</Text>
            </View>
        );
    }
};

export default ProfileItem;