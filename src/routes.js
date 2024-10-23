const { addNotesHandler, getAllNotesHandler, getNotesDetailHandler, editNotesHandler, deleteNotesHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesDetailHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNotesHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotesHandler
  }
];

module.exports = routes;