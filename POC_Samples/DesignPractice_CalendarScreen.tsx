/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable keyword-spacing */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-reanimated/lib/typescript/Animated";

/* eslint-disable prettier/prettier */
const DesignPractice_CalendarScreen = () => {
    return(
        <View>
            
        </View>
    );
};

const CustomHeader = () => {
    return(
        <View style = {styles.customHeader}>
            <Text>
                New Medication
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    customHeader : {
        flex : 1,
        height : 50,
        flexDirection : 'row',
        justifyContent : 'space-between',
    }
})

export default DesignPractice_CalendarScreen;