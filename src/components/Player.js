import { useParams } from "react-router-dom";

const Player = ({userData}) => {
    const {id} = useParams();
    const numberID = parseInt(id);
    

    const fetchVideo = async (token) => {
        const response = await fetch('https://thebetter.bsgroup.eu/Media/GetMediaPlayInfo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: {
                "MediaId": numberID
            }
        })
        console.log(response);
        const data = response.json();
        console.log(data);
    }

    fetchVideo(userData.AuthToken.Token)
    return(
        <h1>Player {id}</h1>
    )
}

export default Player;