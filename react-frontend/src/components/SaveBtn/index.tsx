import axios from 'axios';
import Book from '../../interfaces/Book';

const SaveButton: React.FC<{currentBook: Book}> = props => {
    const currentBook = props.currentBook;

    const updateEntry = (currentBook: Book) => {
        axios.post("http://localhost:8080/editbook/" + currentBook.Id,
        {id: currentBook.Id, title: currentBook.Title,author: currentBook.Author,description: currentBook.Description}).then(
        (resp) => {    
            console.log(resp);
            window.location.reload();
        }); 
    }
    return (
        <button onClick={() => updateEntry(currentBook)}>Save</button>   
    );
}
export default SaveButton;