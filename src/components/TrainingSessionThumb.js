import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './TrainingSessionThumb.css'
import Author from './Author'
import Date from './Date'
import ResponsiveImage from './ResponsiveImage'
import StarRatingComponent from 'react-star-rating-component';

var levels = []
var types = []

function TrainingSessionThumb ({ trainingSession }) {
  var sum = 0
  for (var i = 0; i < trainingSession.fields.rating.length; i++) {
    sum += parseInt(trainingSession.fields.rating[i], 10)
  }

  var averageRating = sum / trainingSession.fields.rating.length
  console.log(averageRating)
  return (
    <div styleName="c-trainingSessionThumb">
      <figure styleName="c-trainingSessionThumb__figure">
        <Link to={`/session/${trainingSession.sys.id}`} styleName="c-trainingSessionThumb__imageContainer">
          <ResponsiveImage src="https://image.shutterstock.com/z/stock-vector-floorball-sticks-with-ball-314594918.jpg" alt={`Se träning ${trainingSession.fields.title}`} />
        </Link>

        <figcaption styleName="c-trainingSessionThumb__caption">
          <div styleName="c-trainingSessionThumb__title">{trainingSession.fields.title}</div>

          <div className="u-marginBottomSmall">
            <StarRatingComponent
              name="rate"
              editing={false}
              starCount={10}
              value={averageRating}
            />
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

function renderTags(trainingSession) {
  trainingSession.fields.exercises.map(function (exercise) {
    exercise.fields.level.forEach(function (level) {
      if (!levels.includes(level)) {
        levels.push(level)
      }
    }, this)
    exercise.fields.type.forEach(function (type) {
      if (!types.includes(type)) {
        types.push(type)
      }
    }, this)
  })
  return (
    <ul className="o-listReset">
      {
        levels.map(
          (level, index) => (<li key={index} className="o-tag o-tag--level">{level}</li>)
        )
      }
      {
        types.map(
          (type, index) => (<li key={index} className="o-tag o-tag--type">{type}</li>)
        )
      }
    </ul>
  )
}

TrainingSessionThumb.propTypes = { trainingSession: PropTypes.object }

export default CSSModules(TrainingSessionThumb, styles)
