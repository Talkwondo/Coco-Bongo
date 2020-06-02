/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SocialIcon, Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {connect} from 'react-redux';
import {fetchMovies, loginCredentials} from '../Actions/Action';
import Card from './Card';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';

Icon.loadFont();
GoogleSignin.configure({
  webClientId:
    '720888782960-flar9mb2qeu6k1aecsv96bcr14pp7i4t.apps.googleusercontent.com',
});

const {width} = Dimensions.get('window');

const mapStateToProps = (state) => {
  return {
    movies: state.showMovies.movies,
    error: state.showMovies.error,
    loading: state.showMovies.loading,
    name: state.userInfo.name,
    photo: state.userInfo.photo,
    auth: state.userInfo.auth,
    moviePage: state.showMovies.moviePage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCountires: () => dispatch(fetchMovies()),
    onLoggedIn: (cred) => dispatch(loginCredentials(cred)),
  };
};

const facebookButton = async (props, setLoading) => {
  setLoading(true);
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  if (result.isCancelled) {
    setLoading(false);
  } else {
    const data = await AccessToken.getCurrentAccessToken();
    const responseInfoCallback = (error, res) => {
      if (error) {
        console.log('Error fetching data: ' + error.toString());
      } else {
        props.onLoggedIn([res.first_name, res.picture.data.url]);
      }
    };
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: data.accessToken,
        parameters: {
          fields: {
            string: 'email,first_name,picture.type(large)',
          },
        },
      },
      responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
    setLoading(false);
  }
};

const googleButton = async (props, setLoading) => {
  setLoading(true);
  try {
    const data = await GoogleSignin.signIn();
    props.onLoggedIn([data.user.givenName, data.user.photo]);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};
const textButton = (props) => {
  return !props.auth ? (
    <Text style={styles.h2}>Log in to continue</Text>
  ) : (
    <Button
      style={{marginTop: 30, fontFamily: 'Poppins-Medium'}}
      title="Click to fetch Movies!"
      buttonStyle={{backgroundColor: '#ffd700'}}
      titleStyle={{
        color: 'black',
        fontSize: 20,
      }}
      onPress={props.onFetchCountires}
    />
  );
};
const image = (props) => {
  if (!props.auth) {
    return (
      <Avatar
        size="xlarge"
        rounded
        overlayContainerStyle={{backgroundColor: 'grey'}}
        icon={{name: 'user', type: 'font-awesome'}}
      />
    );
  } else {
    return (
      <Avatar
        size="xlarge"
        rounded
        overlayContainerStyle={{backgroundColor: 'grey'}}
        source={{uri: props.photo}}
      />
    );
  }
};

const loadingFunc = (loadingState) => {
  return loadingState ? <ActivityIndicator size="large" /> : <View />;
};

const login = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  if (!props.moviePage) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.center}>
            <Text style={styles.h1}>{props.name}</Text>
            <View style={styles.avatar}>{image(props)}</View>
            {textButton(props)}
            {loadingFunc(loading)}
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => facebookButton(props, setLoading)}>
              <SocialIcon
                style={styles.button}
                title="Login With Facebook"
                type="facebook"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => googleButton(props, setLoading)}>
              <SocialIcon
                style={styles.button}
                title="Login With Google"
                type="google"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  } else {
    const renderItem = ({item}) => (
      <Card
        movie={item.title}
        img={`http://image.tmdb.org/t/p/w185${item.poster_path}`}
        popularity={item.popularity}
        release_date={item.release_date}
        nav={() => props.navigation.navigate('info', {item})}
      />
    );
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <FlatList
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            data={props.movies.results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  button: {
    width: width * 0.45,
  },
  h1: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  h2: {
    margin: 20,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  avatar: {
    alignSelf: 'center',
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(login);
