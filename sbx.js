import React, { AppRegistry, Component, Navigator, StyleSheet, Text, View, StatusBar } from 'react-native'
import { Router, Route, Schema, Animations, TabBar } from 'react-native-router-flux'
import colors from './app/colors'
import TrainingContainer from './app/containers/TrainingContainer'
import Orders from './app/containers/orders'
import Products from './app/containers/products'
import BagContainer from './app/containers/BagContainer'
import OrderComplete from './app/containers/OrderComplete'
import NewInvite from './app/components/NewInvite'
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

export default class SBX extends Component {

  render() {
    let loggedIn = false;
    Navigator.SceneConfigs.FloatFromBottom.gestures = null // Disable gesture on modals

    return (
      <Provider store={store}>
        <Router hideNavBar={true}>
            <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
            <Schema name="overlay" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
            <Schema name="tab" type="switch" icon={TabIcon} hideNavBar={true}/>
            <Route name="home" title="Home" hideNavBar={true}>
              <Router>
                <Route name="login" title="Login" component={Home} />
              </Router>
            </Route>
            <Route name="newinvite" type="push" component={NewInvite} wrapRouter={true} hideNavBar={true} schema="overlay" />
            <Route name="bagcontainer" type="push" component={BagContainer} wrapRouter={true} hideNavBar={true} schema="overlay" />
            <Route name="ordercomplete" type="jump" component={OrderComplete} wrapRouter={true} hideNavBar={true} schema="overlay" />
            <Route name="tabbar" initial={loggedIn} type="replace">
              <Router footer={TabBar} hideNavBar={true}>
                <Route name="products" title="Products" schema="tab" component={Products}/>
                <Route name="orders" title="Orders" component={Orders} schema="tab" />
                <Route name="training" title="Training" component={TrainingContainer} schema="tab" />
              </Router>
            </Route>
        </Router>
      </Provider>
    )
  }
}
