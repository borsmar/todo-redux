import * as actionTypes from './actions';
import noteService from '../../services/notes';

const initialState ={
  notes: []
}


const reducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case actionTypes.INIT_NOTES:
      return {
        notes: action.payload,
      };
      // return action.payload;
    case actionTypes.ADD_TODO:
      return {...state, notes:[...state.notes, action.payload]};
    case actionTypes.REMOVE_TODO:
      // alert(state.notes)
      console.log(state)
      const updateArray = state.notes.filter(
        (item) => item.id !== action.payload
      );
      return {
         ...state,
        notes: updateArray,
      };
    case actionTypes.DONE_NOTE:
      const doneToggle = state.notes.map((item) => {
        return item.id === action.payload
          ? { ...item, done: !item.done }
          : { ...item };
      });
      return {
        ...state,
        notes: doneToggle,
      };
    default:
      return state;
  }
};

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch({
      type: actionTypes.INIT_NOTES,
      payload: notes,
    });
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch({
      type: actionTypes.ADD_TODO,
      payload: newNote,
    });
  };
};

export const doneNote = (id) => {
  return async (dispatch) => {
    const updatedNote = await noteService.doneNote(id);
    dispatch({
      type: actionTypes.DONE_NOTE,
      payload: updatedNote.id,
    });
  };
};

export const deleteNote = (id) => {
  return async (dispatch) => {
    const deletedNote = await noteService.deleteNote(id);
    dispatch({
      type: actionTypes.REMOVE_TODO,
      payload: id,
    });
  };
};

export default reducer;
