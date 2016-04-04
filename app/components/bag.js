import SBXText from './common/SBXText'
import React, {
  StyleSheet,
  Dimensions,
  Component,
  ListView,
  ScrollView,
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
          <SBXText style={styles.title}>{product.name}</SBXText>
          <SBXText style={styles.infoText}>SIZE {product.SKU.value}</SBXText>
          <SBXText style={styles.infoText}>SKU {product.SKU.number}</SBXText>
          <SBXText style={styles.infoText}>PACK {product.SKU.UOM}</SBXText>
        </View>
        <View style={styles.quantityContainer}>
          <SBXText style={styles.quantityLabel}>QTY</SBXText>
          <SBXText style={styles.quantity}>{product.quantity}</SBXText>
        </View>
      </View>
    )
  }

  render() {
    let {products, account} = this.props;

    if(products.length <= 0) {
      return (
        <View style={styles.container}>
          <Text>No Items in Bag</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={styles.accountInfo}>
            <SBXText style={styles.shipTo}>Ship to:</SBXText>
            <SBXText style={styles.address}>{account.address}</SBXText>
            <SBXText style={styles.address}>{`${account.city}, ${account.state} ${account.postalCode}`}</SBXText>
          </View>
          <ListView
            dataSource={this.state.products}
            initialListSize={10}
            pageSize={10}
            renderRow={this.renderRow.bind(this)}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginBottom: 50,
    paddingBottom: 5,
    backgroundColor: 'white'
  },
  quantityContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  quantityLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#333'
  },
  quantity: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333'
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
  },
  accountInfo: {
    padding: 20,
    marginBottom: 5,
    backgroundColor: '#eee'
  },
  shipTo: {
    fontWeight: '800',
    fontSize: 16,
    paddingBottom: 10
  },
  address: {
    fontSize: 14,
    fontWeight: '600'
  }
})
