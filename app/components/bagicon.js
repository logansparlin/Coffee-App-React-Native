import React, {View, Text, Component, StyleSheet} from 'react-native'
import colors from '../colors'

export default class BagIcon extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        <View style={styles.handle}></View>
        <Text style={styles.quantity}>{this.props.quantity}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 25,
    height: 25,
    top: 35,
    left: 25,
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
    top: -7,
    left: 3.5,
    width: 18,
    height: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20
  }
})
