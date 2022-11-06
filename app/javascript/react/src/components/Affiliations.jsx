import React from 'react'

function Affiliations({data}) {

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

export default Affiliations