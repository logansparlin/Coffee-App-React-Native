import colors from '../colors'
import SBXText from '../components/common/SBXText'
import {Actions} from 'react-native-router-flux'
import { placeOrder } from '../actions'
import { connect } from 'react-redux'
import React, {
  Component,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from 'react-native'

let { width, height } = Dimensions.get('window')

class OrderComplete extends Component {
  constructor(props) {
    super(props)
    this.goToOrders = this.goToOrders.bind(this)
  }

  goToOrders() {
    Actions.tabbar()
    this.props.placeOrder(this.props.products)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'default'} />
        <SBXText style={styles.header}>Thank You.</SBXText>
        <SBXText style={styles.orderNumber}>Your order number is: 106538</SBXText>
        <SBXText style={styles.paragraph}>If you have a question about your order status or wish to track your order, please contact Starbucks customer service at 1-800-344-1575, option 2. If you ordered marketing materials, they will be shipped to you separately.</SBXText>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.goToOrders} activeOpacity={0.9} style={styles.button}>
            <SBXText style={styles.buttonText}>GO BACK</SBXText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    placeOrder: (products) => {
      dispatch(placeOrder(products))
    }
  }
}

export default connect(null, mapDispatchToProps)(OrderComplete)

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: '800',
    padding: 10
  },
  orderNumber: {
    fontWeight: '600',
    fontSize: 16
  },
  paragraph: {
    padding: 5,
    fontSize: 14,
    color: '#666'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  button: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: width - 40,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
    letterSpacing: 1
  }
})
