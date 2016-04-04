'use strict';
import React, {
  StatusBar,
  Component,
  StyleSheet,
  LayoutAnimation,
  Animated,
  Easing,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Image
} from 'react-native'
import Button from 'react-native-button'
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import Dimensions from 'Dimensions'
import colors from './colors'
import { CloseIcon } from './components/elements'
import AccountPicker from './components/AccountPicker'
import SBXText from './components/common/SBXText'
import GiftedSpinner from 'react-native-gifted-spinner'

let {height, width} = Dimensions.get('window');

class Home extends Component {

  constructor(props) {
    super(props)
    this._animatedHeight = new Animated.Value(60)
    this._animatedOpacity = new Animated.Value(0)
    this.opacityOut = new Animated.Value(1)
    this.state = {
      loginActive: false,
      processing: false
    }
    this.login = this.login.bind(this)
  }

  login() {
    this.setState({ processing: true })
    setTimeout(() => {
      Actions.tabbar()
    }, 1500)
  }

  openLogin=()=> {
    this.setState({
      loginActive: true
    });
    Animated.parallel([
      Animated.timing( this._animatedOpacity, {
        toValue: 1,
        easing: Easing.easeIn,
        duration: 350
      }),
      Animated.timing( this.opacityOut, {
        toValue: 0,
        easing: Easing.easeIn,
        duration: 250
      }),
      Animated.timing( this._animatedHeight, {
          toValue: height,
          easing: Easing.bezier(1, 0, 0.45, 1),
          duration: 350
      })
    ]).start()
  };

  closeLogin=()=> {
    this.setState({
      loginActive: false
    });
    Animated.parallel([
      Animated.timing( this._animatedOpacity, {
        toValue: 0,
        easing: Easing.easeIn,
        duration: 250,
      }),
      Animated.timing( this.opacityOut, {
        toValue: 1,
        easing: Easing.easeIn,
        duration: 350,
        delay: 250
      }),
      Animated.timing( this._animatedHeight, {
          toValue: 60,
          easing: Easing.bezier(1, 0, 0.45, 1),
          duration: 350
      })
    ]).start()
  };

  render() {
    return (
      <Image source={require('../img/SBX_HOME.png')} style={styles.container}>
        <StatusBar barStyle={'light-content'} hidden={this.state.loginActive} animated={true} />
        <Animated.View style={[styles.logoContainer, {opacity: this.opacityOut}]}>
          <Image style={styles.logo} source={require('../img/sbx_logo.png')} />
          <View style={styles.divider} />
          <Text style={styles.welcome}>
            Branded Solutions
          </Text>
        </Animated.View>
        <Animated.View style={[styles.buttonContainer, {height: this._animatedHeight}]}>
            <TouchableOpacity activeOpacity={1} style={[styles.buttonContainer, {height: this._animatedHeight}]} onPress={this.openLogin}>
              <Animated.Text style={[styles.login, {opacity: this.opacityOut}]}>LOGIN</Animated.Text>
              <Animated.View style={[login.modal, {opacity: this._animatedOpacity}]}>
                <CloseIcon style={styles.closeIcon} onPress={this.closeLogin}/>
                <View>

                  {/*
                  <View style={login.inputContainer}>
                    <TextInput
                      style={login.textInput}
                      placeholder='Email'
                      autoCapitalize='none'
                      autocorrect={false}
                      returnKeyType='done'
                      placeholderTextColor='white'
                      keyboardType='email-address' />
                  </View>
                  <View style={login.inputContainer}>
                    <TextInput
                      style={login.textInput}
                      placeholder='Password'
                      autoCapitalize='none'
                      autocorrect={false}
                      returnKeyType='done'
                      placeholderTextColor='white'
                      secureTextEntry={true} />
                  </View>
                  */}
                  <AccountPicker />
                  <View>
                    <Button
                      containerStyle={login.button}
                      onPress={this.login}
                      activeOpacity={0.8}
                      style={login.buttonText}>
                        <SBXText style={login.buttonText}>LOGIN</SBXText>
                        <View style={[login.loader, (this.state.processing) ? {opacity: 1} : {}]}>
                          <GiftedSpinner />
                        </View>
                    </Button>
                  </View>
                </View>
              </Animated.View>
            </TouchableOpacity>
        </Animated.View>
      </Image>
    );
  }
}

const login = StyleSheet.create({
  modal: {
    position: 'absolute',
    opacity: 1,
    width: width,
    height: height,
    top: 0,
    left: 0,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greenAlpha(0.5)
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    marginBottom: 10
  },
  textInput: {
    height: 50,
    width: width * 0.75,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Avenir',
    fontWeight: '600',
    letterSpacing: 1.5,
    color: 'white'
  },
  button: {
    width: width * 0.75,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontWeight: '800',
    letterSpacing: 2,
    paddingLeft: 20,
    color: colors.greenSecondary,
    backgroundColor: 'transparent'
  },
  loader: {
    width: 10,
    paddingLeft: 20,
    opacity: 0
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGrey,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    top: -50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    width: 1,
    height: 60,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white'
  },
  logo: {
    width: 75,
    height: 75,
    marginRight: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    width: width,
    height: 60,
    backgroundColor: colors.greenAlpha(0.3),
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
    color: 'white',
    fontFamily: 'avenir',
    fontWeight: 'bold',
    letterSpacing: 1
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20
  }
});

export default connect()(Home);
