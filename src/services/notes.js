import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async (content) => {
  const note = { ...content, done: false };
  const res = await axios.post(baseUrl, note);
  return res.data;
};


const doneNote = async (id) => {
  // const note = { done: true };
  const note = await axios.get(`${baseUrl}/${id}`);
  const param = { done: true };

  if(note.data.done === true){
    console.log(note)
    param.done = false
  }
  else{
    console.log(note)
    param.done = true
  }

  const res = await axios.patch(`${baseUrl}/${id}`, param);
  return res.data;
};

const deleteNote = async (id) => {
  // const note = { done: true };
  const res = await axios.delete(`${baseUrl}/${id}`);
  return id;
};

export default { getAll, createNew, doneNote, deleteNote};
