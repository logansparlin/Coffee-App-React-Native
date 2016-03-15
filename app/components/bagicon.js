import React, {View, Text, Component, StyleSheet, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import colors from '../colors'

export default class BagIcon extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  openBag() {
    Actions.bag()
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.openBag}
        style={[this.props.style, styles.container]}>
          <View style={styles.handle}></View>
          <Text style={styles.quantity}>{this.props.quantity}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 20,
    height: 20,
    bottom: 12,
    left: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: colors.green
  },
  handle: {
    position: 'absolute',
    top: -5,
    left: 2.5,
    width: 15,
    height: 17,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20
  }
})
