import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

const Home = ({userData}) => {
    const history = useHistory()
    if(userData.AuthToken.Token.lenght === 0){
        history.push('/');
    }
    return(
        <h1>Home</h1>
    )
}

export default Home;