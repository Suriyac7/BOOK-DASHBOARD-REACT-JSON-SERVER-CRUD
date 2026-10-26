import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


export const Viewpage = () => {
    const [books, setBooks] = useState([])
    const [keyword, setkeyword] = useState("")

    async function fetchBooks() {
        try {
            const res = await axios.get('http://localhost:5000/books')
            // console.log(res.data);
            setBooks(res.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    function filterByCategory(category) {
        const filtered = books.filter(book => book.category === category)
        setBooks(filtered)
    }
    function filterBygendra(gendra) {
        const filtered = books.filter(book => book.gendra.includes(gendra))
        setBooks(filtered)
    }
    function searchBook() {
        const filtered = books.filter(book => book.bookname.toLowerCase().includes(keyword.toLocaleLowerCase()))
        setBooks(filtered)
    }

    async function deleteBook(id) {
        try {
            const res = await axios.delete(`http://localhost:5000/books/${id}`);
            console.log(res.data);
            alert("Book deleted successfully");
            fetchBooks()
        }
        catch (error) {
            console.log(error);
        }
    }

    return <>
        <div className="view-page bg-white shadow-lg p-4 w-75">
            <div className="heading container text-center bg-info text-white">
                <h3> <i class="fa-brands fa-leanpub"></i> All books</h3>
                <p>Manage, search and explore your book collection</p>
            </div>
            <div className="heading container py-2 my-3  bg-light border rounded">
                <input className="mb-2" type="text" placeholder="search..." name="keyword" onChange={(e) => setkeyword(e.target.value)} />
                <button onClick={searchBook} className="btn-primary border rounded">search books</button>
            </div>
            <div className="table-heading container shadow">
                <table className=" table table-striped table-bordered align-middle">
                    <thead className="bg-info text-white">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Author</th>
                            {/* <th>Image</th> */}
                            <th>Category</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>Count</th>
                            <th rowspan="2" className="text-center">Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map(book => {
                                return <tr key={book.id}>
                                    <td>{book.bookId}</td>
                                    <td>{book.bookname}</td>
                                    <td>{book.author}</td>
                                    {/* <td><img src="{book.imgurl}" alt="" width={50} height={50}/></td> */}
                                    {/* <td>{book.imgurl}</td> */}
                                    <td>{book.category}</td>
                                    <td>{book.gendra}</td>
                                    <td>{book.price}</td>
                                    <td>{book.stockcount}</td>
                                    <td>
                                        <Link to={`/edit/${book.id}`} className="btn btn-info mx-3"><i class="fa-solid fa-pen"></i>Edit</Link>
                                        <button onClick={() => deleteBook(book.id)} className="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div>
                    <Link to='/AddBooks' className="btn btn-success mx-2"><i class="fa-solid fa-plus"></i>AddBooks</Link>
                    <button onClick={() => filterByCategory('fiction')} className="btn btn-primary mx-2">fiction</button>
                    <button onClick={() => filterByCategory('non-fiction')} className="btn btn-primary mx-2">non-fiction</button>
                    <button onClick={() => filterBygendra('drama')} className="btn btn-primary mx-2">drama</button>
                    <button onClick={fetchBooks} className="btn btn-secondary mx-2"><i class="fa-solid fa-filter"></i>clear filter</button>
                </div>
            </div>
        </div>
    </>
}