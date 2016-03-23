import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'
import colors from '../colors'

export default class Quantity extends Component {

  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      height: new Animated.Value(0)
    }
  }

  toggleQuantity(height) {
    console.log('being called')
    Animated.timing(
      this.state.height,
      {
        toValue: height,
        easing: (height == 60) ? Easing.elastic(1) : Easing.easeInOut,
        duration: (height == 60) ? 300 : 150
      }
    ).start()
  }

  componentWillReceiveProps(nextProps) {
    this.toggleQuantity(nextProps.height)
  }

  increment=()=> {
    let {quantity} = this.state;

    this.props.updateCart(this.props.id, (quantity + 1))
    this.props.updateQuantity(quantity + 1)
    this.setState({
      quantity: quantity + 1
    })
  };

  decrement=()=> {
    let {quantity} = this.state;
    if(quantity >= 1) {
      this.props.updateQuantity(quantity - 1)
      this.props.updateCart(this.props.id, (quantity - 1))
      this.setState({
        quantity: quantity - 1
      })
    }
  };

  render() {
    return (
      <Animated.View style={[styles.quantityContainer, {height: this.state.height}]}>
        <View style={styles.quantity}>
          <Text style={styles.quantityText}>{this.state.quantity}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.decrement}
          style={styles.quantityMinus}>
            <Text style={styles.icon}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.increment}
          style={styles.quantityPlus}>
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  quantityPlus: {
    flex: 1,
    height: 60,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityMinus: {
    flex: 1,
    height: 60,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontFamily: 'Avenir',
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  quantity: {
    height: 60,
    flex: 3,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityText: {
    fontFamily: "Avenir",
    fontSize: 28,
    color: '#444',
    fontWeight: '600'
  }
})
