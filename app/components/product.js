import React, {
  View,
  Text,
  Image,
  Component,
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
      height: 0
    }

    this.toggleQuantity = this.toggleQuantity.bind(this)
  }

  toggleQuantity() {
    let height = this.state.height
    this.setState({
      height: (height == 60) ? 0 : 60
    })
  }

  render() {
    let product = this.props.data;
    let url = "https://solutions.starbucks.com/img/Products/200/" + product.id + ".jpg";
    return (
      <View>
        <View style={styles.row}>
          <Image source={{uri: url}} style={styles.productImage} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.infoText}>SIZE {product.SKU.value}</Text>
            <Text style={styles.infoText}>SKU {product.SKU.number}</Text>
            <Text style={styles.infoText}>PACK {product.SKU.UOM}</Text>
          </View>
          <TouchableOpacity onPress={this.toggleQuantity} style={styles.addIcon}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <Quantity height={this.state.height} updateCart={this.props.updateCart} id={product.id}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20
  },
  rightContainer: {
    flex: 4,
    paddingLeft: 10
  },
  productImage: {
    width: 60,
    height: 90
  },
  title: {
    fontFamily: "Avenir",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1
  },
  infoText: {
    fontSize: 10,
    fontFamily: "Avenir"
  }
})
