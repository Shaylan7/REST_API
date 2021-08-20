const setEditModal = (isbn) => {
    // ***** replaced with Fetch ****** 
    // const xhttp = new XMLHttpRequest();

    // xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    // xhttp.send();

    // const book = JSON.parse(xhttp.responseText);

    fetch(`http://localhost:3000/book/${isbn}`,{method: 'GET'})
        .then( response => response.json() )
        .then( book => {
            const {
                title, 
                author, 
                publisher, 
                publish_date,
                numOfPages
            } = book;
            document.getElementById('isbn').value = isbn;
            document.getElementById('title').value = title;
            document.getElementById('author').value = author;
            document.getElementById('publisher').value = publisher;
            document.getElementById('publish_date').value = publish_date;
            document.getElementById('numOfPages').value = numOfPages;
            // setting up the action url for the book
            document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
        
        
        } )
        .catch( error => console.error('error:', error) );

    }
//*******Moved to within fetch call above *******/
//     const {
//         title, 
//         author, 
//         publisher, 
//         publish_date,
//         numOfPages
//     } = book;

//     document.getElementById('isbn').value = isbn;
//     document.getElementById('title').value = title;
//     document.getElementById('author').value = author;
//     document.getElementById('publisher').value = publisher;
//     document.getElementById('publish_date').value = publish_date;
//     document.getElementById('numOfPages').value = numOfPages;

//     // setting up the action url for the book
//     document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
// }

// **** Fetch version *** 
//  const deleteBook = (isbn) => {
//  fetch(`http://localhost:3000/book/${isbn}`,{method: 'DELETE'})
//          .then(response => response.json())
//         //  .then(json => console.log(json))
//     location.reload();
// }

// **** async await version **** 
const deleteBook = async (isbn) => {
    const result = await fetch(`http://localhost:3000/book/${isbn}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: null
    })
    location.reload();
}
// ******XMLH Version ******
// const deleteBook = (isbn) => {
//     const xhttp = new XMLHttpRequest();

//     xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
//     xhttp.send();

//     location.reload();
// }

const loadBooks = () => {
    fetch("http://localhost:3000/book/")
        .then( response => response.json() )
        .then( books => {
            for (let book of books) {
                const x = `
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
                                <div>Author: ${book.author}</div>
                                <div>Publisher: ${book.publisher}</div>
                                <div>Number Of Pages: ${book.numOfPages}</div>
                                <hr>
                                <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">Delete</button>
                                <button types="button" class="btn btn-primary" data-toggle="modal" 
                                    data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
            }
        })
        .catch(error => console.error('error:', error));   
}
    loadBooks();



// const loadBooks = () => {
//     const xhttp = new XMLHttpRequest();

//     xhttp.open("GET", "http://localhost:3000/book", false);
//     xhttp.send();

//     const books = JSON.parse(xhttp.responseText);

//     for (let book of books) {
//         const x = `
//             <div class="col-4">
//                 <div class="card">
//                     <div class="card-body">
//                         <h5 class="card-title">${book.title}</h5>
//                         <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
//                         <div>Author: ${book.author}</div>
//                         <div>Publisher: ${book.publisher}</div>
//                         <div>Number Of Pages: ${book.numOfPages}</div>
//                         <hr>
//                         <button type="button" class="btn btn-danger">Delete</button>
//                         <button types="button" class="btn btn-primary" data-toggle="modal" 
//                             data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
//                             Edit
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `

//         document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
//     }
// }

// loadBooks();