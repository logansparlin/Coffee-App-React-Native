import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native'
import SBXText from './common/SBXText'
import colors from '../colors'

let {width, height} = Dimensions.get('window')

const accounts = [
  {
    name: "Brad",
    email: "bbarker@starbucks.com",
    account: "5658"
  },
  {
    name: "Jill",
    email: "jhayner@starbucks.com",
    account: "5665"
  },
  {
    name: "Marlin",
    email: "partnersuperadmintest@starbucks.com",
    account: "100016389"
  }
]

export default class AccountPicker extends Component {

  constructor() {
    super()

    this.state = { selected: null }
  }

  select(account) {
    console.log(this.state)
    this.setState({ selected: account.account })
  }

  render() {
    return (
      <View style={styles.container}>
        {accounts.map((account) => {
          return (
            <TouchableOpacity key={account.account} activeOpacity={0.9} onPress={this.select.bind(this, account)} style={[styles.accountContainer, (this.state.selected == account.account) ? styles.selected : {} ]}>
              <SBXText style={styles.name}>{account.name.toUpperCase()}</SBXText>
              <SBXText style={styles.accountNumber}>Account #{account.account}</SBXText>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  accountContainer: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // borderWidth: 3,
    width: (width * 0.7),
    marginTop: 20,
    padding: 20,
    paddingTop: 25,
    paddingBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  name: {
    color: 'white',
    fontWeight: '800',
    letterSpacing: 1,
    paddingRight: 20,
    fontSize: 16
  },
  accountNumber: {
    color: "#ddd",
    textAlign: 'center'
  }
})
