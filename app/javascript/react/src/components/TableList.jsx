import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Locations from './Locations'
import Affiliations from './Affiliations'

const baseUrl = 'http://localhost:3000/api/v1/people'

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

function TableList() {
    const [people, setPeople] = useState([])
    const [included, setIncluded] = useState([])

    useEffect(()=>{
        Axios.get(baseUrl)
        .then(resp => {
            setPeople(resp.data.data)
            setIncluded(resp.data.included)
        })
        .catch(resp => console.log(resp))
    }, [people.length])

    const lists = people.map(person =>{

        const locations = person.relationships.locations.data.map(location=>{
            let attributes = ''
            const locationAttributes = included.map(i =>{ if(i.type === location.type && i.id === location.id) attributes += i.attributes.name})
            return attributes
        })

        const affiliations = person.relationships.affiliations.data.map(affiliation=>{
            let attributes = ''
            const affiliationAttributes = included.map(i =>{ if(i.type === affiliation.type && i.id === affiliation.id) attributes += i.attributes.name})
            return attributes
        })



        return(
            <tr key={person.id}>
                <td>{ capitalize(person.attributes.first_name) }</td>
                <td>{ capitalize(person.attributes.last_name) }</td>
                <td><Locations data={locations}/></td>
                <td>{ capitalize(person.attributes.species) }</td>
                <td>{ capitalize(person.attributes.gender) }</td>
                <td><Affiliations data = {affiliations}/></td>
                <td>{ capitalize(person.attributes.weapon) }</td>
                <td>{ capitalize(person.attributes.vehicle) }</td>
            </tr>
            )
            })

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
            </div>
        </>
  )
}

export default TableList