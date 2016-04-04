import colors from '../../colors'
import BagIcon from '../bagicon'
import React, {
  Component,
  Dimensions,
  StatusBar,
  StyleSheet,
  ScrollView,
  ListView,
  Animated,
  Image,
  Text,
  View
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class ParallaxScroll extends Component {
  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)
  }

  render() {

    var event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.scrollY
          }
        }
      }
    ])

    let interpolatedScale = this.scrollY.interpolate({
      inputRange: [-height, 0],
      outputRange: [3, 1],
      extrapolateRight: 'clamp',
      extrapolateLeft: 'extend'
    })

    let interpolatedHeight = this.scrollY.interpolate({
      inputRange: [-300, 0, 136],
      outputRange: [350, 200, 64],
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })

    let interpolatedOpacity = this.scrollY.interpolate({
      inputRange: [0, 140],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    let {backgroundImage} = this.props

    return (
      <View style={{flex: 1}}>
        <StatusBar
          animated={true}
          hidden={false}
          barStyle={this.props.statusBarStyle || 'light-content'}
          />
        <ScrollView onScroll={event} scrollEventThrottle={8} keyboardShouldPersistTaps={true} keyboardDismissMode="on-drag">
          {this.props.children}
        </ScrollView>
        <Animated.View style={[styles.imageContainer, {transform: [{scale: interpolatedScale}]}, {height: interpolatedHeight}]}>
          <Animated.Image style={[styles.headerImage, {opacity: interpolatedOpacity}]} source={backgroundImage}>
          </Animated.Image>
        </Animated.View>
        <View style={styles.stickyNav}>
          <Text style={styles.title}>{this.props.title || "TITLE"}</Text>
          {this.props.renderLeftIcon}
          {this.props.renderRightIcon}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    overflow: 'hidden',
    height: 200,
    opacity: 1,
    width: width,
    top: 0,
    left: 0,
    backgroundColor: colors.green
  },
  headerImage: {
    width: width,
    height: 400,
    position: 'absolute',
    top: -100,
    left: 0,
    opacity: 1
  },
  container: {
    backgroundColor: 'white',
    position: 'relative',
    marginTop: 200
  },
  loading: {
    marginTop: 74,
    alignItems: 'center'
  },
  text: {
    fontSize: 50,
    alignItems: 'center',
    textAlign: 'center'
  },
  stickyNav: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: width,
    height: 44,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    fontFamily: 'Avenir',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1.2,
    textAlign: 'center',
    color: 'white'
  }
})
