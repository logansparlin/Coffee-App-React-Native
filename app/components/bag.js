import React, {
  StyleSheet,
  Dimensions,
  Component,
  ListView,
  Image,
  View,
  Text
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class Bag extends Component {
  constructor(props) {
    super(props)

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      products: this.ds.cloneWithRows(this.props.products)
    }
  }

  renderRow(product) {
    let url = "https://solutions.starbucks.com/img/Products/200/" + product.id + ".jpg";
    return (
      <View style={styles.row}>
        <Image source={{uri: url}} style={styles.productImage} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.infoText}>SIZE {product.SKU.value}</Text>
          <Text style={styles.infoText}>SKU {product.SKU.number}</Text>
          <Text style={styles.infoText}>PACK {product.SKU.UOM}</Text>
        </View>
        <Text style={styles.quantityContainer}>{product.quantity}</Text>
      </View>
    )
  }

  render() {
    let {products} = this.props;

    if(products.length <= 0) {
      return (
        <View style={styles.container}>
          <Text>No Items in Bag</Text>
        </View>
      )
    }
    return (
      <ListView
        dataSource={this.state.products}
        style={styles.container}
        initialListSize={10}
        pageSize={10}
        renderRow={this.renderRow.bind(this)}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginBottom: 50,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: 'white'
  },
  quantityContainer: {
    flex: 1,
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
  },
  infoText: {
    fontSize: 10,
    fontFamily: "Avenir"
  }
})
