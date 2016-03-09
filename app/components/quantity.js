import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import colors from '../colors'

export default class Quantity extends Component {

  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
  }

  increment=()=> {
    let {quantity} = this.state;
    this.setState({
      quantity: quantity + 1
    })
  };

  decrement=()=> {
    let {quantity} = this.state;
    if(quantity >= 1) {
      this.setState({
        quantity: quantity - 1
      })
    }
  };

  render() {
    return (
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={this.increment}
          style={styles.quantityPlus}>
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
        <View style={styles.quantity}>
          <Text>{this.state.quantity}</Text>
        </View>
        <TouchableOpacity
          onPress={this.decrement}
          style={styles.quantityMinus}>
            <Text style={styles.icon}>-</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quantityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityPlus: {
    width: 35,
    height:20,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityMinus: {
    width: 35,
    height:20,
    backgroundColor: colors.darkGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantity: {
    paddingTop: 5,
    paddingBottom: 3,
    width: 35,
    borderWidth: 1,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
