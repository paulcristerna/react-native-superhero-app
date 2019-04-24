/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Navigator} from 'react-native';
// import { StackNavigator } from 'react-navigation';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import { whileStatement } from '@babel/types';

var NavigatorBarRouteMapper = {
  LeftButton: function(route, navigator, index) {
    if(route.name == 'Login' || route.name == 'Dashboard') {
      return null;
    }
    return(
      <TouchableHighlight onPress={() => {
        if(index > 0) {
          navigator.pop();
        }
      }}>
        <Text style={{marginTop: 20, marginLeft: 20, textAlign: 'left', color: '#000'}}>
          Atras
        </Text>
      </TouchableHighlight>
    )
  },
  RightButton: function(route, navigator, index) {
    return null;
  },
  Title: function(route, navigatorm, index) {
    return null;
  }
}

const Login = require('./src/components/loginView')
const Dashboard = require('./src/components/dashboardView')
const Details = require('./src/components/comicDetailView');

type Props = {};
export default class App extends Component<Props> {

  renderScene(route, navigator) {
    switch(route.name) {
      case 'Login':
        return(
          <Login navigator={navigator} route={route}/>
        )
      case 'Dashboard':
        return(
          <Dashboard navigator={navigator} route={route}/>
        )
      case 'Details':
        return(
          <Details {...route.props} navigator={navigator} route={route}/>
        );
    }
  }

  render() {
    return (
      <NavigationExperimental.Navigator
        initialRoute={{name: 'Dashboard'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if(route.sceneConfig){
            return route.sceneConfig;
          }
          return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={
          <NavigationExperimental.Navigator.NavigationBar
          routeMapper={NavigatorBarRouteMapper} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  containerNavigator: {
      // flex: 1,
      // height: 500,
      // width: 500,
      // backgroundColor: 'white',
  },
})