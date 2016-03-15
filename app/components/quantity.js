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
  }

  increment=()=> {
    let {value} = this.props;
    let {id, updateCart} = this.props;

    updateCart(id, (value + 1))
  };

  decrement=()=> {
    let {value} = this.props;
    let {id, updateCart} = this.props;

    if(value >= 1) {
      updateCart(id, (value - 1))
    }
  };

  render() {
    return (
      <View style={styles.quantityContainer}>
        <View style={styles.quantity}>
          <Text style={styles.quantityText}>{this.props.value}</Text>
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
    backgroundColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityMinus: {
    width: 40,
    height:40,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: '#333',
    fontWeight: 'bold',
  },
  quantity: {
    paddingTop: 10,
    paddingBottom: 8,
    width: 35,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityText: {
    fontFamily: "Avenir",
    fontSize: 14
  }
})
