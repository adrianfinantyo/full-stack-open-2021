import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
};

const create = newPerson => {
  const req = axios.post(baseUrl, newPerson);
  return req.then(res => res.data);
};

const update = (person, replace) => {
  const req = axios.put(`${baseUrl}/${person.id}`, replace);
  return req.then(res => res.data);
};

const deletePerson = id => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then(res => res.data);
};

export { getAll, create, update, deletePerson };