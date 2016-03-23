import React, {
  View,
  Text,
  Image,
  Component,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import colors from '../colors'
import Button from 'react-native-button'
import Quantity from './quantity'
import Dimensions from 'Dimensions'

let {height, width} = Dimensions.get('window');

export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      quantity: 0,
      rotation: new Animated.Value(0)
    }

    this.toggleQuantity = this.toggleQuantity.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
  }

  toggleQuantity() {
    let height = this.state.height
    this.setState({
      height: (height == 60) ? 0 : 60
    })

    Animated.timing(
      this.state.rotation,
      {
        toValue: (height == 60) ? 0 : 100,
        easing: Easing.easeInOut,
        duration: 150
      }
    ).start()

  }

  updateQuantity(quantity) {
    this.setState({
      quantity: quantity
    })
  }

  renderQuantity() {
    console.log(this.state.rotation._value)

    let interpolatedRotation = this.state.rotation.interpolate({
        inputRange: [0, 100],
        outputRange: ['0deg', '-45deg'],
        easing: Easing.easeInOut,
        duration: 150
    })

    if(this.state.quantity >= 1) {
      return (
        <View style={styles.quantityInfo}>
          <Text style={styles.qty}>QTY</Text>
          <Text style={styles.quantity}>{this.state.quantity}</Text>
          <Text style={styles.edit}>{(this.state.height == 60) ? 'SAVE' : 'EDIT'}</Text>
        </View>
      )
    } else {
      return (
        <Animated.View style={[styles.addIcon, {transform: [{rotate: interpolatedRotation}]}]}>
          <View style={styles.barOne} />
          <View style={styles.barTwo} />
        </Animated.View>
      )
    }
  }

  render() {
    let product = this.props.data;
    let url = "https://solutions.starbucks.com/img/Products/200/" + product.id + ".jpg";
    return (
      <View>
        <View style={styles.row}>
          <Image source={{uri: url}} style={styles.productImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.infoText}>SIZE {product.SKU.value}</Text>
            <Text style={styles.infoText}>SKU {product.SKU.number}</Text>
            <Text style={styles.infoText}>PACK {product.SKU.UOM}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.toggleQuantity}
            style={styles.rightContainer}>
            {this.renderQuantity()}
          </TouchableOpacity>
        </View>
        <Quantity
          height={this.state.height}
          updateCart={this.props.updateCart}
          updateQuantity={this.updateQuantity}
          id={product.id}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addIcon: {
    width: 30,
    height: 30,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barOne: {
    width: 14,
    height: 1,
    backgroundColor: '#999',
    position:'absolute',
    top: 14,
    left: 7
  },
  barTwo: {
    width: 1,
    height: 14,
    backgroundColor: '#999',
    position: 'absolute',
    left: 13,
    top: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  infoContainer: {
    flex: 4,
    paddingLeft: 10
  },
  rightContainer: {
    width: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImage: {
    width: 60,
    height: 90
  },
  title: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
    paddingRight: 15
  },
  infoText: {
    fontSize: 10,
    fontFamily: "Avenir"
  },
  quantityInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'Avenir',
    fontWeight: '700',
    fontSize: 28,
    color: '#333'
  },
  qty: {
    fontFamily: 'Avenir',
    fontWeight: '900',
    fontSize: 10,
    color: '#333'
  },
  edit: {
    textDecorationLine: 'underline',
    fontFamily: 'Avenir',
    fontWeight: '900',
    fontSize: 12,
    color: '#999'
  }
})
