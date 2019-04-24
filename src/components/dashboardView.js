
'use strict'

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableHighlight, ListView, ImageBackground} from 'react-native';

var Crypto = require('crypto-js');

const ComicDetail = require('./comicDetailView');

const REQUEST_URL = "https://gateway.marvel.com:443/v1/public/characters"; 

class dashboardView extends Component {
    constructor(props) {
        super(props);
        this.timestamp = 1;
        this.public_key = '402f7ff9c8ef8b273094b811531e3c82';
        this.private_key = '46fdfbdb1a2aa27ecc942a24ce1cc6fe3b5a439a';
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        var hash = Crypto.MD5(this.timestamp + this.private_key + this.public_key);
        fetch(REQUEST_URL+'?ts='+this.timestamp+'&apikey='+this.public_key+'&hash='+hash)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.data.results),
                loaded: true
            })
        })
    }

    renderLoadingView(){
        return(
            <View style={styles.container}>
                <Text style={{marginTop:200}}>Cargando comics...</Text>
            </View>
        )
    }

    renderComic(comic) {
        return(
            <TouchableHighlight onPress={() => this.onComicPressed(comic)}>
                <ImageBackground source={{uri: comic.thumbnail.path+'.'+comic.thumbnail.extension}} style={styles.backgroundImage}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{comic.name}</Text>
                    </View>
                </ImageBackground>
                
            </TouchableHighlight>
        )
    }

    render() {
        if(!this.state.loaded){
            return this.renderLoadingView();
        }

        return(
            <ListView
            dataSource= {this.state.dataSource}
            renderRow={this.renderComic.bind(this)}
            style={styles.listView}
            />
        )
    }

    onComicPressed(comic) {
        this.props.navigator.push({
            name: 'Details',
            title: comic.name,
            passProps: {comic: comic}
        })
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 150
    },
    rightContainer: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        alignSelf: 'stretch',
        paddingTop: 30,
        height:150,
    },
    title: {
        fontSize: 27,
        marginTop: 8,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: 'rgba(52,52,52,0)',
    },
});

module.exports = dashboardView;