import Books from "../../interfaces/Books";

const BookList: React.FC<{ onClick: (id: string) => void ,books :Books}> = props => {
    const onClick = props.onClick;
    const books = props.books;
    return (
        <div className="BookList">
          <div className="BookListContent">
            <>
              {books.content ? 
              books.content.map(
                (book) => {
                  return(
                    <div key={book.Id} className="BookListItem">
                    <button className="BookListItemButton" onClick={() => onClick(book.Id)} >
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
    );
}
export default BookList;