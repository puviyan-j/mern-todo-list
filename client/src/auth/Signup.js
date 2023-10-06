import React, { useState } from 'react'
import axios from 'axios'

function Signup({ login }) {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const signup = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/register", {
            name: name,
            email: email,
            password: password
        })
            .then(
                res => {
                    console.log(res.data)
                    if (res.status === 200) {
                        login(true)
                    }
                }
            )
            .catch(error => alert(error.response.data))
    }


    return (
        <div className='container login d-flex justify-content-center align-items-center'>

            <div className=' br-5 border  border-primary col-md-5 p-3'>
                <form onSubmit={signup}>
                    <h3 className='text-center'>Signup</h3>
                    <input type="text" value={name} onChange={e => { setname(e.target.value) }} class="form-control mt-3 " placeholder="Name" />
                    <input type="text" value={email} onChange={e => { setemail(e.target.value) }} class="form-control mt-3 " placeholder="Email" />
                    <input type="password" value={password} onChange={e => { setpassword(e.target.value) }} class="form-control mt-3" placeholder="Password" />
                    <input type="submit" class="btn form-control btn-primary my-3" />
                    <p>already have a account please <span onClick={() => login(true)} className='text-primary'>login</span></p>
                </form>
            </div></div>
    )
}

export default Signup