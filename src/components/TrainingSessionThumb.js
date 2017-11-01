import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './TrainingSessionThumb.css'
import Author from './Author'
import Date from './Date'
import ResponsiveImage from './ResponsiveImage'

function TrainingSessionThumb({ trainingSession }) {
  return (
    <div styleName="c-trainingSessionThumb">
      <figure styleName="c-trainingSessionThumb__figure">
        <Link to={`/session/${trainingSession.sys.id}`} styleName="c-trainingSessionThumb__imageContainer">
          <ResponsiveImage src="https://image.shutterstock.com/z/stock-vector-floorball-sticks-with-ball-314594918.jpg" alt={`Se träning ${trainingSession.fields.title}`} />
        </Link>

        <figcaption styleName="c-trainingSessionThumb__caption">
          <div styleName="c-trainingSessionThumb__title">{trainingSession.fields.title}</div>

          <div className="u-marginBottomSmall">
            <Author author={trainingSession.fields.author}></Author>
          </div>
          
          {renderTags(trainingSession)}

          <div className="u-marginBottomSmall u-flexHorizCenter">
            <Date entry={trainingSession.fields.date} />
          </div>

        </figcaption>
      </figure>
      <div className="u-flexHorizCenter u-marginTopAuto u-marginBottomDefault u-paddingHorizDefault">
        <Link to={`/session/${trainingSession.sys.id}`} className="o-btnPrimary">Se träning</Link>
      </div>
    </div>
  )
}

function renderTags (trainingSession) {
  return (
    <ul className="o-listReset">
      {
        trainingSession.fields.exercises.map(function (exercise) {
          return (
            exercise.fields.level.map(
              (level, index) => (<li key={index} className="o-tag o-tag--level">{level}</li>)
            )
          )
        })
      }
      {
        trainingSession.fields.exercises.map(function (exercise) {
          return (
            exercise.fields.type.map(
              (type, index) => (<li key={index} className="o-tag o-tag--type">{type}</li>)
            )
          )
        })
      }
    </ul>
  )
}

TrainingSessionThumb.propTypes = { trainingSession: PropTypes.object }

export default CSSModules(TrainingSessionThumb, styles)
