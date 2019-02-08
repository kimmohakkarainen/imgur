import * as api from "../api";

export function fetchViral(params) {
  return dispatch => {
    api
      .getViral(params)
      .then(resp => {
        dispatch(fetchViralSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchViralSucceeded(data) {
  return {
    type: "FETCH_VIRAL_SUCCEEDED",
    payload: { viral: data, error: null }
  };
}

export function fetchError(error) {
  return {
    type: "FETCH_ERROR",
    payload: { error: "connection error", metadatadialog: null }
  };
}

export function openMetadataDialog(params) {
  return {
    type: "OPEN_METADATA_DIALOG",
    payload: { metadatadialog: params }
  };
}

export function closeMetadataDialog(params) {
  return {
    type: "CLOSE_METADATA_DIALOG",
    payload: { metadatadialog: null }
  };
}

export function saveMetadataDialog(metadata) {
  return dispatch => {
    api
      .postMetadata(metadata)
      .then(resp => {
        dispatch(closeMetadataDialog());
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}
