const {
    addNoteHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    deleteNoteByIdHandler,
    editBookByIdHandler
} = require("./handler");


const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
    },
    {
        method: 'POST',
        path: '/books',
        handler: addNoteHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteNoteByIdHandler,
    }
];

module.exports = routes;