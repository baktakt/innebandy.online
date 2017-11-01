import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './TrainingSession.css'
import ResponsiveImage from './ResponsiveImage'
import { Link, browserHistory } from 'react-router'
import Modal from 'react-modal'
import Author from './Author'
import Date from './Date'
import ImageGallery from 'react-image-gallery'
import { connectComponent } from '../store'

const customStyles = {
  content: {
    position: 'static',
    left: 'auto',
    padding: 0,

    border: 'none',
    borderRadius: 0,
    overflow: 'visible',

    boxShadow: '0 .5em 3em #ddd'
  }
}

class TrainingSession extends React.Component {
  componentDidMount () {
    this.props.loadTrainingSession(this.props.params.trainingSessionId)
  }

  closeModal () {
    browserHistory.goBack()
  }

  getIndexOfImage (imageCollection, id) {
    let foundIndex = -1

    imageCollection.some((item, index) => {
      if (item.fields.image.sys.id === id) {
        foundIndex = index

        return true
      }
    })

    return foundIndex
  }

  componentWillReceiveProps () {
    let trainingSession = this.props.trainingSessions.entries[ this.props.params.trainingSessionId ]

    if (trainingSession && trainingSession.error) {
      browserHistory.push('/not-found')
    }
  }

  renderImageEntry (entry) {
    return (
      <div>
        <ResponsiveImage
            src={entry.fields.image.fields.file.url}
            alt={entry.fields.title}
        />

        <div className="image-gallery-description">
          {
            entry.fields.title &&
              <div className="image-gallery-title">
                {entry.fields.title}
              </div>
          }
          {
            entry.fields.imageCaption &&
              <div className="u-marginBottomDefault">
                "nutting here"
              </div>
          }
          {
            entry.fields.imageCredits &&
              <div>
                "Nutting here"
              </div>
          }
        </div>
      </div>
    )
  }

  render () {
    const trainingSession = this.props.trainingSessions.entries[ this.props.params.trainingSessionId ]

    if (trainingSession && trainingSession.fields) {
      return (
        <div>
          <div styleName="c-gallery__header">
            <h1 styleName="c-gallery__headline">{ trainingSession.fields.title }</h1>
            <Link to={'/'} styleName="c-gallery__close" className="o-btnClose" aria-label="Go back to all galleries">
              ✕
            </Link>
            <Author author={ trainingSession.fields.author }></Author>

            { this.renderTags(trainingSession) }

            <div className="u-marginBottomSmall u-flexHorizCenter">
              <Date entry={ trainingSession.fields.date } />
            </div>
          </div>

          <ul className="o-listThirds">
            {
              trainingSession.fields.exercises.map((entry, index) => {
                return (
                  <li key={entry.sys.id}>
                    <div styleName="c-gallery__modalOpenLink">
                      <Link to={`/session/${trainingSession.sys.id}/image/${entry.fields.image.sys.id}`} >
                        <ResponsiveImage src={ entry.fields.image.fields.file.url } alt={entry.fields.title} />
                      </Link>
                      <div styleName="c-gallery__modalOpenTitle">{ entry.fields.title }</div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          <Modal
            isOpen={!!this.props.params.imageId}
            onRequestClose={this.closeModal}
            style={customStyles}>
            <button onClick={this.closeModal.bind(this)} styleName="c-gallery__modalClose" className="o-btnClose"><span>✕</span></button>

            <ImageGallery
            ref={i => this._imageGallery = i}
            items={ trainingSession.fields.exercises }
            slideInterval={2000}
            startIndex={ this.props.params.imageId ? this.getIndexOfImage(trainingSession.fields.exercises, this.props.params.imageId) : -1}
            onImageLoad={this.handleImageLoad}
            renderItem={this.renderImageEntry}/>
          </Modal>
        </div>
      )
    }
  }

  renderTags (trainingSession) {
    if (trainingSession.fields.tags) {
      return (
        <ul className="o-listReset">
        {
          trainingSession.fields.tags.map(
            (entry, index) => (<li key={index} className="o-tag">{ entry }</li>)
          )
        }
        </ul>
      )
    }
  }
}

TrainingSession.propTypes = {
  app: PropTypes.object,
  trainingSessions: PropTypes.object,
  loadTrainingSession: PropTypes.func,
  loadTrainingSessions: PropTypes.func,
  params: PropTypes.object
}

export default connectComponent(CSSModules(TrainingSession, styles))
