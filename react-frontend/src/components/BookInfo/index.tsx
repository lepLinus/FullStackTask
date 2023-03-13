import DeleteButton from "../DeleteBtn";
import SaveButton from "../SaveBtn";
import SaveNewButton from "../SaveNewBtn";
import saveLocal from "../../helper/SaveLocal";
import Book from "../../interfaces/Book";

const BookInfo: React.FC<{ updateCurrentBook: (currentBook: Book) => void,currentBook: Book}> = props => {
    const currentBook = props.currentBook;
    const updateCurrentBook = props.updateCurrentBook;

    const setCurrentBookTitle =  (value: string) => {
        saveLocal("BOOK_TITLE",value);
        var updatedBook = currentBook;
        updatedBook.Title = value;
        updateCurrentBook(updatedBook);
    }
    const setCurrentBookAuthor =  (value: string) => {
        saveLocal("BOOK_AUTHOR",value);
        var updatedBook = currentBook;
        updatedBook.Author = value;
        updateCurrentBook(updatedBook);
    }
    const setCurrentBookDescription =  (value: string) => {
        saveLocal("BOOK_DESC",value);
        var updatedBook = currentBook;
        updatedBook.Description = value;
        updateCurrentBook(updatedBook);
    }
    return (
        <div className="BookInfo">
          <p>Title</p>
        <input value={currentBook.Title} onInput={e => {setCurrentBookTitle(e.currentTarget.value)}}>
        </input>
          <p>Author</p>
        <input value={currentBook.Author} onInput={e => {setCurrentBookAuthor(e.currentTarget.value)}}>
        </input>
          <p>Description</p>
        <input value={currentBook.Description} onInput={e => {setCurrentBookDescription(e.currentTarget.value)}}>
        </input>
          <div className="ButtonGroup">
            <SaveNewButton currentBook={currentBook} />
            <SaveButton currentBook={currentBook} />
            <DeleteButton currentBookId={currentBook.Id} />
          </div>
        </div>    
    );
}
export default BookInfo;