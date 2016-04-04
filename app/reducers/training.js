import {
  SEND_INVITE,
  REQUEST_TRAINEES,
  RECEIVE_TRAINEES
} from '../actions'

const courses = [
  {
    title: "Seasonal Training",
    slug: "seasonal-training",
    description: "Prepare for the spring promotion by elevating your iced offerings."
  },
  {
    title: "Global Responsibility",
    slug: "global-responsibility",
    description: "Learn more about our mission, values and guiding principles."
  },
  {
    title: "Starbucks Brand",
    slug: "starbucks-brand",
    description: "Learn about Starbucks history and culture."
  },
  {
    title: "Starbucks Coffee",
    slug: "starbucks-coffee",
    description: "Learn about coffee growing, harvesting, and the fundamentals of brewing."
  },
  {
    title: "Starbucks Espresso",
    slug: "starbucks-espresso",
    description: "Learn about the perfect espresso shot and how to prepare espresso beverages."
  },
  {
    title: "Seattle's Best History",
    slug: "seattles-best-history",
    description: "Learn about Seattle's Best Coffee history and culture."
  },
  {
    title: "Seattle's Best Coffee",
    slug: "seattles-best-coffee",
    description: "Learn about coffee growing, harvesting, and the fundamentals of brewing."
  },
  {
    title: "Fontana® Blended Training",
    slug: "fontana-blended-training",
    description: "Learn about making Fontana™ beverages."
  },
  {
    title: "Tazo® Training",
    slug: "tazo-training",
    description: "Learn about the fundamentals of tea and how to craft Tazo® beverages."
  }
]

const initialState = {
  isFetching: false,
  isLoaded: false,
  courses: courses,
  trainees: []
}



export default function training(state = initialState, action) {
    switch(action.type) {
      case REQUEST_TRAINEES:
        return Object.assign({}, state, {
          isFetching: true,
          isLoaded: false
        })
      case RECEIVE_TRAINEES:
        return Object.assign({}, state, {
          isFetching: false,
          isLoaded: true,
          trainees: action.trainees
        })
      case SEND_INVITE:
        return Object.assign({}, state, {
          trainees: [...state.trainees, action.invite]
        })
      default:
        return state
    }
}
