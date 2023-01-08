// @ts-nocheck
import React, {useEffect, useRef} from "react";
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {SelectList} from "react-native-dropdown-select-list/index";
import Swiper from "react-native-deck-swiper";
import BottomBar from "../components/Layout/BottomBar";
import {Dislike, Exploring, Like, Searching} from "../connectors/MatchingServiceConnector";
import Toast from "react-native-root-toast";
import {getUser} from "../resources/InternalStorage";

const ExploreScreen = ({navigation}) => {

    const [userId, setUserId] = React.useState("")
    const [profiles, setProfiles] = React.useState([]);
    const [userData, setUserData] = React.useState([]);

    const [peopleVorhanden, setPeopleVorhanden] = React.useState(false)

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
            StartSearch()
        })
    }, []);

    async function SetUser() {
        const user = (await getUser())
        setUserData(user)
        setUserId(user.id)
        return user.id
    }

    function StartSearch() {
        Exploring().then(r => {
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

    function noCard(){
        setPeopleVorhanden(false)
        setProfiles([])
    }

    return(
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            alignContent: "center"
        }}>
            <View style={{
                marginBottom: "1.5%",
                width: "100%"
            }}>
                <TouchableOpacity style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center"
                }} onPress={() => {
                    navigation.navigate("AGBs")
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
                                                        source={(card.profilePicture != null) ? {uri: GetImageSource(card.profilePicture)}:{uri: "https://cdn-icons-png.flaticon.com/512/3106/3106921.png"}}
                                                        onClick={() => navigation.navigate("OtherProfile", {
                                                            otherUserId: card.id
                                                        })}
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
                                        noCard()
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
                                Leider hat dich noch niemanden entdeckt...
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
                </View>
                <BottomBar />
            </LinearGradient>
        </SafeAreaView>
    )
}
export default ExploreScreen