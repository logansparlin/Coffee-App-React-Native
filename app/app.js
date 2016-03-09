'use strict';
import React, {
  StatusBarIOS,
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

let {height, width} = Dimensions.get('window');

class Home extends Component {

  constructor(props) {
    super(props)
    // Set status bar to white
    StatusBarIOS.setStyle('light-content')
    LayoutAnimation.spring()
    this.state = {
      loginActive: false
    }
    this._animatedHeight = new Animated.Value(60);
  }

  login() {
    Actions.products()
  }

  openLogin=()=> {
    let currentHeight = this._animatedHeight._value;
    Animated.timing( this._animatedHeight, {
        toValue: (currentHeight == 60) ? height : 60,
        easing: Easing.bezier(1, 0, 0.45, 1),
        duration: 400
    }).start()
  };

  openLoginModal=()=> {
    StatusBarIOS.setHidden(true)
    LayoutAnimation.spring()
    this.setState({
      loginActive: true
    })
  };

  closeLoginModal=()=> {
    StatusBarIOS.setHidden(false)
    LayoutAnimation.spring()
    this.setState({
      loginActive: false
    })
  };

  render() {
    console.log(this._animatedHeight)
    return (
      <Image source={require('../img/home-bg.jpg')} style={styles.container}>
        <Image style={styles.logo} source={require('../img/sbx_logo.png')} />
        <Text style={styles.welcome}>
          BRANDED SOLUTIONS
        </Text>
        <Animated.View style={[styles.buttonContainer, {height: this._animatedHeight}]}>
            <TouchableOpacity style={[styles.buttonContainer, {height: this._animatedHeight}]} onPress={this.openLogin}>
              <Text style={styles.login}>LOGIN</Text>
              <View style={login.modal}>
                <CloseIcon style={styles.closeIcon}/>
                <View>
                  <TextInput
                    style={login.textInput}
                    placeholder="email"
                    placeholderTextColor='white'
                    keyboardType='email-address' />
                  <TextInput
                    style={login.textInput}
                    placeholder="password"
                    placeholderTextColor='white'
                    secureTextEntry={true} />
                  <Button
                    containerStyle={login.button}
                    onPress={this.login}
                    style={login.buttonText}>
                      LOGIN
                  </Button>
                </View>
              </View>
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
    opacity: 0,
    top: 0,
    left: 0,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green
  },
  active: {
    top: 0
  },
  inactive: {
    top: height
  },
  textInput: {
    height: 50,
    width: 250,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white'
  },
  button: {
    borderRadius: 10,
    width: 250,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    backgroundColor: colors.green
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'transparent'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
    width: width,
    height: height
  },
  logo: {
    width: 100,
    height: 100
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: 'white',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    width: width,
    height: 60,
    backgroundColor: colors.green,
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
