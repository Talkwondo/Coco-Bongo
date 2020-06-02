/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
const {width} = Dimensions.get('window');

const Card = (props) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={styles.bigText}>{props.movie}</Text>
        </View>
        <View style={styles.img}>
          <Avatar
            size="large"
            rounded
            source={{
              uri: props.img,
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text
            style={
              styles.smallText
            }>{`The popularity is ${props.popularity}`}</Text>
          <Text
            style={
              styles.smallText
            }>{`The release date is ${props.release_date}`}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button
            onPress={props.nav}
            buttonStyle={{backgroundColor: '#ffd700'}}
            titleStyle={{
              color: 'black',
              fontSize: 16,
            }}
            title="Click for info"
            accessibilityLabel="Learn more"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    borderBottomWidth: 1,
    margin: 20,
    borderColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  bigText: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  flag: {
    marginTop: 10,
    marginRight: 5,
  },
  smallText: {
    fontSize: 20,
    marginTop: 10,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    maxWidth: width * 0.6,
  },
});

export default Card;
