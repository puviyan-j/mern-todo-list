import React, { useState } from 'react';
import axios from "axios"


function Login({ login ,logedin}) {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [user, setuser] = useState({})


    const login_value = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/api/login", {
            email: email,
            password: password
        }).then(res => { setuser();
        
            localStorage.setItem("token",res.data.gen_token)

            logedin(true)
        })
            .catch(err => alert(err.response.data.error))


    }

    return (
        <div className='container login d-flex justify-content-center align-items-center'>

            <div className=' br-5 border  border-primary col-md-5 p-3'>
                <form onSubmit={login_value}>
                    <h3 className='text-center'>login</h3>
                    <input
                        type="text"
                        value={email}
                        onChange={e => { setemail(e.target.value) }}
                        className="form-control mt-3 "
                        placeholder="Email" />

                    <input
                        type="password"
                        value={password}
                        onChange={e => { setpassword(e.target.value) }}
                        className="form-control mt-3"
                        placeholder="Password" />
                    <input
                        type="submit"
                        className="btn form-control btn-primary my-3" />

                </form>

                <p>donot have a account <span onClick={() => login(false)} className='text-primary'>Signup</span> please</p>
            </div></div>
    )
}

export default Login