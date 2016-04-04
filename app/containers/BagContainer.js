import React, {
  Component,
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import SBXHeader from '../components/common/SBXHeader'
import GiftedSpinner from 'react-native-gifted-spinner'
import colors from '../colors'
import Bag from '../components/bag'
import {Actions} from 'react-native-router-flux'
import { getCartProducts } from '../reducers/index'
import { connect } from 'react-redux'

let {width, height} = Dimensions.get('window')

export default class BagContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { processing: false }
    this.submitOrder = this.submitOrder.bind(this)
  }

  submitOrder() {
    this.setState({ processing: true })
    setTimeout(() => {
      Actions.ordercomplete()
    }, 1500)
  }

  closeBag() {
    Actions.pop()
  }

  render() {
    let {products, quantity, account} = this.props
    return (
      <View
        style={styles.container}>
          <StatusBar
            animated={true}
            barStyle="light-content"
            />
          <Bag account={account} products={products} />
          <View style={styles.bottomBar}>
            <TouchableOpacity activeOpacity={0.9} onPress={this.closeBag} style={[styles.button, styles.edit]}>
              <Text style={styles.buttonText}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.submitOrder} activeOpacity={0.9} style={[styles.button, styles.submit]}>
              <Text style={[styles.buttonText, styles.submitText]}>SUBMIT ORDER</Text>
              <View style={[styles.loader, (this.state.processing) ? {opacity: 1} : {}]}>
                <GiftedSpinner />
              </View>
            </TouchableOpacity>
          </View>
          <SBXHeader
            title="CHECKOUT"
            closeIcon={true}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white'
  },
  bottomBar: {
    position: 'absolute',
    width: width,
    height: 50,
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    flexDirection: 'row'
  },
  button: {
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  edit: {
    flex: 2,
    backgroundColor: '#222'
  },
  submit: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: colors.greenSecondary
  },
  submitText: {
    paddingLeft: 10
  },
  loader: {
    width: 10,
    paddingLeft: 20,
    opacity: 0
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1.2,
    color: 'white'
  }
})

function mapStateToProps(state) {
  return {
    account: state.products.account,
    products: getCartProducts(state),
    quantity: state.cart.quantity
  }
}

export default connect(mapStateToProps)(BagContainer)
