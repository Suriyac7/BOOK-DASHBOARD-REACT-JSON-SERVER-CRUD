import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";


export const EditBooks = () => {
    const [books, setBooks] = useState({
        "bookId": 0,
        "bookname": '',
        "author": '',
        "imgurl": '',
        "category": 'fiction',
        "gendra": '',
        "price": 0,
        "stockcount": 0,
        "id": "0j0C0HgqnJ4"
    })

    const { id } = useParams()
    const myNavi = useNavigate()

    async function getBook() {
        try {
            const res = await axios.get(`http://localhost:5000/books/${id}`);
            setBooks(res.data);
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    }


    useEffect(() => {

        getBook();
    }, [])

    function handlechange(e) {
        setBooks({
            ...books, [e.target.name]:
                e.target.name === 'bookId' || e.target.name === 'price' || e.target.name === 'stockcount' ?
                    Number(e.target.value) : e.target.value
        })
    }

    async function editBooks(e) {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/books/${books.id}`, books)
            console.log(res.data);
            myNavi("/")
        }
        catch (error) {
            console.log(error);

        }
    }
    return <>
        <div className="add-page bg-white view-page bg-white shadow-lg p-4 w-50">
            <h3 className="text-center bg-info border rounded">Edit Books</h3>
            <div className="container">
                <form action="" onSubmit={editBooks} className="w-50 mx-auto">
                    <h3>{books.bookId}</h3>
                    <div className="form-group">
                        <input type="text" name="bookname" value={books.bookname} onChange={handlechange} placeholder="Book Name" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="author" value={books.author} onChange={handlechange} placeholder="Book Author" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="imgurl" value={books.imgurl} onChange={handlechange} placeholder="Book Imgurl" className="form-control" required />
                    </div>
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
                    <input type="submit" value="update" />
                </form>
            </div>
        </div>
    </>
}