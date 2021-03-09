import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './extraStyles/Home.css'
import M from 'materialize-css';

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

    useEffect(() => {
        M.AutoInit()
    }, [])

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
            history.push('/BSG_task/')            
        }
    }
    
    if(userData.AuthToken.Token === undefined){
        history.push('/BSG_task/');
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
    return(
        <>
            <section className="row">
                <div className="row">
                    <h3 className="col s10 offset-s1 center-align purple-text text-darken-3">Wybierz listę z filmami:</h3>
                </div>
                <div className="row">
                    <div className="input-field col s10 offset-s1 l8 offset-l2">
                        <select onChange={(e) => {handleListSelect(e.target.value)}} defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>Wybierz listę...</option>
                            <option value="1">Lista 1</option>
                            <option value="2">Lista 2</option>
                            <option value="3">Lista 3</option>
                            <option value="4">Lista 4</option>
                            <option value="5">Lista 5</option>
                            <option value="6">Lista 6</option>
                            <option value="7">Lista 7</option>
                            <option value="8">Lista 8</option>
                            <option value="9">Lista 9</option>
                            <option value="10">Lista 10</option>
                            <option value="11">Lista 11</option>
                            <option value="12">Lista 12</option>
                            <option value="13">Lista 13</option>
                            <option value="14">Lista 14</option>
                            <option value="15">Lista 15</option>
                            <option value="16">Lista 16</option>
                            <option value="17">Lista 17</option>
                            <option value="18">Lista 18</option>
                            <option value="80">Lista 80</option>
                        </select>
                    </div>                    
                </div>
            </section>
            <section className="row">
                {noContent && <h5 className="col s10 offset-s1 center-align purple-text text-darken-3">Brak filmów do wyświetlenia</h5>}
                {isPending && <div className="center-align">
                                <div className="preloader-wrapper big active">
                                  <div className="spinner-layer">
                                    <div className="circle-clipper left">
                                      <div className="circle"></div>
                                    </div><div className="gap-patch">
                                      <div className="circle"></div>
                                    </div><div className="circle-clipper right">
                                      <div className="circle"></div>
                                    </div>
                                  </div>
                                </div>
                            </div>}
                {!noContent &&
                <ul className="row" style={{justifyContent: "space-between"}}>
                    {mediaList.map((video) => {
                        let filtered = video.Images.filter((type) => {
                            return type.ImageTypeCode === "FRAME"
                        })
                        return <li key={video.Id} className="col s10 offset-s1 l6">
                            <div className="card hoverable sticky-action">
                                {filtered.length !== 0 && 
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" alt={`COVER_${video.Id}`} src={filtered[0].Url} />
                                </div>}
                                <div className="card-content">
                                    <span className="card-title activator purple-text text-darken-3" style={{fontWeight: 420}}>{video.Title}<i className="material-icons purple-text text-darken-3 right">more_vert</i></span>
                                </div>
                                <div className="card-action center-align">
                                    <Link to={`/BSG_task/player/${video.Id}`}><button className="btn waves-effect waves-light purple darken-1">Przejdź do filmu <i className="material-icons right">movie</i></button></Link>
                                </div>
                                {video.Description !== undefined && <div className="card-reveal">
                                    <span className="card-title activator purple-text text-darken-3" style={{fontWeight: 420}}>{video.Title}<i className="material-icons purple-text text-darken-3 right">close</i></span>
                                    <p>{video.Description}</p>
                                </div>}
                            </div>
                        </li>
                        
                    })}    
                </ul>}
            </section>
            {totalCount > 10 && 
            <section>
                <ul className="pagination row" onClick={(e) => {handlePageSelect(e.target.parentElement.id)}}>
                    {pagesOutput.map((page) => {
                        return <li key={page} id={page} className="col s10 offset-s1 m4" style={{marginBottom: 20}}>
                            <button className="btn waves-effect waves-light purple darken-3">Strona {page}</button>
                        </li>
                    })}
                </ul>    
            </section>}
            <section className="row center-align">
                <Link to="/BSG_task/"><button className="btn waves-effect waves-light purple darken-3">Wstecz</button></Link>
            </section>
        </>
    )
}

export default Home;
                            