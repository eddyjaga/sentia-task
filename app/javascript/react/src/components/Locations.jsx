import React from 'react'

function Locations({data}) {

const lists = data.map(list =>{
    return (
        <span key = { list } className="m-1">
        {
            list
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