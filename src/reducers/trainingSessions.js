import { makeReducer } from './util'

export const trainingSessions = makeReducer(function (action) {
  switch (action.type) {
    case 'LOAD_TRAININGSESSIONS_PENDING':
      return { fetching: true }
    case 'LOAD_TRAININGSESSIONS_FULFILLED':
      return {
        fetching: false,
        entries: action.payload.reduce((collection, entry) => {
          collection[ entry.sys.id ] = entry
          return collection
        }, {})
      }
    case 'LOAD_TRAININGSESSIONS_REJECTED':
      return { error: true, fetching: false }

    case 'LOAD_TRAININGSESSION_PENDING':
      return {
        entries: {
          [ action.meta.id ]: {
            fetching: true
          }
        }
      }
    case 'LOAD_TRAININGSESSION_FULFILLED':
      action.payload.fetching = false
      action.payload.fields.exercises.forEach(image => {
        image.thumbnail = `${image.fields.image.fields.file.url}?w=120`
      })

      return {
        entries: {
          [ action.meta.id ]: action.payload
        }
      }
    case 'LOAD_TRAININGSESSION_REJECTED':
      return {
        entries: {
          [ action.meta.id ]: {
            error: true,
            fetching: false
          }
        }
      }
  }
}, { entries: [] })
