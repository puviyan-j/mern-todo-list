import React, { useEffect, useState } from 'react';
import "./todoinput.css";
import axios from 'axios';
import Todolist from './todolist';

function Todoinput({ logedin }) {
  const [todo, settodo] = useState("");
  const [token, settoken] = useState("");
  const [list, setlist] = useState([]);
  const [update, setupdate] = useState(false);
  const [edit, setedit] = useState(false);
  const [id, setid] = useState("")

  useEffect(() => {

    const tokens = localStorage.getItem("token")
    settoken(tokens);

    axios.get("http://localhost:5000/api/", { headers: { Authorization: tokens } })
      .then(res => setlist(res.data))
      .catch(error => console.log(error.response.data))

  }, [update,token])


  const addtodo = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/add", { list: todo }, { headers: { Authorization: token } })
      .then(res => {
        setlist([...list, res.data])
      })
      .catch(error => console.log("error", error.response))
    settodo("")
  }

  const signout = () => {
    localStorage.setItem("token", "")
    logedin("")
  }

  const updated = (req) => {
    setupdate(req)
  }
  const edits = (text, id) => {
    setedit(true);
    settodo(text);
    setid(id)

  }

  const edited = (e) => {
    e.preventDefault();
    console.log(id, todo)
    axios.put(`http://localhost:5000/api/update/${id}`, { list: todo }, { headers: { Authorization: token } })
    .then(res => {
      console.log(res.data)
      setupdate(!update);
      setedit(false);
      settodo("")
    })



  }

  return (
    <>
      <div className='container'>
        <div className=' mt-3 d-flex justify-content-end'>
          <button className=' btn btn-outline-danger' onClick={signout}>Signout</button>
        </div>


        <form
          onSubmit={addtodo}

          className="row g-1 mt-5">

          <div className="col-10">
            <input
              type="text"
              value={todo}
              onChange={e => { settodo(e.target.value) }}
              placeholder='add todo list...'
              className="form-control" />
          </div>

          <div className="col-auto">
            {edit ?
              <>
                <button type='button' onClick={edited} className="btn btn-primary mb-3 mx-1">update</button>
                <button type="button" onClick={() => { setedit(false); settodo("") }} className="btn btn-primary mb-3 mx-1">cancel</button> </> :
              <button type='submit' className="btn btn-primary mb-3 mx-1">Add</button>}
          </div>
        </form>




      </div>
      {list.map((list) => (<Todolist key={list._id} token={token} list={list.list} edit={edits} id={list._id} update={update} updated={updated} />))}

    </>
  )
}

export default Todoinput