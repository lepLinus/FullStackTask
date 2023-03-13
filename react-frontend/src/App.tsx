import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import BookInfo from './components/BookInfo';
import BookList from './components/BookList';
import saveLocal from "./helper/SaveLocal";
import Book from './interfaces/Book';
import Books from './interfaces/Books';

const App = () => {
  const [books,setBooks] = useState({} as Books);
  const [currentBook,setCurrentBook] = useState({} as Book);

  useEffect(() => {
    var currentBook = {} as Book;
    currentBook.Id = window.localStorage.getItem('BOOK_ID') ?? "";
    currentBook.Title = window.localStorage.getItem('BOOK_TITLE') ?? "";
    currentBook.Author = window.localStorage.getItem('BOOK_AUTHOR') ?? "";
    currentBook.Description = window.localStorage.getItem('BOOK_DESC') ?? "";
    setCurrentBook(currentBook);

    const fetchData = async () => {
      axios.get("http://localhost:8080/books").then((resp) => {
      const ob = resp.data as Books;
      setBooks(ob);
      });
    };
    fetchData();
  },[]);

  const displayBookInfo = (id: string) => {
    if(books.content){
      books.content.forEach((book) => {
        if(book.Id == id){
          setCurrentBook(book);
          saveLocal("BOOK_ID",book.Id);
          saveLocal("BOOK_TITLE",book.Title);
          saveLocal("BOOK_AUTHOR",book.Author);
          saveLocal("BOOK_DESC",book.Description);
        }});
    }
  }

  return (
    <>
    <div className="App">
      <header className="App-header">
        <p>
          Book Explorer
        </p>
      </header>
      <div className="Body">
        <BookInfo currentBook={currentBook} updateCurrentBook={setCurrentBook}></BookInfo>
        <BookList onClick={displayBookInfo} books={books}></BookList>
      </div>
    </div>
    </>
  );
};

export default App;
