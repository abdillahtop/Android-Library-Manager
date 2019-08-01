import axios from 'axios';

export const getBook = () => {
    return {
        type: 'GET_BOOK',
        payload: axios.get(`https://api-library-abdi.herokuapp.com/book/all`)
    }
}

export const getBookSearch = (name) => {
    return {
        type: 'GET_BOOKSEARCH',
        payload: axios.get(`http://localhost:2000/?search=${name}`)
    }
}

export const postBook = (data) => {
    return {
        type: 'POST_BOOK',
        payload: axios.post(`http://localhost:2000/book`, { data })
    }
}

export const detailBook = (bookid) => {
    return {
        type: 'DETAIL_BOOK',
        payload: axios.get(`https://api-library-abdi.herokuapp.com/book/${bookid}`)
    }
}

export const deleteBook = (bookid) => {
    return {
        type: 'DELETE_BOOK',
        payload: axios.delete(`http://localhost:2000/book/${bookid}`)
    }
}

// export const updateBook = (bookid, book_name, writter, location, image, id_category, description, status) => {
//     console.log("update: ", bookid)
//     console.log("BOOK: ", book_name)
//     console.log("WRITTER: ", writter)
//     console.log("LOCATION: ", location)
//     console.log("image: ", image)
//     console.log("category: ", id_category)
//     console.log("description: ", description)

//     return {
//         type: 'UPDATE_BOOK',
//         payload: axios.patch(`http://localhost:2000/book/${bookid}/`, { book_name: book_name, writter: writter, location: location, image: image, id_category: id_category, description: description, status: status })
//     }
// }

export const searchBook = (seacrh) => {
    console.log("seacrh name:", seacrh)
    return {
        type: 'SEARCH_BOOK',
        payload: axios.get(`http://localhost:2000/?search=${seacrh}`)
    }
}

export const postLoaning = (bookid, no_ktp, name) => {
    console.log("loaning id :", bookid)
    console.log("loaning no_ktp :", no_ktp)
    console.log("loaning name :", name)
    return {
        type: 'POST_LOANING',
        payload: axios.post(`http://localhost:2000/pinjam`, { bookid, no_ktp, name })
    }
}

export const getLoaning = () => {
    return {
        type: 'GET_LOANING',
        payload: axios.get(`http://localhost:2000/pinjam/all`)
    }
}