import React, {View, Text, Component, Dimensions, StyleSheet} from 'react-native'
import ParallaxScroll from '../components/common/ParallaxScroll'
let {width, height} = Dimensions.get('window')

export default class Orders extends Component {
  render() {
    return (
      <ParallaxScroll title="ORDERS">
        <View style={styles.container}>
          <Text>Orders</Text>
        </View>
      </ParallaxScroll>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
