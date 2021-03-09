import { useParams, useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

const Player = ({userData}) => {
    const {id} = useParams();
    const history = useHistory()
    const numberID = parseInt(id);
    
    if(userData.AuthToken.Token === undefined){
        history.push('/');
    }

    const fetchVideo = async (token) => {
        const response = await fetch('https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: {
                "MediaId": numberID,
                "StreamType": ""
            }
        })
        const data = response.json();
        console.log(data);
    }
    return(
        <>
            <section className="row">
                <h5 className="col s10 offset-s1 center-align purple-text text-darken-3">Tutaj powinien zostać wyświetlony film z MediaId wynoszącym {id}
                    , ale wysłanie zapytania na dwa udostępnione endpointy, zwraca błąd 403, przez co niemożliwym jest uzyskanie szczegółowych danych dotyczących filmu
                    wraz z linkiem do wyświetlenia jego. Przekazany link w instrukcji nie działa, zaś do drugi dostępny, zwraca błąd 400 przy próbie przesłania
                    "StreamType", zaś po przetestowaniu na Swaggerze, również zwraca błąd 403. Oba linki przetestowałem tutaj, na Swaggerze oraz wykorzystując Postmana.

                    Stąd, co by nie zostawiać strony pustej, wrzucam playera + podczepiony do niego film z youtube :)
                </h5>
            </section>
            <section className="video-container" style={{marginBottom: 30, marginLeft: 40, marginRight: 40}}>
                <ReactPlayer width='100%' height='100%' url="https://www.youtube.com/watch?v=vaOAOaOBEOU" controls="true"/>            
            </section>
            <section className="row center-align">
                <Link to="/home"><button className="btn waves-effect waves-light purple darken-3">Wstecz</button></Link>
            </section>
        </>
    )
}

export default Player;