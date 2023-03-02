import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

interface MyObj {
  content: [{Id: string,Title: string,Author: string,Description: string}];
}

const App = () => {
  const [books,setBooks] = useState({} as MyObj);
  const [currentBookId,setCurrentBookId] = useState("");
  const [currentBookTitle,setCurrentBookTitle] = useState("");
  const [currentBookAuthor,setCurrentBookAuthor] = useState("");
  const [currentBookDescription,setCurrentBookDescription] = useState("");

  useEffect(() => {
    console.log("Start and get books");
    setCurrentBookId(window.localStorage.getItem('BOOK_ID') ?? "");
    setCurrentBookTitle(window.localStorage.getItem('BOOK_TITLE') ?? "");
    setCurrentBookAuthor(window.localStorage.getItem('BOOK_AUTHOR') ?? "");
    setCurrentBookDescription(window.localStorage.getItem('BOOK_DESC') ?? "");
    
    const fetchData = async () => {
      axios.get("http://localhost:8080/books").then((resp) => {
      const ob = resp.data as MyObj;
      setBooks(ob);
      });
    };
    fetchData();
  },[]);

  //Update the current book
  const displayBookInfo = (id: string) => {
    if(books.content){
      books.content.forEach((book) => {
        if(book.Id == id){
          setCurrentBookId(book.Id);
          setCurrentBookTitle(book.Title);
          setCurrentBookAuthor(book.Author);
          setCurrentBookDescription(book.Description);
          saveLocal("BOOK_ID",book.Id);
          saveLocal("BOOK_TITLE",book.Title);
          saveLocal("BOOK_AUTHOR",book.Author);
          saveLocal("BOOK_DESC",book.Description);
        }});
    }
  }

  //Update the information of a book inside books database
  const updateEntry = (id: string) => {
    axios.post("http://localhost:8080/editbook/" + id,
    {id: currentBookId, title: currentBookTitle,author: currentBookAuthor,description: currentBookDescription}).then(
      (resp) => {    
        console.log(resp);
        window.location.reload();
      }); 
  }
  //Add new book to database
  const adNewEntry = () => {
    axios.post("http://localhost:8080/adbook",
    {title: currentBookTitle,author: currentBookAuthor,description: currentBookDescription}).then(
      (resp) => {
        console.log(resp);
        window.location.reload();
      });
  }
  //delete a book inside books database
  const deleteEntry = (id: string) => {
    axios.delete("http://localhost:8080/delbook/" + id).then(
      (resp) => {    
        console.log(resp);
        window.location.reload();
      });
  }
  
  const saveLocal = (key: string,value: string) => {
    window.localStorage.setItem(key,value);
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
        <div className="BookInfo">
          <p>Title</p>
        <input value={currentBookTitle} onInput={e => {setCurrentBookTitle(e.currentTarget.value); saveLocal("BOOK_TITLE",e.currentTarget.value)}}>
        </input>
          <p>Author</p>
        <input value={currentBookAuthor} onInput={e => {setCurrentBookAuthor(e.currentTarget.value); saveLocal("BOOK_AUTHOR",e.currentTarget.value)}}>
        </input>
          <p>Description</p>
        <input value={currentBookDescription} onInput={e => {setCurrentBookDescription(e.currentTarget.value); saveLocal("BOOK_DESC",e.currentTarget.value)}}>
        </input>
          <div className="ButtonGroup">
            <button onClick={() => adNewEntry()}>Save New</button>
            <button onClick={() => updateEntry(currentBookId)}>Save</button>
            <button onClick={() => deleteEntry(currentBookId)}>Delete</button>
          </div>
        </div>
        <div className="BookList">
          <div className="BookListContent">
            <>
              {books.content ? 
              books.content.map(
                (book) => {
                  return(
                    <div key={book.Id} className="BookListItem">
                    <button className="BookListItemButton" onClick={() => displayBookInfo(book.Id)} >
                      <p>
                      {book.Title}
                      </p>
                      <p>&emsp; | &emsp;</p>
                      <p>
                      {book.Author}
                      </p>
                    </button>
                    </div>
                    );
                }
              ) : ""}
            </>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
