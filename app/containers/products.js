import { connect } from 'react-redux'
import { fetchProductsIfNeeded, updateCart, getQuantity } from '../actions'
import Product from '../components/product'
import BagIcon from '../components/bagicon'
import colors from '../colors'
import SBXText from '../components/common/SBXText'
import ParallaxScroll from '../components/common/ParallaxScroll'
import React, {
  View,
  Text,
  StatusBar,
  Component,
  StyleSheet,
  ListView,
  Animated,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'

// Get screen dimensions
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
    return <Product updateCart={this.props.updateCart} data={data} quantity={(this.props.cart.quantityById[data.id]) || 0} />
  }

  renderContent=()=> {
    let {isFetching} = this.props.products;

    if(isFetching) {
      return (
        <View style={[styles.container, styles.loading]}>
          <SBXText style={styles.loadingText}>LOADING</SBXText>
        </View>
      )
    } else {
      return (
        <ListView
          dataSource={this.state.dataSource}
          style={styles.container}
          initialListSize={10}
          pageSize={10}
          renderRow={this.renderRow.bind(this)}>
        </ListView>
      )
    }
  };

  render() {
    let {products} = this.props;
    let {items} = products;

    renderBagIcon=()=> {
      return (
        <BagIcon quantity={this.props.cart.quantity} />
      )
    }

    renderSearchIcon=()=> {
      return (
        <Image source={require('../../img/search-icon.png')} style={styles.searchIcon}></Image>
      )
    }

    return (
      <ParallaxScroll
        backgroundImage={require("../../img/espresso_shots.jpg")}
        title="PRODUCTS"
        renderLeftIcon={renderBagIcon()}
        renderRightIcon={renderSearchIcon()}
        quantity={this.props.cart.quantity}>
        {this.renderContent()}
      </ParallaxScroll>
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
  container: {
    backgroundColor: 'white',
    position: 'relative',
    marginBottom: 50,
    marginTop: 200,
    paddingTop: 10,
    paddingBottom: 10
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 14,
    letterSpacing: 1.5,
    fontWeight: '800',
    color: '#333'
  },
  text: {
    fontSize: 50,
    color: '#333',
    backgroundColor: 'blue',
    alignItems: 'center',
    textAlign: 'center'
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    bottom: 12,
    width: 20,
    height: 20
  }
})
