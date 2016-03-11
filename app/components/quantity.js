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
    
    this.props.updateCart(this.props.id, (quantity + 1))
    this.setState({
      quantity: quantity + 1
    })
  };

  decrement=()=> {
    let {quantity} = this.state;
    if(quantity >= 1) {
      this.props.updateCart(this.props.id, (quantity - 1))
      this.setState({
        quantity: quantity - 1
      })
    }
  };

  render() {
    return (
      <View style={styles.quantityContainer}>
        <View style={styles.quantity}>
          <Text style={styles.quantityText}>{this.state.quantity}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={this.increment}
            style={styles.quantityPlus}>
              <Text style={styles.icon}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.decrement}
            style={styles.quantityMinus}>
              <Text style={styles.icon}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quantityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20
  },
  quantityPlus: {
    width: 40,
    height:40,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityMinus: {
    width: 40,
    height:40,
    backgroundColor: colors.darkGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantity: {
    paddingTop: 10,
    paddingBottom: 8,
    width: 35,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityText: {
    fontFamily: "Avenir",
    fontSize: 14
  }
})
