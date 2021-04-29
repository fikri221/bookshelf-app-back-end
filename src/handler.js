const { nanoid } = require('nanoid');
const books = require('./books');

const addNoteHandler = (request, h) => {
    const { name, year, author,
        summary, publisher, pageCount,
        readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    let finished = false;
    if (pageCount === readPage) {
        finished = true;
    }

    if (!name && readPage <= pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const newBook = {
        name, year, author,
        summary, publisher, pageCount,
        readPage, reading, id,
        finished, insertedAt, updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
        data: {
            bookId: id,
        },
    });
    response.code(500);
    return response;
}

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        })),
    },
});

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
        data: {
            book,
        },
    });
    response.code(404);
    return response;
}

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author,
        summary, publisher, pageCount,
        readPage, reading } = request.payload;

    const updatedAt = new Date().toISOString();

    let finished = false;
    if (pageCount === readPage) {
        finished = true;
    }

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((n) => n.id === id);
    if (index !== -1 && name !== "" && readPage <= pageCount) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
        data: {
            index,
        },
    });
    response.code(404);
    return response;
}

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {
    addNoteHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    deleteNoteByIdHandler,
    editBookByIdHandler
};