import React from "react";
import { useNavigation } from "@react-navigation/core";

export default function HomeScreen () {

    const navigation = useNavigation();

    return (
        <View>
            <SwipeCard>

            </SwipeCard>
            <BottomButtons/>
        </View>
    )
}