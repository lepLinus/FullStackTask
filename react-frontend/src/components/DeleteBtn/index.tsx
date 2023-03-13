import axios from 'axios';

const DeleteButton: React.FC<{currentBookId: string}> = props => {
    const currentBookId = props.currentBookId;

    const deleteEntry = (id: string) => {
        axios.delete("http://localhost:8080/delbook/" + id).then(
        (resp) => {    
            console.log(resp);
            window.location.reload();
        });
    }

    return (
        <button onClick={() => deleteEntry(currentBookId)}>Delete</button>   
    );
}
export default DeleteButton;