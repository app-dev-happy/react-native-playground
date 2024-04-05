/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
 
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Picker from 'react-native-picker-select';

interface NomineeDetails {
    id : number,
    age : string,
    firstName : string,
    lastName : string,
    gender : string,
    share : string,
}

const initialData : NomineeDetails = {
    id : 0,
    age : '',
    firstName : '',
    lastName : '',
    gender : '',
    share : '',
};

const Demo_ListOperations = ({ navigation }) => {
    return(
        <View>
            <NomineeDetails navigation={navigation}/>
        </View>
    );
};

export default Demo_ListOperations;

const NomineeDetails = ({navigation}) => {

    //variables
    const [nomineeList, setNomineeList] = useState([initialData]);
    const itemsCount = nomineeList.length;
    const [highlightError, setHighlightError] = useState(false);
    const [showShareError, setShowShareError] = useState(false);

    //functions
    const addNewNominee = () => {
        const newNomineeItem : NomineeDetails = {
            id: nomineeList.length,
            age: '',
            firstName: '',
            lastName: '',
            gender: '',
        };
        setNomineeList([...nomineeList, newNomineeItem]);
    };
    const deleteNominee = (indexToDelete : number) => {
        if(indexToDelete < itemsCount && itemsCount !== 1) {
            const spreadList = [...nomineeList];
            spreadList.splice(indexToDelete, 1);
            setNomineeList(spreadList);
        }
    };
    const handleChanges = (index: number, key: string, value: string) => {
        const updateDetails = [...nomineeList];
        updateDetails[index][key] = value;
        setNomineeList(updateDetails);
    };
    const navigateScreenTo = () => {
        const isAnyFieldEmpty = nomineeList.some( item => item.firstName.trim() === '' || item.lastName.trim() === '' || item.age.trim() === '' || item.gender.trim() === '');
        const totalShare = nomineeList.reduce((acc, item) => acc + Number(item.share), 0 );
        if(totalShare !== 100){
            setShowShareError(true);
        } else {
            setShowShareError(false);
        }
        if(isAnyFieldEmpty || totalShare !== 100){
            setHighlightError(true);
        } else {
            setHighlightError(false);
            navigation.navigate('DisplayList', { nomineeList });
        }
    };

    //views
    return(
        <ScrollView>
            {
                nomineeList.map((nominee, index) => (
                    <View key = {index} style = {styles.nomineeItem}>
                        <View style = {styles.header}>
                            <Text>Nominee number : {nominee.id}</Text>
                            <Text style = {styles.deleteBtn} onPress = {() => deleteNominee(index)}>Delete</Text>
                        </View>
                        <Text>First name = {nominee.firstName}</Text>
                        <TextInput 
                            returnKeyType="next"
                            placeholder="Enter first name" 
                            style = {nominee.firstName.trim() === '' && highlightError ? styles.inputError : styles.input}
                            onChangeText={(value) => 
                                {
                                    handleChanges(index, 'firstName', value);                                    
                                }
                            }/>
                        <Text>Last name = {nominee.lastName}</Text>
                        <TextInput 
                            returnKeyType="next"
                            placeholder="Enter last name" 
                            style = {nominee.lastName.trim() === '' && highlightError ? styles.inputError : styles.input} 
                            onChangeText={(value) => 
                                {
                                    handleChanges(index, 'lastName', value);
                                }
                            }/>
                        <Text>Age = {nominee.age}</Text>
                        <TextInput 
                            returnKeyType="next"
                            placeholder="Enter age" 
                            style = {nominee.age.trim() === '' && highlightError ? styles.inputError : styles.input}
                            onChangeText={(value) => 
                                {
                                    handleChanges(index, 'age', value);
                                }
                            } keyboardType="numeric"/>     
                        <Text>Gender :{nominee.gender}</Text>
                        <GenderDropdown 
                            selectedGender={(it : string) => 
                                {
                                    handleChanges(index, 'gender', it);
                                }
                            }/>
                        <Text>Share = {nominee.share}</Text>
                        <TextInput 
                            placeholder="Enter share (%)" 
                            style = {highlightError && showShareError ? styles.inputError : styles.input}
                            onChangeText={(value) => 
                                {
                                    handleChanges(index, 'share', value);
                                }
                            } 
                            keyboardType="numeric"
                            returnKeyType="next"
                            />
                    </View>
                ))
            }
            <Button title = "Add" onPress={ addNewNominee }/>
            <Button title = "Submit" onPress={ navigateScreenTo }/>
        </ScrollView>
    );
};

const GenderDropdown = ({selectedGender}) => {
    const dropdownOptionsList = [
        {
            label : 'Male',
            value : 'male',
        },
        {
            label : 'Female',
            value : 'female',
        },
        {
            label : 'It is confusing down there',
            value : 'welcome to bangkok',
        },
    ];
    const [gender, setGender] = useState<string>();
    return(
        <View style = { styles.input }>
            <Picker
                placeholder={{ label : 'Select gender', value : ''}}
                items={dropdownOptionsList}
                value={gender}
                onValueChange={(value, _) => 
                    {
                        setGender(value);
                        selectedGender(value);
                    }
                }
                useNativeAndroidPickerStyle = {true}
                fixAndroidTouchableBug = {false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    nomineeItem : {
        flexDirection : 'column',
        borderColor : 'blue',
        borderWidth : 1,
        borderRadius : 10,
        padding : 16,
        margin : 16,
    },
    input : {
        borderColor : 'blue',
        borderWidth : 1,
        borderRadius : 10,
        padding : 6,
    },
    inputError : {
        borderColor : 'red',
        borderWidth : 1,
        borderRadius : 10,
        padding : 6,
    },
    button : {
        margin : 16,
    },
    header : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    deleteBtn : {
        fontWeight : 'bold',
        color : 'white',
        backgroundColor : 'red',
        fontStyle : 'italic',
    },
});


export const Demo_DisplayListScreen = ({ route }) => {
    const { nomineeList } = route.params;
    console.log(route.params);
    console.log(nomineeList);
    return(
        <ScrollView>
            { nomineeList.map((item, index) => (
                <Text key={index}>Nominee Name : {item.firstName} {item.lastName} of Age {item.age} of gender '{item.gender}'</Text>
            ))}
        </ScrollView>
    );
};