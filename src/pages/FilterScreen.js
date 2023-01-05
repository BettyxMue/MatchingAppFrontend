import {KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useEffect} from 'react'
import {CreateSearch, DeleteSearch, GetSearchesByUser, UpdateSearch} from "../connectors/MatchingServiceConnector";
import Toast from "react-native-root-toast";
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import {Entypo} from "@expo/vector-icons";
import {styles} from "../resources/Styles";
import {GetAllSkills, getUserFromId, UpdateUserProfile} from "../connectors/ProfileServiceConnector";
import SelectDropdown from "react-native-select-dropdown";
import {getUser, storeUser} from "../resources/InternalStorage";
import BottomBar from "../components/layout/BottomBar";

const FilterScreen = ({navigation}) => {

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

    const [userId, setUserId] = React.useState("")
    const [userData, setUserData] = React.useState([])
    const [userName, onChangeUserName] = React.useState("")
    const [email, onChangeEmail] = React.useState("")
    const [city, onChangeCity] = React.useState("")
    const [plz, onChangePLZ] = React.useState("")
    const [street, onChangeStreet] = React.useState("")
    const [houseNumber, onChangeHouseNumber] = React.useState("")
    const [phoneNumber, onChangePhoneNumber] = React.useState("")
    const [firstName, onChangeFirstName] = React.useState("")
    const [nameOfUser, onChangeNameofUser] = React.useState("")
    const [genderOfUser, onChangeGenderofUser] = React.useState("")
    const [price, onChangePrice] = React.useState("")
    const [achievedSkills, onAchievedSkills] = React.useState([])
    const [searchedSkills, onSearchedSkills] = React.useState([])

    let filters = [];
    const [userFilters, setUserFilters] = React.useState([])
    const [possibleSkills, setPossibleSkills] = React.useState([])

    const [toggle, setToggle] = React.useState(false)
    const [addToggle, setAddToggle] = React.useState(false)
    //const [searchId, setSearchId] = React.useState("")

    const [newName, onChangeName] = React.useState("")
    const [newLevel, onChangeLevel] = React.useState("")
    const [newRadius, onChangeRadius] = React.useState("")
    const [newGender, onChangeGender] = React.useState("")

    const genders = ["Weiblich", "Männlich", "Divers", "Keine Präferenz"]
    const possibleLevels = ["Anfänger", "Fortgeschritten", "Experte"]

    let skills = []
    let allSkillsVar = []
    let allSkillsFiltered = []
    const [allSkills, setAllSkills] = React.useState([])

    useEffect(() => {
        SetUser().then(r => {
            GetUserFilters(r)
            GetUserData(r)
        })
        GetPossibleSkills()
    }, [])

    async function SetUser() {
        const user = (await getUser())
        setUserData(user)
        setUserId(user.id)
        return user.id
    }

    async function GetUserData(userId) {
        getUserFromId(userId).then(r => {
            onChangeUserName(r.username)
            onChangeFirstName(r.firstName)
            onChangeNameofUser(r.name)
            onChangeCity(r.city.place)
            onChangePLZ((r.city.plz).toString())
            onChangeGenderofUser(r.gender)
            onChangeEmail(r.email)
            onChangeHouseNumber(r.houseNumber)
            onChangePhoneNumber(r.telephoneNumber)
            onChangeStreet(r.street)
            onChangePrice((r.price).toString())
            onAchievedSkills(r.achievedSkills)
            onSearchedSkills(r.searchedSkills)
        })
    }

    async function GetUserFilters(userId) {
        GetSearchesByUser(userId).then(r => {
            r.map((filter, index) => {
                filters[index] = {
                    searchid: filter.searchid,
                    name: filter.name,
                    level: filter.level,
                    gender: filter.gender,
                    radius: (filter.radius).toString(),
                    skill: filter.skill,
                    created_by: filter.created_by
                }
            })
            setUserFilters(filters)
        })
    }

    async function GetPossibleSkills() {
        GetAllSkills().then(r => {
            r.map((skill, index) => {
                allSkillsVar[index] = {
                    id: skill.id,
                    name: skill.name,
                    skillIdentifier: skill.SkillIdentifier
                }
                skills[index] = skill.name
            })
            skills.forEach(skill => {
                if (!allSkillsFiltered.includes(skill)){
                    allSkillsFiltered.push(skill)
                }
            })
            setPossibleSkills(allSkillsFiltered)
            setAllSkills(allSkillsVar)
        })
    }

    async function CreateFilter(name, level, gender, radius, userId) {
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
            case "Keine Präferenz":
                genderNr = 4
                break
        }

        let newSkillLevelId
        switch (level) {
            case "Anfänger":
                newSkillLevelId = 1
                break
            case "Fortgeschritten":
                newSkillLevelId = 2
                break
            case "Experte":
                newSkillLevelId = 3
                break
        }

        let newSkillId
        allSkills.map(skill => {
            if (skill.name == name && skill.skillIdentifier == newSkillLevelId) {
                newSkillId = skill.id
            }
        })

        CreateSearch(name, newSkillId, level, genderNr, radius, userId).then(r => {
            console.log(r)
        })

        searchedSkills.push({id: newSkillId})

        UpdateUserProfile(genderOfUser, price, phoneNumber, firstName, nameOfUser,
            userName, email, city, plz, street, houseNumber,
            searchedSkills, achievedSkills).then(r => {
            console.log(r)
        })
        setAddToggle(false)
        GetUserFilters()
        storeUser(userData)
    }

    async function DeleteFilter(searchId, skillName, skillLevel) {
        DeleteSearch(searchId).then(r => {
            console.log(r)
        })

        let newSkillLevelId
        switch (skillLevel) {
            case "Anfänger":
                newSkillLevelId = 1
                break
            case "Fortgeschritten":
                newSkillLevelId = 2
                break
            case "Experte":
                newSkillLevelId = 3
                break
        }

        let skillId
        allSkills.map(skill => {
            if (skill.name == skillName && skill.skillIdentifier == newSkillLevelId) {
                skillId = skill.id
            }
        })

        let searched = []
        searchedSkills.map(skill => {
            if (skillId == skill.id) {
                searched = searchedSkills.filter(skill2 => skill2 !== skill)
            }
        })
        onSearchedSkills(searched)

        UpdateUserProfile(genderOfUser, price, phoneNumber, firstName, nameOfUser,
            userName, email, city, plz, street, houseNumber, searched, achievedSkills).then(r => {
            console.log(r)
        })

        showErrorMessage("Filter erfolgreich gelöscht!")
        GetUserFilters()
        storeUser(userData)
    }

    async function UpdateFilter(searchId, name, level, gender, radius) {
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
            case "Keine Präferenz":
                genderNr = 4
                break
        }

        let newSkillLevelId
        switch (level) {
            case "Anfänger":
                newSkillLevelId = 1
                break
            case "Fortgeschritten":
                newSkillLevelId = 2
                break
            case "Experte":
                newSkillLevelId = 3
                break
        }

        let newSkillId
        allSkills.map(skill => {
            if (skill.name == name && skill.skillIdentifier == newSkillLevelId) {
                newSkillId = skill.id
            }
        })

        let newSkill
        searchedSkills.map(skill => {
            if (name == skill.name) {
                const index = searchedSkills.indexOf(skill)
                newSkill = {
                    id: newSkillId
                }
                searchedSkills[index] = newSkill
            }
        })

        UpdateSearch(searchId, name, newSkillId, level, genderNr, radius).then(r => {
            if (r.status !== '200') {
                showErrorMessage(r);
                return;
            }
        })

        searchedSkills.push(newSkillId)

        UpdateUserProfile(genderOfUser, price, phoneNumber, firstName, nameOfUser,
            userName, email, city, plz, street, houseNumber, searchedSkills, achievedSkills).then(r => {
            console.log(r)
        })

        setToggle(false)
        GetSearchesByUser()
        storeUser(userData)
    }

    function renderSwitch(param) {
        switch (param) {
            case 1:
                return "Männlich"
                break
            case 2:
                return "Weiblich"
                break
            case 3:
                return "Divers"
                break
            case 4:
                return "Keine Präferenz"
                break
        }
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
                {userFilters.map(filter => (
                    <Collapse key={filter.searchid} style={{borderBottomWidth: 1, borderTopWidth: 1}}>
                        <CollapseHeader style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#E6E6E6'
                        }}>
                                <View style={{width: '100%'}}>
                                    <Text>{filter.name}</Text>
                                </View>
                        </CollapseHeader>
                        <CollapseBody style={{
                            alignItems: 'left',
                            justifyContent: 'left',
                            flexDirection: 'row',
                            backgroundColor: '#EDEDED'
                        }}>
                            {toggle ?
                                <View style={{
                                    width: "100%",
                                    flexDirection: "row"
                                }}>
                                    <View style={{
                                        paddingLeft: 15
                                    }}>
                                        <Text style={styles.titleFilterItem}>Level:</Text>
                                        <SelectDropdown
                                            data={possibleLevels}
                                            onSelect={(selectedItem, index) => {
                                                onChangeLevel(selectedItem)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            defaultButtonText={filter.level}
                                        />
                                        <Text style={styles.titleFilterItem}>Geschlecht:</Text>
                                        <SelectDropdown
                                            data={genders}
                                            onSelect={(selectedItem, index) => {
                                                onChangeGender(selectedItem)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            defaultButtonText={renderSwitch(filter.gender)}
                                        />
                                        <Text style={styles.titleFilterItem}>Radius:</Text>
                                        <TextInput
                                            onChangeText={onChangeRadius}
                                            value={filter.radius}
                                            style={styles.registerInputTextInput5}
                                            textContentType="none"
                                        />
                                    </View>
                                    <TouchableOpacity style={{marginLeft: 135, marginTop: 5}}
                                        onPress={() => UpdateFilter(filter.searchid, newName, newLevel, newGender, newRadius)}>
                                        <Entypo name="check" size={30} color="green"/>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{flexDirection: "row"}}>
                                    <View style={{paddingLeft: 10, paddingTop: 5, paddingBottom: 5}}>
                                        <Text>Level: {filter.level}</Text>
                                        <Text>Gesuchtes Geschlecht: {renderSwitch(filter.gender)}</Text>
                                        <Text>Radius: {filter.radius} km</Text>
                                    </View>
                                    <View style={{paddingLeft: 55, paddingTop: 17, flexDirection: "row"}}>
                                        <TouchableOpacity onPress={() => setToggle(true)}>
                                            <Entypo name="pencil" size={30} color="grey"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => DeleteFilter(filter.searchid, filter.name, filter.level)}>
                                            <Entypo name="cross" size={30} color="red"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </CollapseBody>
                    </Collapse>
                ))}
                {addToggle ?
                    <View>
                        <Text style={styles.titleFilterItem}>Bezeichnung:</Text>
                        <SelectDropdown
                            data={possibleSkills}
                            onSelect={(selectedItem, index) => {
                                onChangeName(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            defaultButtonText={newName}
                        />
                        <Text style={styles.titleFilterItem}>Gesuchtes Level:</Text>
                        <SelectDropdown
                            data={possibleLevels}
                            onSelect={(selectedItem, index) => {
                                onChangeLevel(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            defaultButtonText={newLevel}
                        />
                        <Text style={styles.titleFilterItem}>Gesuchtes Geschlecht:</Text>
                        <SelectDropdown
                            data={genders}
                            onSelect={(selectedItem, index) => {
                                onChangeGender(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            defaultButtonText={renderSwitch(newGender)}
                        />
                        <Text style={styles.titleFilterItem}>Gesuchter Radius: (in km)</Text>
                        <TextInput
                            onChangeText={onChangeRadius}
                            value={newRadius}
                            style={styles.registerInputTextInput5}
                            textContentType="nickname"
                        />
                        <TouchableOpacity style={styles.editProfileButton}
                                          onPress={() => CreateFilter(newName, newLevel, newGender, newRadius, userId)}>
                            <Text style={styles.continueButtonText}>Speichern</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editProfileButton} onPress={() => setAddToggle(false)}>
                            <Text style={styles.continueButtonText}>Zurück</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{
                        marginTop: 10,
                        marginHorizontal: 5
                    }}>
                        <TouchableOpacity style={styles.saveProfileButton} onPress={() => setAddToggle(true)}>
                            <Text style={styles.buttonText}>Erstelle einen neuen Filter</Text>
                        </TouchableOpacity>
                    </View>
                }
                <BottomBar />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default FilterScreen