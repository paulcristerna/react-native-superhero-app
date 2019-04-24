
'use strict'

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ListView, ImageBackground} from 'react-native';

class comicDetailView extends Component {
    constructor(props){ 
        super(props);
        this.passProps = this.props.route.passProps
        this.modified = this.passProps.comic.modified.slice(0,10);
        console.log("hola")
        console.log(this.passProps)
    }

    render(){
        return(
            <View style={StyleSheet.containter}>
                <Image source={{uri: this.passProps.comic.thumbnail.path+'.jpg'}}
                style={styles.image} />
                <Text style={styles.title}>{this.passProps.comic.name}</Text>
                <Text style={styles.description}>{this.passProps.comic.description}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containter: {
        marginTop: 63,
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 23,
        color: '#007AFF',
        textAlign: 'center',
        padding:10,
    },
    description: {
        padding: 10,
        fontSize: 15,
        textAlign: 'center',
    },
    image: {
        alignSelf: 'stretch',
        height: 300,
    }
})

module.exports = comicDetailView;