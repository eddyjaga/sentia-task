import React from 'react'

function Affiliations({data}) {

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

export default Affiliations