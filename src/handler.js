const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNotesHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    });

    response.code(201);
    console.log('notes: ', notes);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Catatan gagal ditambahkan'
  });

  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'Success',
  data: {
    notes
  }
});

const getNotesDetailHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'Success',
      data: {
        note,
      }
    };
  }

  const response = h.response({
    status:'Failed',
    message: 'Catatan tidak ditemukan'
  });

  response.code(404);
  return response;
};

const editNotesHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const { id } = request.params;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== 1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    };

    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil diperbarui'
    });

    response.code(200);
    return response;
  }


  const response = h.response({
    status: 'Failed',
    message: 'Catatan gagal diperbarui, id tidak ditemukan'
  });

  response.code(404);
  return response;
};

const deleteNotesHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {

    notes.splice(index, 1);

    const response = h.response({
      status: 'Success',
      message: 'Notes berhasil dihapus'
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'Failed',
    message: 'Gagal menghapus notes, id notes tidak ditemukan'
  });

  response.code(404);
  return response;
};

module.exports = { addNotesHandler, getAllNotesHandler, getNotesDetailHandler, editNotesHandler, deleteNotesHandler };