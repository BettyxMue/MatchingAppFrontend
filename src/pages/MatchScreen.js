import React, {useState} from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from "@react-navigation/core";
import {useNavigation} from "@react-navigation/native";

const MatchScreen = () => {

    //const userId = {};    get userId from JWT?

    const navigation = useNavigation();
    const { params } = useRoute();
    const { userData, userSwiped } = params;

    /*const [matches, setMatches] = useState("");
    const [matched, setMatched] = useState("");
    const [search, setSearch] = useState("");

    let data = Searching(searchId, userId);
    setMatches(data);

    function getMatchedData(matchedId){
        let result = GetProfileById(matchedId);
        setMatched(result);
        useEffect(() => {
            const fetchData = async () => {
                const result = await axios(
                    'http://<localIp>:8080/profile/:' + userId,
                );
                setMatched(result.data);
            };

            fetchData();
        }, []);
    }*/

    return (
        <ImageBackground
            resizeMode="cover"
            //source={require("../images/Farbverlauf.png")}
        >
            <View>
                <View>
                    <Image
                        //source={require("Match Icon")}
                    />
                </View>
                <Text>
                    Du und {userSwiped.username} finden einander toll!
                </Text>
                <View>
                    <Image
                        source={{ uri: userData.picture }}
                    />
                    <Image
                        source={{ uri: userSwiped.picture }}
                    />
                </View>
                <TouchableOpacity>
                    <Text
                        onPress={() => {
                            navigation.goBack();
                            navigation.navigate("Chat", {
                                userSwiped
                            });
                        }}
                    >
                        Schicke doch gleich eine Nachricht!
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}
export default MatchScreen