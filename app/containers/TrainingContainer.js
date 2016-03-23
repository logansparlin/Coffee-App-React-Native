import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Training from '../components/training'
import React, {
  View,
  Text,
  TextInput,
  Component,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import ParallaxScroll from '../components/common/ParallaxScroll'
let {width, height} = Dimensions.get('window')

class TrainingContainer extends Component {

  constructor(props) {
    super(props)
  }

  newInvite() {
    Actions.newinvite()
  }

  renderPlusIcon() {
    return (
      <TouchableOpacity style={styles.plusIcon} onPress={this.newInvite}>
        <Text style={styles.plusIconText}>+</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ParallaxScroll
        title="TRAINING"
        renderRightIcon={this.renderPlusIcon()}
        backgroundImage={require("../../img/training-bg.jpg")}
        >
        <Training trainees={this.props.trainees}/>
      </ParallaxScroll>
    )
  }

}

function mapStateToProps(state) {
  return {
    courses: state.training.courses,
    trainees: state.training.trainees
  }
}

export default connect(mapStateToProps)(TrainingContainer)


const styles = StyleSheet.create({
  plusIcon: {
    position: 'absolute',
    bottom: 4,
    right: 15,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusIconText: {
    fontFamily: 'Avenir',
    fontWeight: '600',
    color: 'white',
    fontSize: 26
  }
})
