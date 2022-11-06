import React from 'react'

function Locations({data}) {

const lists = data.map(list =>{
    return (
        <span key = { list.id } className="m-1">
        {
            list.name
        }
        </span>
    )
})

  return (
    <>
    {
        lists
    }
    </>
  )
}

export default Locations