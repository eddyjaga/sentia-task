import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Locations from './Locations'
import Affiliations from './Affiliations'
import ReactPaginate from 'react-paginate';


const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

function TableList() {
    const [people, setPeople] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [searchText, setSearchText] = useState("")
    const [order, setOrder] = useState("ASC")
    const [sortedIcon, setSortedIcon] = useState("")
    const [clickedCol, setClickedCol] = useState("")
    const limit = 10

    useEffect(()=>{
        Axios.get(`http://localhost:3000/api/v1/people?page=1&limit=${limit}&q=${searchText}`)
        .then(resp => {
            setPeople(generateData(resp.data.data))
            setPageCount(resp.data.links.total_page)

        })
        .catch(resp => console.log(resp))
    },[])

    const generateData = (people)=>{
        const newArray =[]
        const lists = people.map(person =>{

            const a ={
                id: person.id,
                first_name: person.attributes.first_name,
                last_name: person.attributes.last_name,
                location: person.relationships.person_locations.links.data,
                species: person.attributes.species,
                gender: person.attributes.gender,
                affiliations: person.relationships.person_affiliations.links.data,
                weapon: person.attributes.weapon,
                vehicle: person.attributes.vehicle
            }

            newArray.push(a)
        })

        return newArray
    }

    const lists = people.map(person =>{

        return(
            <tr key={person.id}>
                <td>{ capitalize(person.first_name) }</td>
                <td>{ capitalize(person.last_name) }</td>
                <td><Locations data={person.location}/></td>
                <td>{ capitalize(person.species) }</td>
                <td>{ capitalize(person.gender) }</td>
                <td><Affiliations data = {person.affiliations}/></td>
                <td>{ capitalize(person.weapon) }</td>
                <td>{ capitalize(person.vehicle) }</td>
            </tr>
            )
            })


        const fetchPeople = async (currentPage) =>{


            Axios.get(`http://localhost:3000/api/v1/people?page=${currentPage}&limit=${limit}&q=${searchText}`)
                .then(resp => {
                    setPeople(generateData(resp.data.data))
                    setPageCount(resp.data.links.total_page)
                })
                .catch(resp => console.log(resp))
        }

        const handlePageClick = async (data)=>{
            setClickedCol("")
            let currentPage = data.selected + 1
            const peopleFormServer = await fetchPeople(currentPage)

        }

        const handleInput = (event) =>{
            //const value = typeof event.target.value !== 'underfined' ? setSearchText(event.target.value) : setSearchText("")
            setSearchText(event.target.value)
          
        }

        const handleEnterKeyPressed = async (event) =>{
            
            if(event.key === "Enter"){
                setClickedCol("")
                const peopleFormServer = await fetchPeople(1)
            }
        }

        const handleClickSearch = async ()=>{
            setClickedCol("")
            const peopleFormServer = await fetchPeople(1)
        }


        const sorting = (col)=>{

            setClickedCol(col)

            if(order === "ASC"){
                const sorted =[...people].sort((a,b)=>
                   a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
                )
                setSortedIcon('bi bi-sort-alpha-down')
                setPeople(sorted)
                setOrder("DSC")
            }else{
                const sorted =[...people].sort((a,b)=>
                    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
                )
                setSortedIcon('bi bi-sort-alpha-down-alt')
                setPeople(sorted)
                setOrder("ASC")
            }
        }

  return (
        <>
            <div id="csv-form" className="col-md-6 col-xs-12">
                <div className="input-group">
                    <input 
                    type="text" 
                    className="form-control"
                    onChange = {handleInput}
                    onKeyPress = {handleEnterKeyPressed}
                    
                    placeholder="Search..."/>
                    <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={handleClickSearch}
                    
                    ><i className="bi bi-search"></i></button>
                </div>
            </div>
            <div className="col col-md-12 col-xs-12 mt-5">
                <table className="table table-hover custom-table">
                <thead>
                    <tr>
                    <th scope="col" onClick={()=>sorting("first_name")}>First name<i className={ clickedCol === "first_name" ? sortedIcon : '' }></i></th>
                    <th scope="col" onClick={()=>sorting("last_name")}>Last name<i className={  clickedCol === "last_name" ? sortedIcon : ''  }></i></th>
                    <th scope="col">Location</th>
                    <th scope="col" onClick={()=>sorting("species")}>Species<i className={ clickedCol === "species" ? sortedIcon : '' }></i></th>
                    <th scope="col" onClick={()=>sorting("gender")}>Gender<i className={ clickedCol === "gender" ? sortedIcon : '' }></i></th>
                    <th scope="col">Affiliations</th>
                    <th scope="col" onClick={()=>sorting("weapon")}>Weapon<i className={ clickedCol === "weapon" ? sortedIcon : '' }></i></th>
                    <th scope="col" onClick={()=>sorting("vehicle")}>Vehicle<i className={ clickedCol === "vehicle" ? sortedIcon : '' }></i></th>
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