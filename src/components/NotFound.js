import { Link } from 'react-router-dom'
const NotFound = () => {
    return(
        <>
            <header className="row">
                <h3 className="col s10 offset-s1 center-align purple-text text-darken-3">Niestety taka strona nie istnieje :(</h3>
            </header>
            <div className="row center-align" style={{marginTop: 60}}>
                <Link to="/"><button className="btn waves-effect waves-light purple darken-3">Kliknij aby powrócić na stronę główną</button></Link>
            </div>
        </>
    )
}

export default NotFound;