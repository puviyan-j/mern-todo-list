import axios from 'axios';
import React from 'react';

function Todolist({ list, id, updated, update ,edit,token}) {

  const deletes = (id) => {

    axios.delete(`http://localhost:5000/api/del/${id}`, { headers: { Authorization: token} })
      .then(res => updated(!update))
      .catch(err => alert(err.response.data.error))
  }



  return (
    <div className='container border  border-primary p-1 d-flex justify-content-between mt-2'>
      <div>{list}</div>
      <div className=''>
        <button onClick={()=>edit(list,id)} className='btn btn-outline-warning p-1'>edit</button>
        <button onClick={() => deletes(id)} className='btn btn-outline-danger p-1'>deleted</button>
      </div>

    </div>
  )
}

export default Todolist