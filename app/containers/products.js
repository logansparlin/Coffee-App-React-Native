import { connect } from 'react-redux'
import { fetchProductsIfNeeded, updateCart, getQuantity } from '../actions'
import Product from '../components/product'
import BagIcon from '../components/bagicon'
import colors from '../colors'
import React, {
  View,
  Text,
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
    this.scrollY = new Animated.Value(0)
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

  render() {
    let {products} = this.props;
    let {items, isFetching} = products;

    let interpolatedScale = this.scrollY.interpolate({
      inputRange: [-height, 0],
      outputRange: [3, 1],
      extrapolateRight: 'clamp',
      extrapolateLeft: 'extend'
    })

    let interpolatedHeight = this.scrollY.interpolate({
      inputRange: [0, 120],
      outputRange: [200, 80],
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp'
    })

    let interpolatedOpacity = this.scrollY.interpolate({
      inputRange: [0, 140],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    var event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.scrollY
          }
        }
      }
    ])

    if(isFetching) {
      return (
        <View style={styles.loading}>
          <Text>Loading</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView onScroll={event} scrollEventThrottle={8}>
          <ListView
            dataSource={this.state.dataSource}
            style={styles.container}
            initialListSize={10}
            pageSize={10}
            renderRow={this.renderRow.bind(this)}>
          </ListView>
        </ScrollView>
        <Animated.View style={[styles.imageContainer, {transform: [{scale: interpolatedScale}]}, {height: interpolatedHeight}]}>
          <Animated.Image style={[styles.headerImage, {opacity: interpolatedOpacity}]} source={require("../../img/espresso_shots.jpg")}>
          </Animated.Image>
        </Animated.View>
        <BagIcon quantity={this.props.cart.quantity} />
        <Text style={styles.title}>PRODUCTS</Text>
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
  imageContainer: {
    position: 'absolute',
    overflow: 'hidden',
    height: 200,
    opacity: 1,
    width: width,
    top: 0,
    left: 0,
    backgroundColor: colors.green
  },
  headerImage: {
    width: width,
    height: 400,
    position: 'absolute',
    top: -100,
    left: 0,
    opacity: 1
  },
  container: {
    backgroundColor: 'white',
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
  },
  title: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    position: 'absolute',
    top: 35,
    left: 155,
    color: 'white'
  }
})
