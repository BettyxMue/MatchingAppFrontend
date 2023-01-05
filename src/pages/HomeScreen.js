import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    Text
} from "react-native";
import React, {useEffect, useRef} from "react";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import Toast from "react-native-root-toast";
import {Dislike, GetSearchesByUser, Like, Searching} from "../connectors/MatchingServiceConnector";
import {SelectList} from "react-native-dropdown-select-list/index";
import {LinearGradient} from "expo-linear-gradient";
import {getUser} from "../resources/InternalStorage";
import BottomBar from "../components/layout/BottomBar";

const HomeScreen = ({navigation}) => {

    const [userId, setUserId] = React.useState("")
    const [profiles, setProfiles] = React.useState([]);
    const [userData, setUserData] = React.useState([]);
    const [searchId, setSearchId] = React.useState("")
    const [selectedFilter, setSelectedFilter] = React.useState("");
    const [filterCreated, setFilterCreated] = React.useState(false);
    const [filtersData, setFiltersData] = React.useState([]);
    let filterOptionData = [];

    const [peopleVorhanden, setPeopleVorhanden] = React.useState(false)
    const [filterChosen, setFilterChosen] = React.useState(false)

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

    useEffect(() => {
        SetUser().then(r => {
            GetFilterOptionData(r);
        })
    }, []);

    async function SetUser() {
        const user = (await getUser())
        setUserData(user)
        setUserId(user.id)
        return user.id
    }

    function GetFilterOptionData(id) {
        GetSearchesByUser(id).then(r => {
            r.forEach(i => {
                filterOptionData[i.searchid] = i.name;
            })
            setFiltersData(filterOptionData);
        })
        setFilterCreated(true);
    }

    function StartSearch() {
        let tempId
        filtersData.forEach(i => {
            if (i === selectedFilter) {
                setSearchId((filtersData.indexOf(i)))
                tempId = filtersData.indexOf(i)
            }
        })

        if (tempId == undefined) {
            showErrorMessage("Etwas ging schief. Bitte wähle den Filter erneut aus!")
        }

        Searching(tempId).then(r => {
            let tempArray = []
            console.log(r)
            r.forEach((possibleUser, index) => {
                tempArray[index] = {
                    id: possibleUser.id,
                    name: possibleUser.name,
                    firstName: possibleUser.firstName,
                    //city: possibleUser.city.place,
                    gender: switchGender(possibleUser.gender),
                    //picture: i.profilePictures
                }
            })
            setProfiles(tempArray)
            if (r !== undefined) {
                setPeopleVorhanden(true)
            }
        })
    }

    function switchGender(gender) {
        switch (gender) {
            case 0:
                return "Keine Angabe"
                break
            case 1:
                return "Männlich"
                break
            case 2:
                return "Weiblich"
                break
            case 3:
                return "Divers"
                break
        }
    }

    const swipeRef = useRef(null);

    const swipeLeft = async (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const userSwipedId = profiles[cardIndex].id;
        Dislike(userId, userSwipedId).then(r => {
            console.log(r)
            if (typeof r !== 'object') {
                showErrorMessage("Something went wrong with the Dislike!");
                return;
            }
        })
    };

    const swipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;
        const userSwipedId = profiles[cardIndex].id;
        Like(userId, userSwipedId).then(r => {
            console.log(r)
            navigation.navigate("Match", {
                userId: userId,
                userSwipedId: userSwipedId
            });
        })
    };

    const GetImageSource = (source) => {
        return `data:image/jpeg;base64,${source}`
    }

    return (
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            alignContent: "center"
        }}>
            <View style={{
                marginBottom: "1%",
                width: "100%"
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
                    <Ionicons name="search-circle" size={35} color="#3860ff"/>
                </TouchableOpacity>
            </View>
            <LinearGradient colors={['#3860ff', '#389bff']}>
                <View
                    style={{
                        width: "100%",
                        height: "90%"
                    }}>
                    {(filterCreated && filterChosen) ? (
                        <>
                            <View>
                                <SelectList
                                    setSelected={(val) => {
                                        setSelectedFilter(val)
                                        setFilterChosen(true)
                                        StartSearch()
                                    }}
                                    data={filtersData}
                                    save="value"
                                    boxStyles={{
                                        backgroundColor: "#edebeb"
                                    }}
                                    dropdownStyles={{
                                        backgroundColor: "#edebeb"
                                    }}
                                />
                            </View>
                            {peopleVorhanden ?
                                <View>
                                    <Swiper
                                        containerStyle={{
                                            backgroundColor: "transparent"
                                        }}
                                        cards={profiles}
                                        stackSize={5}
                                        cardIndex={0}
                                        animateCardOpacity
                                        verticalSwipe={false}
                                        ref={swipeRef}
                                        onSwipedLeft={(cardIndex) => {
                                            swipeLeft(cardIndex);
                                        }}
                                        onSwipedRight={(cardIndex) => {
                                            swipeRight(cardIndex);
                                        }}
                                        backgroundColor={"#ffffff"}
                                        overlayLabels={{
                                            left: {
                                                title: "DISLIKE",
                                                style: {
                                                    label: {
                                                        textAlign: "center",
                                                        color: "red",
                                                    },
                                                },
                                            },
                                            right: {
                                                title: "LIKE",
                                                style: {
                                                    label: {
                                                        color: "green",
                                                        textAlign: "center",
                                                    },
                                                },
                                            },
                                        }}
                                        renderCard={(card) =>
                                            card ? (
                                                <View
                                                    key={card.id}
                                                    style={{
                                                        backgroundColor: "#ffffff",
                                                        borderRadius: 20,
                                                        marginTop: -30,
                                                        height: "60%",
                                                        width: "100%",
                                                        shadowColor: "#000",
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 1
                                                        },
                                                        shadowOpacity: 0.2,
                                                        shadowRadius: 1.41,
                                                        elevation: 2
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "cover",
                                                            height: "75%",
                                                            width: "95%",
                                                            borderRadius: 20,
                                                            margin: 10
                                                        }}
                                                        source={require("./../../assets/defaultPicture.jpg")}
                                                        //source={{uri: GetImageSource(card.profilePictures)}}
                                                    />
                                                    <View>
                                                        <View style={{
                                                            marginLeft: 15
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 30,
                                                                fontWeight: "bold"
                                                            }}>
                                                                {card.firstName} {card.name}
                                                            </Text>
                                                            <Text style={{
                                                                fontSize: 20,
                                                                paddingTop: 8
                                                            }}>
                                                                {card.gender} {/*+ ", " + {card.city}*/}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ) : (
                                                setFilterChosen(false)
                                            )
                                        }
                                    />
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        marginTop: 520
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => swipeRef.current.swipeLeft()}
                                            style={{
                                                alignItems: "center",
                                                backgroundColor: "#FFFFFF",
                                                borderRadius: 100,
                                                padding: 3
                                            }}
                                        >
                                            <Entypo name="cross" size={60} color="red"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => swipeRef.current.swipeRight()}
                                            style={{
                                                alignItems: "center",
                                                backgroundColor: "#FFFFFF",
                                                borderRadius: 100,
                                                padding: 3
                                            }}
                                        >
                                            <AntDesign name="check" size={60} color="green"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View>
                                    <Text style={{
                                        fontSize: 30,
                                        fontStyle: "italic",
                                        marginTop: 230,
                                        marginHorizontal: 20,
                                        color: "#FFFFFF",
                                        textAlign: "center"
                                    }}>
                                        Wir konnten leider keine passenden Leute
                                        finden...
                                    </Text>
                                    <Image
                                        style={{
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            marginTop: 20
                                        }}
                                        height={75}
                                        width={75}
                                        source={{uri: "https://links.papareact.com/6gb"}}
                                    />
                                </View>
                            }
                        </>
                    ) : (
                        <>
                            {filterCreated ?
                                <View>
                                    <SelectList
                                        setSelected={(val) => {
                                            StartSearch(val)
                                            setFilterChosen(true)
                                        }}
                                        data={filtersData}
                                        save="value"
                                        boxStyles={{
                                            backgroundColor: "#edebeb"
                                        }}
                                        dropdownStyles={{
                                            backgroundColor: "#edebeb"
                                        }}
                                    />
                                </View>
                                :
                                <View>
                                    <SelectList
                                        setSelected={() => navigation.navigate("Profile")}
                                        data={[
                                            {key: 1, value: "Bitte erstelle im Profil einen Filter!"}
                                        ]}
                                        save="value"
                                    />
                                </View>
                            }
                            <View>
                                <Text style={{
                                    fontSize: 30,
                                    fontStyle: "italic",
                                    marginVertical: 250,
                                    marginHorizontal: 20,
                                    color: "#FFFFFF",
                                    textAlign: "center"
                                }}>
                                    Bitte wähle oder erstelle einen Filter, um die Suche zu starten!</Text>
                            </View>
                        </>
                    )}
                </View>
                <BottomBar navigation={navigation}/>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default HomeScreen;