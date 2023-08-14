import {
  APPLICATION_CREATE_FAIL,
  APPLICATION_CREATE_REQUEST,
  APPLICATION_CREATE_RESET,
  APPLICATION_CREATE_SUCCESS,
  APPLICATION_DETAILS_FAIL,
  APPLICATION_DETAILS_REQUEST,
  APPLICATION_DETAILS_RESET,
  APPLICATION_DETAILS_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_LIST_MY_FAIL,
  APPLICATION_LIST_MY_REQUEST,
  APPLICATION_LIST_MY_RESET,
  APPLICATION_LIST_MY_SUCCESS,
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_STATUS_UPDATE_FAIL,
  APPLICATION_STATUS_UPDATE_REQUEST,
  APPLICATION_STATUS_UPDATE_RESET,
  APPLICATION_STATUS_UPDATE_SUCCESS,
} from '../constants/applicationConstants';

export const applicationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_CREATE_REQUEST:
      return {
        loading: true,
      };
    case APPLICATION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        application: action.payload,
      };
    case APPLICATION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case APPLICATION_CREATE_RESET:
      return { application: {} };

    default:
      return state;
  }
};

export const applicationDetailsReducer = (
  state = { loading: true, jobListing: {} },
  action
) => {
  switch (action.type) {
    case APPLICATION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case APPLICATION_DETAILS_SUCCESS:
      return {
        loading: false,
        application: action.payload,
      };
    case APPLICATION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case APPLICATION_DETAILS_RESET:
      return {
        loading: true,
        jobListing: {},
      };

    default:
      return state;
  }
};

export const applicationListMyReducer = (
  state = { applications: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case APPLICATION_LIST_MY_SUCCESS:
      return {
        loading: false,
        applications: action.payload,
      };
    case APPLICATION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case APPLICATION_LIST_MY_RESET:
      return { applications: [] };
    default:
      return state;
  }
};

export const applicationListReducer = (
  state = { applications: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_LIST_REQUEST:
      return {
        loading: true,
      };
    case APPLICATION_LIST_SUCCESS:
      return {
        loading: false,
        applications: action.payload,
      };
    case APPLICATION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const applicationStatusUpdateReducer = (
  state = { status: {} },
  action
) => {
  switch (action.type) {
    case APPLICATION_STATUS_UPDATE_REQUEST:
      return { loading: true, ...state };
    case APPLICATION_STATUS_UPDATE_SUCCESS:
      return { loading: false, success: true, status: action.payload };
    case APPLICATION_STATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case APPLICATION_STATUS_UPDATE_RESET:
      return { status: {} };
    default:
      return state;
  }
};
