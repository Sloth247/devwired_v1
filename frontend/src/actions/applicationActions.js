import axios from 'axios';
import {
  APPLICATION_CREATE_FAIL,
  APPLICATION_CREATE_REQUEST,
  APPLICATION_CREATE_SUCCESS,
  APPLICATION_DETAILS_FAIL,
  APPLICATION_DETAILS_REQUEST,
  APPLICATION_DETAILS_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_LIST_MY_FAIL,
  APPLICATION_LIST_MY_REQUEST,
  APPLICATION_LIST_MY_SUCCESS,
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_STATUS_UPDATE_FAIL,
  APPLICATION_STATUS_UPDATE_REQUEST,
  APPLICATION_STATUS_UPDATE_SUCCESS,
} from '../constants/applicationConstants';

export const createApplication =
  (application) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLICATION_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/applications`,
        application,
        config
      );

      dispatch({
        type: APPLICATION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPLICATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getApplicationDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLICATION_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/applications/${id}`, config);

    dispatch({
      type: APPLICATION_DETAILS_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyApplications = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLICATION_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/applications/myapplications`,
      config
    );

    dispatch({
      type: APPLICATION_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listApplications = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLICATION_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/applications`, config);

    dispatch({
      type: APPLICATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateApplicationStatus =
  (id, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLICATION_STATUS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/applications/${id}`,
        { status },
        config
      );

      dispatch({
        type: APPLICATION_STATUS_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: APPLICATION_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: APPLICATION_STATUS_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const getDocuments = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: APPLICATION_DOCUMENT_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(
//       `/https://res.cloudinary.com/${process.env.CLOUDINARY_HOST}/image/upload/v1682051626/rabqsptgyuojgax5iv4h.pdf`,
//       config
//     );

//     dispatch({
//       type: APPLICATION_DETAILS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: APPLICATION_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
