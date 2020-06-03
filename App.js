import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Containers/Login';
import Info from './src/Containers/Info';
import {connect} from 'react-redux';
import {Icon, withBadge} from 'react-native-elements';
import {View} from 'react-native';
import {setModal} from './src/Actions/Action';

const Stack = createStackNavigator();
const mapStateToProps = (state) => {
  return {
    favorite: state.setFavorite.favorite,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setModal: () => dispatch(setModal(true)),
  };
};
const App = (props) => {
  let BadgedIcon = withBadge(props.favorite.length)(Icon);
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="info"
          component={Info}
          options={({navigation}) => ({
            headerRight: () => (
              <View style={{marginRight: 25}}>
                <BadgedIcon
                  type="font-awesome"
                  name="star"
                  color="#ffd700"
                  containerStyle={{position: 'absolute', top: 5, right: -5}}
                  onPress={props.setModal}
                />
              </View>
            ),
            headerBackTitleStyle: {
              color: '#ffd700',
            },
            headerTintColor: '#ffd700',
            headerTitleStyle: {color: '#ffd700'},
            title: 'Movie Info',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
