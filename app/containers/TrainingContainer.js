import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Training from '../components/training'
import { fetchTraineesIfNeeded } from '../actions'
import SBXText from '../components/common/SBXText'
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

    this.renderContent = this.renderContent.bind(this)
  }

  componentDidMount() {
    this.props.getCourses()
  }

  newInvite() {
    Actions.newinvite()
  }

  renderPlusIcon() {
    return (
      <TouchableOpacity style={styles.plusIconContainer} onPress={this.newInvite}>
          <View style={styles.plusIcon}>
            <Text style={styles.plusIconText}>+</Text>
          </View>
      </TouchableOpacity>
    )
  }

  renderContent() {
    if(!this.props.isLoaded || !this.props.trainees) {
      return <View style={[styles.container, styles.loading]}>
               <SBXText style={styles.loadingText}>LOADING</SBXText>
             </View>
    } else {
      return <Training trainees={this.props.trainees}/>
    }
  }

  render() {
    return (
      <ParallaxScroll
        title="TRAINING"
        renderRightIcon={this.renderPlusIcon()}
        backgroundImage={require("../../img/training-bg.jpg")}
        >
        {this.renderContent()}
      </ParallaxScroll>
    )
  }
}

function mapStateToProps(state) {
  return {
    courses: state.training.courses,
    trainees: state.training.trainees,
    isLoaded: state.training.isLoaded
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCourses: () => {
      dispatch(fetchTraineesIfNeeded())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainingContainer)


const styles = StyleSheet.create({
  plusIconContainer: {
    position: 'absolute',
    bottom: 4,
    right: 15,
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  plusIcon: {
    width: 25,
    height: 25,
    borderColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  plusIconText: {
    fontFamily: 'Avenir',
    fontWeight: '600',
    color: 'white',
    fontSize: 24
  },
  container: {
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
})
