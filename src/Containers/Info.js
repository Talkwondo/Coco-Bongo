/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View, Text, Alert, FlatList} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {setFavorite, removeFavorite, setModal} from '../Actions/Action';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const {width, height} = Dimensions.get('window');

const mapDispatchToProps = (dispatch) => {
  return {
    setFavorite: (title) => dispatch(setFavorite(title)),
    onReduceFavorite: (title) => dispatch(removeFavorite(title)),
    setModal: () => dispatch(setModal(false)),
  };
};

const mapStateToProps = (state) => {
  return {
    favorite: state.setFavorite.favorite,
    modal: state.setModal.modal,
  };
};

const helperFavorite = (props, data) => {
  const index = props.favorite.findIndex(element => element === data.title);
  if (index === -1) {
    props.setFavorite(data.title);
  } else {
    Alert.alert('Movie is already in favorite');
  }

};

const removeButton = (props, data) => {
  const index = props.favorite.findIndex(element => element === data.title);
  if (index !== -1) {
    return <Button
    onPress={() => props.onReduceFavorite(data.title)}
    title="Remove from Favorite"
    buttonStyle={{backgroundColor: '#ff6961'}}
    titleStyle={{
      color: 'black',
      fontSize: 16,
  }}
  containerStyle={{marginTop: 20}}
  />;
  }
};
const Info = (props) => {
  console.log(props.modal)
  const data = props.route.params.item;
  return (
    <ImageBackground opacity={0.25} source={{uri: `http://image.tmdb.org/t/p/w185${data.backdrop_path}`}} style={styles.image}>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.bigText}>{data.title}</Text>
            <Text style={styles.smallText}>{data.release_date}</Text>
            <Button
            onPress={() => helperFavorite(props, data)}
            title="Add to Favorite"
            buttonStyle={{backgroundColor: '#ffd700'}}
            titleStyle={{
              color: 'black',
              fontSize: 16,
          }}
          containerStyle={{marginTop: 20}}
          />
          {removeButton(props,data)}
          <Modal
             isVisible={props.modal}
              >
                <View style={{flexDirection: 'column', height: height * 0.5}}>
                <FlatList
                  data={props.favorite}
                  keyExtractor={(item) => item}
                  renderItem={({item}) => (
                    <Text style={{color: 'white', fontSize: 30, fontFamily: 'Poppins-Bold', textAlign: 'center'}}>{item}</Text>
                  )}
                />
                <Button
                  buttonStyle={{backgroundColor: '#ffd700'}}
                  titleStyle={{
                  color: 'black',
                  fontSize: 20,
                  }}
                  title="Close"
                  onPress={props.setModal} />
                </View>
            </Modal>
          </View>
          <View style={styles.img}>
            <Avatar
                size="large"
                rounded
                source={{
                  uri: `http://image.tmdb.org/t/p/w185${data.poster_path}`,
                }}
              />
          </View>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.p}>{`Language: ${data.original_language}`}</Text>
          <Text style={styles.p}>Overview: <Text style={styles.overview}>{data.overview}</Text></Text>
          <Text style={styles.p}>{`Votes: ${data.vote_count}`}</Text>
          <Text style={styles.p}>{`Popularity: ${data.popularity}`}</Text>
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
  },
  paragraph: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  h1: {
    color: 'white',
    fontSize: 40,
  },
  h2: {
    color: 'white',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  overview: {
    fontFamily: 'Poppins-light',
    fontSize: 20,
  },
  p: {
    fontSize: 25,
    color: 'white',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
  bigText: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    maxWidth: width * 0.7,
  },
  smallText: {
    fontSize: 20,
    marginTop: 10,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

});
