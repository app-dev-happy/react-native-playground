/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


const DemoComponent = () => {
    const planetName = 'Earth';
    const satelliteName = 'Moon';
    const [newPlanet, setNewPlanet] = useState('');
    const planetsList = getPlanetsList('Mercury','Venus','Earth');
    const addNewPlanet = (enteredPlanet : string) => {
        setNewPlanet(enteredPlanet);
    };
    return (
        <View style = {styles.screen}>
            <Text>If you can read this then you're from planet {planetName}</Text>
            <Text>{planetName}'s satellite name is {satelliteName}</Text>
            <Text>Our planets are {planetsList} {newPlanet}</Text>
            <TextInput style = {styles.inputPlanet} placeholder="Enter planet's name" placeholderTextColor="#aaaaaa" onChangeText={addNewPlanet} textAlign="center"></TextInput>
        </View>
    );
};

const getPlanetsList = (
    first : string,
    second : string,
    third : string,
) => {
    return first + ' ' + second + ' ' + third;
};

const styles = StyleSheet.create({
    screen : {
        padding : 16,
    },
    inputPlanet : {
        borderColor : '#151515',
        borderWidth : 1,
        borderRadius : 10,
    },
});

export default DemoComponent;
