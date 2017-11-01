import * as trainingService from '../services/trainingSessionStore'

export function setAppClientState (authState) {
  return {
    type: 'LOADED_CLIENT',
    authState
  }
}

export function loadTrainingSessions ({contentTypeId}) {
  return {
    type: 'LOAD_TRAININGSESSIONS',
    payload: trainingService.loadTrainingSessions(contentTypeId)
  }
}

export function loadTrainingSession (id) {
  return {
    type: 'LOAD_TRAININGSESSION',
    payload: trainingService.loadTrainingSession(id),
    meta: {
      id
    }
  }
}
