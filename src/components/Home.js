import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

const Home = ({userData}) => {
    const [noContent, setNoContent] = useState(false)
    const [mediaList, setMediaList] = useState([])
    const [mediaListID, setMediaListID] = useState()
    const [totalCount, setTotalCount] = useState()
    const [isPending, setIsPending] = useState(false)

    let userToken = ""
    let pagesOutput = []
    for(let i = 1; i <= Math.ceil(totalCount / 10); i++){
        pagesOutput.push(i)
    }
    
    const history = useHistory()
    const fetchData = async (token, listID, pageNumber) => {
        setNoContent(false)
        setIsPending(true)
        setMediaList([])

        const response = await fetch('https://thebetter.bsgroup.eu/Media/GetMediaList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "MediaListId": listID,
                "IncludeCategories": false,
                "IncludeImages": true,
                "IncludeMedia": false,
                "PageNumber": pageNumber,
                "PageSize": 10
            })
        })
        if(response.ok === true){
            if(response.status === 204){
                setNoContent(true)
                setIsPending(false)
            } else{
                const data = await response.json();
                setMediaList(data.Entities);
                setTotalCount(data.TotalCount)
                setNoContent(false)
                setIsPending(false)
            }
        }
        else{
            const data = await response.json();
            if(data.MessageKey === "UNAUTHORIZED"){ 
                history.push('/')
            }
            
        }
    }
    
    if(userData.AuthToken.Token === undefined){
        history.push('/');
    } else{
        userToken = userData.AuthToken.Token
    }
    
    const handleListSelect = (id) => {
        setTotalCount(0);
        const numberID = parseInt(id)
        setMediaListID(numberID)
        fetchData(userToken, numberID, 1)
        
    }

    const handlePageSelect = (page) => {
        const pageNumber = parseInt(page)
        fetchData(userToken, mediaListID, pageNumber)
    }
    console.log(mediaList);
    return(
        <>
            <section className="selectList">
                <p>Wybierz listę z filmami:</p>
                <ul onClick={(e) => {handleListSelect(e.target.id)}}>
                    <li><button id="1">Lista 1</button></li>
                    <li><button id="2">Lista 2</button></li>
                    <li><button id="3">Lista 3</button></li>
                    <li><button id="4">Lista 4</button></li>
                    <li><button id="5">Lista 5</button></li>
                    <li><button id="6">Lista 6</button></li>
                </ul>
            </section>
            <section className="output">
                {noContent && <p>Brak filmów do wyświetlenia</p>}
                {isPending && <p>Wczytywanie...</p>}
                {!noContent &&
                <ul>
                    {mediaList.map((video) => {
                        let filtered = video.Images.filter((type) => {
                            return type.ImageTypeCode === "FRAME"
                        })
                        console.log(filtered);
                        return <li key={video.Id}><Link to={`/player/${video.Id}`}>
                            <p>{video.Title}</p>
                            {filtered.length !== 0 && <img src={filtered[0].Url} alt="FRAME" width="320" height="320"/>}
                        </Link></li>
                    })}    
                </ul>}
            </section>
            {totalCount > 10 && 
            <section className="selectPage">
                <ul onClick={(e) => {handlePageSelect(e.target.parentElement.id)}}>
                    {pagesOutput.map((page) => {
                        return <li key={page} id={page}><button>Strona {page}</button></li>
                    })}
                </ul>    
            </section>}
        </>
    )
}

export default Home;