import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Locations from './Locations'
import Affiliations from './Affiliations'
import ReactPaginate from 'react-paginate';


const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

function TableList() {
    const [people, setPeople] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const limit = 10

    useEffect(()=>{
        Axios.get(`http://localhost:3000/api/v1/people?page=1&limit=${limit}`)
        .then(resp => {
            setPeople(resp.data.data)
            setPageCount(resp.data.links.total_page)

        })
        .catch(resp => console.log(resp))
    }, [])

    const lists = people.map(person =>{

        return(
            <tr key={person.id}>
                <td>{ capitalize(person.attributes.first_name) }</td>
                <td>{ capitalize(person.attributes.last_name) }</td>
                <td><Locations data={person.relationships.person_locations.links.data}/></td>
                <td>{ capitalize(person.attributes.species) }</td>
                <td>{ capitalize(person.attributes.gender) }</td>
                <td><Affiliations data = {person.relationships.person_affiliations.links.data}/></td>
                <td>{ capitalize(person.attributes.weapon) }</td>
                <td>{ capitalize(person.attributes.vehicle) }</td>
            </tr>
            )
            })


        const fetchPeople = async (currentPage) =>{
            Axios.get(`http://localhost:3000/api/v1/people?page=${currentPage}&limit=${limit}`)
                .then(resp => {
                    setPeople(resp.data.data)
                    setPageCount(resp.data.links.total_page)
                })
                .catch(resp => console.log(resp))
        }

        const handlePageClick = async (data) = await fetchPeople(data.selected+1)

        }

  return (
        <>
            <form id="csv-form" className="col-md-6 col-xs-12">
                <div className="input-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search..."/>
                    <button className="btn btn-outline-secondary" type="button"><i className="bi bi-search"></i></button>
                </div>
            </form>
            <div className="col col-md-12 col-xs-12 mt-5">
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Species</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Affiliations</th>
                    <th scope="col">Weapon</th>
                    <th scope="col">Vehicle</th>
                    </tr>
                </thead>
                <tbody>
                    {lists}
                </tbody>
                </table>

                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </>
  )
}

export default TableList