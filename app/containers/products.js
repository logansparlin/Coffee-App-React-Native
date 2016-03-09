import { connect } from 'react-redux'
import { fetchProductsIfNeeded } from '../actions'
import Product from '../components/product'
import React, {
  View,
  Text,
  Component,
  StyleSheet,
  ListView
} from 'react-native'

class Products extends Component {

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.products.items)
    }
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(fetchProductsIfNeeded())
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.products.items)
    })
  }

  renderRow(data) {
    return <Product data={data} />
  }

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
      <ListView
        dataSource={this.state.dataSource}
        style={styles.container}
        initialListSize={10}
        pageSize={10}
        renderRow={this.renderRow.bind(this)}>
          <Text style={styles.text}>Products</Text>
      </ListView>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products)


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    marginTop: 64
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
