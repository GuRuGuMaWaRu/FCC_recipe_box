import * as types from '../constants/ActionTypes';

export const openDeleteWindow = () => {
  return {
    type: types.OPEN_DELETE_WINDOW,
  };
};

export const closeDeleteWindow = () => {
  return {
    type: types.CLOSE_DELETE_WINDOW,
  };
};

export const openEditWindow = () => {
  return {
    type: types.OPEN_EDIT_WINDOW,
  };
};

export const closeEditWindow = () => {
  return {
    type: types.CLOSE_EDIT_WINDOW,
  };
};