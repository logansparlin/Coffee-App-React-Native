import React, { AppRegistry, Component, Navigator, StyleSheet, Text } from 'react-native'
import { Router, Route, Schema, Animations, TabBar } from 'react-native-router-flux'
import colors from './app/colors'
import Orders from './app/components/orders'
import Products from './app/containers/products'
import Home from './app/app'
import { Provider } from 'react-redux'
import configureStore from './app/store'
import { connect } from 'react-redux'

const store = configureStore()

function capitalize(str) {
  return str.toUpperCase()
}

connect()(Router);

class App extends Component {

  renderTitle(title) {
    return <Text style={styles.NavBarTitle}>{capitalize(this.props.title)}</Text>
  }

  render() {
    let loggedIn = false;
    return (
      <Provider store={store}>
        <Router
          navigationBarStyle={styles.NavBar}
          titleStyle={styles.NavBarTitle}
          barButtonIconStyle={styles.barButtonIcon}
          barButtonTextStyle={styles.barButtonText}
          renderTitle={this.renderTitle}
        >
          <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
          <Route name="home" title="Home" hideNavBar={true} type="replace">
            <Router>
              <Route name="login" title="Login" component={Home} />
            </Router>
          </Route>
          <Route name="products" initial={loggedIn} title="Products" component={Products} type="replace"/>
        </Router>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  NavBar: {
    backgroundColor: colors.green,
    borderWidth: 0
  },
  NavBarTitle: {
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16,
    marginTop: 12
  },
  barButtonIcon: {
    tintColor: colors.darkGreen
  },
  barButtonText: {
    color: colors.darkGreen
  }
})

AppRegistry.registerComponent('sbx_native', () => App);
