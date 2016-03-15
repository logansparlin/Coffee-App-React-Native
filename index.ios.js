import React, { AppRegistry, Component, Navigator, StyleSheet, Text, View, StatusBarIOS } from 'react-native'
import { Router, Route, Schema, Animations, TabBar } from 'react-native-router-flux'
import colors from './app/colors'
import Training from './app/containers/training'
import Orders from './app/containers/orders'
import Products from './app/containers/products'
import TabIcon from './app/components/tabicon'
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

  componentDidMount() {
    StatusBarIOS.setStyle('light-content')
  }

  render() {
    let loggedIn = true;

    return (
      <Provider store={store}>
        <Router
          navigationBarStyle={styles.NavBar}
          hideNavBar={true}
          titleStyle={styles.NavBarTitle}
          barButtonIconStyle={styles.barButtonIcon}
          barButtonTextStyle={styles.barButtonText}>

            <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
            <Schema name="tab" type="switch" icon={TabIcon} hideNavBar={true}/>
            <Route name="home" title="Home" hideNavBar={true}>
              <Router>
                <Route name="login" title="Login" component={Home} />
              </Router>
            </Route>

            <Route name="tabbar" initial={loggedIn} type="replace">
              <Router footer={TabBar} hideNavBar={true}>
                <Route name="products" title="Products" component={Products} schema="tab"/>
                <Route name="orders" title="Orders" component={Orders} schema="tab" />
                <Route name="training" title="Training" component={Training} schema="tab" />
              </Router>
            </Route>

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
