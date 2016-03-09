import React, {
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native'

export default class Orders extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Orders</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 50,
    alignItems: 'center',
    textAlign: 'center'
  }
})
