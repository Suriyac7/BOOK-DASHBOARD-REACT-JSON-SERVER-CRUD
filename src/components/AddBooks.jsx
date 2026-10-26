import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export const AddBooks = () => {
    const [books, setBooks] = useState({
        "bookId": 0,
        "bookname": '',
        "author": '',
        // "imgurl": '',
        "category": 'fiction',
        "gendra": '',
        "price": 0,
        "stockcount": 0,
        "id": "0j0C0HgqnJ4"
    })

    const myNavi = useNavigate()

    function handlechange(e) {
        setBooks({
            ...books, [e.target.name]:
                e.target.name === 'bookId' || e.target.name === 'price' || e.target.name === 'stockcount' ?
                    Number(e.target.value) : e.target.value
        })
    }
    async function addnewBooks(e) {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:5000/books?bookId=${books.bookId}`)
            if (res.data.length === 0) {

                const addedBooks = await axios.post(`http://localhost:5000/books`, books)
                if (addedBooks) {
                    alert('added successfully')
                    setBooks(
                        {
                            "bookId": 0,
                            "bookname": '',
                            "author": '',
                            // "imgurl": '',
                            "category": 'fiction',
                            "gendra": '',
                            "price": 0,
                            "stockcount": 0
                        })
                }
            }
            else {
                alert('Book already exists')
            }
        }
        catch (error) {
            console.log(error);

        }
    }
    return <>
        <div className="bg-white add-page bg-white shadow-lg p-4 w-50">
            <h3 className="heading text-center bg-info text-white">Add Books</h3>
            <div className="container w-50 mt-5">
                <form action="" onSubmit={addnewBooks}>
                    <div className="form-group">
                        <input type="text" name="bookId" value={books.bookId} onChange={handlechange} placeholder="Book Id" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="bookname" value={books.bookname} onChange={handlechange} placeholder="Book Name" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="author" value={books.author} onChange={handlechange} placeholder="Book Author" className="form-control" required />
                    </div>
                    {/* <div className="form-group">
                    <input type="text" name="imgurl" value={books.imgurl} onChange={handlechange} placeholder="Book Imgurl" className="form-control" required />
                </div> */}
                    <div className="form-group">
                        <select name="" id="">
                            <option value="fiction">fiction</option>
                            <option value="non-fiction">non-fiction</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" name="gendra" value={books.gendra} onChange={handlechange} placeholder="Book Gendra" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="price" value={books.price} onChange={handlechange} placeholder="Book Price" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="number" name="stockcount" value={books.stockcount} onChange={handlechange} placeholder="Book Stockcount" className="form-control" required />
                    </div>
                    <input type="submit" value="Add Books" className="btn btn-primary mx-2" />
                    <button onClick={() => myNavi("/")} className="btn btn-danger">Exit</button>
                </form>
            </div>
        </div>
    </>
}