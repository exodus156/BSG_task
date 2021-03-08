import { useState } from "react";
import { useHistory } from "react-router-dom"

const Splash = ({ updateUser }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()
    
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
            history.push('/home')

        }
        else{
            const data = await response.json();
            setErrorMessage(data.Message);
            setIsPending(false)
        }
    }

    return(
        <>
            <header>
                <h1>Welcome, please log in</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <div className="inputField">
                        <label htmlFor="LoginInput">Login</label>
                        <input type="text" id="LoginInput" value={login} onChange={(e) => {setLogin(e.target.value)}} />
                    </div>
                    <div className="inputField">
                        <label htmlFor="PasswordInput">Password</label>
                        <input type="text" id="PasswordInput" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    {isPending ? <button disabled>Loading...</button> : <button type="submit">Sign in</button>}
                </form>
                {errorMessage.length > 0 && <div className="errorMessage">{errorMessage}</div>}
            </main>
        </>
    )
}

export default Splash;