import { connect } from 'react-redux'
import { fetchProductsIfNeeded, updateCart, getQuantity } from '../actions'
import Product from '../components/product'
import React, {
  View,
  Text,
  Component,
  StyleSheet,
  ListView,
  Animated,
  Image,
  ScrollView
} from 'react-native'

// Get screen dimensions
import Dimensions from 'Dimensions'
let {width, height} = Dimensions.get('window')

class Products extends Component {

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.products.items)
    }
  }

  componentDidMount() {
    this.props.getProducts()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.products.items)
    })
  }

  renderRow(data) {
    return <Product updateCart={this.props.updateCart} data={data} />
  }

  listHeader=()=> {
    return (
      <View style={styles.listHeader}>
      <Text>{this.props.cart.quantity}</Text>
      </View>
    )
  };

  render() {
    let {products} = this.props;
    let {items, isFetching} = products;
    if(isFetching) {
      return (
        <View style={styles.loading}>
          <Text>Loading</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
        <Image style={styles.headerImage} source={require("../../img/espresso_shots.jpg")}>
        </Image>
        <ScrollView>
          <ListView
            dataSource={this.state.dataSource}
            style={styles.container}
            initialListSize={10}
            pageSize={10}
            renderHeader={this.listHeader}
            renderRow={this.renderRow.bind(this)}>
          </ListView>
          </ScrollView>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCart: (id, quantity) => {
      dispatch(updateCart(id, quantity))
    },
    getProducts: () => {
      dispatch(fetchProductsIfNeeded())
    },
    getQuantity: () => {
      dispatch(getQuantity())
    }
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)


const styles = StyleSheet.create({
  listHeader: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  headerImage: {
    width: width,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0
  },
  container: {
    backgroundColor: '#F6F6F6',
    position: 'relative',
    marginTop: 200
  },
  loading: {
    marginTop: 74,
    alignItems: 'center'
  },
  text: {
    fontSize: 50,
    alignItems: 'center',
    textAlign: 'center'
  }
})
