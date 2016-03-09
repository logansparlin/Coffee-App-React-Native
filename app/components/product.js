import React, {
  View,
  Text,
  Image,
  Component,
  LayoutAnimation,
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
  }

  add=()=> {
    let {height} = this.state;

    LayoutAnimation.spring()
    this.setState({
      height: (height == 80) ? 0 : 80
    })
  };

  render() {
    let { ProductInformation, SkuInformation } = this.props.data;
    let url = "https://solutions.starbucks.com/img/Products/200/" + ProductInformation.ProductID + ".jpg";
    let SKU = SkuInformation[SkuInformation.length-1];
    return (
        <View>
        <View style={styles.row}>
          <Image source={{uri: url}} style={styles.productImage} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{ProductInformation.Name}</Text>
            <Text>SIZE {SKU.Value}</Text>
            <Text>SKU {SKU.SKUNumber}</Text>
            <Text>PACK {SKU.UOM}</Text>
          </View>
          <Button onPress={this.add}>Add</Button>
        </View>
        <View style={[styles.quantityContainer, {height: this.state.height}]}>
          <Quantity />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quantityContainer: {
    width: width,
    height: 0,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
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
  }
})
