import React, {View, Text, Component, Image, Dimensions, StyleSheet} from 'react-native'
import ParallaxScroll from '../components/common/ParallaxScroll'
let {width, height} = Dimensions.get('window')

export default class Orders extends Component {
  render() {
    return (
      <ParallaxScroll
        backgroundImage={require("../../img/orders-bg.jpg")}
        title="ORDERS">
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.image} source={require('../../img/orders-view.jpg')} />
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
  },
  image: {
    width: width
  }
})
