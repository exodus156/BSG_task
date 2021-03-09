import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import "./extraStyles/Splash.css"
import M from 'materialize-css';

const Splash = ({ updateUser }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    useEffect(() => {
        M.AutoInit()
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsPending(true)

        const payload = {
            "Username": login,
            "Password": password
        }

        const response = await fetch('https://thebetter.bsgroup.eu/Authorization/SignIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if(response.ok === true){
            const data = await response.json();
            updateUser(data);
            setIsPending(false)
            history.push('/BSG_task/home')

        }
        else{
            const data = await response.json();
            setErrorMessage(data.Message);
            setIsPending(false)
        }
    }

    return(
        <>
            <header className="row">
                <h3 className="col s10 offset-s1 center-align purple-text text-darken-3">Witaj, proszę zaloguj się</h3>
            </header>
            <main className="row">
                <form className="col s10 offset-s1 center-align" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12 l8 offset-l2">
                            <i className="material-icons prefix purple-text text-darken-3">account_circle</i>
                            <label htmlFor="LoginInput">Login</label>
                            <input type="text" id="LoginInput" value={login} onChange={(e) => {setLogin(e.target.value)}} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 l8 offset-l2">
                            <i className="material-icons prefix purple-text text-darken-3">lock</i>
                            <label htmlFor="PasswordInput">Hasło</label>
                            <input type="password" id="PasswordInput" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                        </div>
                    </div>
                    {isPending ? <div className="row"><button className="btn waves-effect waves-light purple lighten-2 ld-ext-right running">Wczytywanie <div className="ld ld-ring ld-spin"></div></button></div> 
                    : <div className="row"><button type="submit" className="btn waves-effect waves-light purple darken-3">Zaloguj się <i className="material-icons right">send</i></button></div>}
                    {errorMessage.length > 0 && 
                    <div className="row">
                        <h6 className="col s10 offset-s1 center-align red-text text-darken-1 text-accent-3" style={{fontWeight: "bold"}}>{errorMessage}</h6>
                    </div>}
                </form>
            </main>
        </>
    )
}

export default Splash;