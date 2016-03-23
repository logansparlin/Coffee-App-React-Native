import React, {
  Component,
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import SBXHeader from '../components/common/SBXHeader'
import colors from '../colors'
import Bag from '../components/bag'
import {Actions} from 'react-native-router-flux'
import { getCartProducts } from '../reducers/index'
import { connect } from 'react-redux'

let {width, height} = Dimensions.get('window')

export default class BagContainer extends Component {

  constructor(props) {
    super(props)
  }

  closeBag() {
    Actions.pop()
  }

  render() {
    let {products, quantity} = this.props
    return (
      <View
        style={styles.container}>
          <SBXHeader
            title="CHECKOUT"
            closeIcon={true}
            />
          <StatusBar
            animated={true}
            barStyle="light-content"
            />
          <Bag products={products} />
          <TouchableOpacity onPress={this.closeBag} style={styles.bottomBar}>
            <View style={[styles.button, styles.edit]}>
              <Text style={styles.buttonText}>EDIT</Text>
            </View>
            <View style={[styles.button, styles.submit]}>
              <Text style={styles.buttonText}>SUBMIT ORDER</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: colors.greenSecondary
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
    products: getCartProducts(state),
    quantity: state.cart.quantity
  }
}

export default connect(mapStateToProps)(BagContainer)
