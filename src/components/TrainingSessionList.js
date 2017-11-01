import React, { PropTypes } from 'react'
import TrainingSessionThumb from './TrainingSessionThumb'
import { connectComponent } from '../store'

class TrainingSessionList extends React.Component {
  componentWillMount () {
    const { trainingSessionTypeId } = this.props.app

    this.props.loadTrainingSessions({contentTypeId: trainingSessionTypeId})
  }

  render () {
    return (
      <div className="u-paddingDefault">
        <ul className="o-listThirdsWithSpace">
          {
            Object.keys(this.props.trainingSessions.entries).map(id => {
              return (
                <li key={ id }>
                  <TrainingSessionThumb trainingSession={ this.props.trainingSessions.entries[ id ] }></TrainingSessionThumb>
                </li>
              )
            })
          }
        </ul>

        { this.maybeRenderWarning() }
      </div>
    )
  }

  maybeRenderWarning () {
    if (this.props.trainingSessions.error) {
      return (
        <div className="o-warning">
          <p>The gallery content type you specified does not exist.</p>
          <p className="o-warning__paragraph">Please check your gallery content type token</p>
        </div>
      )
    }
  }
}

TrainingSessionList.propTypes = {
  app: PropTypes.object,
  trainingSessions: PropTypes.object,
  loadTrainingSessions: PropTypes.func
}

export default connectComponent(TrainingSessionList)
