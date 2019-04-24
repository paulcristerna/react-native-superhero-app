
'use strict'

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Alert, ImageBackground} from 'react-native';


class loginView extends Component {
    render(){
        return (
            <ImageBackground source={{uri: 'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'}} style={styles.container}>
                <View>
                    <Text style={styles.title}>Super Hero</Text>
                    <TouchableHighlight onPress={(this.onLogin.bind(this))} style={styles.boton}>
                        <Text style={styles.textoBoton}>Login</Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        )
    }

    onLogin(){
        Alert.alert(
            'Acceso',
            'Te haz logeado en el sistema',
            [
                {
                    text: 'Aceptar',
                    onPress: this.aceptar.bind(this),
                },
                {
                    text:'Cancelar',
                    onPress: this.cancelar.bind(this),
                    style: 'cancel',
                },
            ]
        )
    }

    aceptar(){
        this.props.navigator.replace({
            title: 'Dashboard',
            name: 'Dashboard',
            passProps: {}
        })
    }

    cancelar(){
        console.log("Cancelar")
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: 500,
        height: 800,
        padding: 60
    },
    boton: {
        width: 300,
        height: 30,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    textoBoton: {
        color: 'white',
    },
    title: {
        marginTop: 30,
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
    }
})

module.exports = loginView;