import React from 'react'

function TableList() {
  return (
        <>
            <form id="csv-form" className="col-md-6">
                <div className="input-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search..."/>
                    <button className="btn btn-outline-secondary" type="button"><i className="bi bi-search"></i></button>
                </div>
            </form>
            <div className="col-md-12 mt-5">
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
                    <tr>
                    <td>Darth</td>
                    <td>Vadar</td>
                    <td>Death Star, Tatooine</td>
                    <td>Human</td>
                    <td>Male</td>
                    <td>Sith</td>
                    <td>Lightsaber</td>
                    <td>Tiefighter</td>
                    </tr>
                    <tr>
                    <td>Darth</td>
                    <td>Vadar</td>
                    <td>Death Star, Tatooine</td>
                    <td>Human</td>
                    <td>Male</td>
                    <td>Sith</td>
                    <td>Lightsaber</td>
                    <td>Tiefighter</td>
                    </tr>
                    <tr>
                    <td>Darth</td>
                    <td>Vadar</td>
                    <td>Death Star, Tatooine</td>
                    <td>Human</td>
                    <td>Male</td>
                    <td>Sith</td>
                    <td>Lightsaber</td>
                    <td>Tiefighter</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </>
  )
}

export default TableList