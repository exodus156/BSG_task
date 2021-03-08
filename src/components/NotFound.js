import { Link } from 'react-router-dom'
const NotFound = () => {
    return(
        <>
            <h1>Niesety, taka strona nie istnieje</h1>
            <Link to='/home'><button>Kliknij aby powrócić do strony głównej</button></Link>
        </>
    )
}

export default NotFound;