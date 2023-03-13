import axios from 'axios';
import Book from '../../interfaces/Book';

const SaveNewButton: React.FC<{currentBook: Book}> = props => {
    const currentBook = props.currentBook;

    const adNewEntry = (currentBook: Book) => {
    axios.post("http://localhost:8080/adbook",
    {title: currentBook.Title,author: currentBook.Author,description: currentBook.Description}).then(
      (resp) => {
        console.log(resp);
        window.location.reload();
      });
    }
    return (
        <button onClick={() => adNewEntry(currentBook)}>Save New</button>   
    );
}
export default SaveNewButton;