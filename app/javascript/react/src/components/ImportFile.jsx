import React, { useState } from 'react'

const ImportFile = () => {
    const [csvFile, setCsvFile] = useState();

    const processCSV = (str, delim=',') => {
        // header
        const headers = splitHeaders(str)
        // rows
        const rows = str.slice(str.indexOf('\r\n')+1).split('\r\n');
        const newArray = rows.map(row =>{
            if (row.indexOf('"') !== -1) row = replaceRange(row, row.indexOf('"')+1, row.indexOf('"',row.indexOf('"')+1,','))
            const values = splitFirstAndLastName(row.split(delim))
            const eachObject = headers.reduce((obj, header, i)=>{
                obj[header] = values[i].trim();
                return obj
            }, {})
            return eachObject
        })

        console.log(newArray)

    }

    //split headers
    const splitHeaders = (str, delim=',') =>{
        let headers = str.slice(0,str.indexOf('\r\n')).toLowerCase().split(delim);
        headers.shift()
        headers.unshift('first_name', 'last_name')

        return headers
    }

    //split names to firstname and lastname
    const splitFirstAndLastName = (arr) =>{

        let firstname, lastname = ''
        const names = arr[0].split(' ')
        for (let i = 0; i < names.length; i++) {
            if(i===0){
                firstname = names[0]
            }else{
                lastname += names[i]+' '
            }
        }
        arr.shift()
        arr.unshift(firstname.trim(), lastname.trim())

        return arr

    }
    // to replace the string in some range
    const replaceRange = (str, start, end, findStr=',', replacement=':') =>{
        return str.substring(0, start-1) + str.substring(start, end).replace(findStr, replacement) + str.substring(end+1);
    }

    const submit = () => {

        const file = csvFile
        const reader = new FileReader()

        reader.onload = function(e){
            const text = e.target.result
            processCSV(text)
        }
        reader.readAsText(file)
    }
    

    return (
        <form id="csv-form" className="col col-md-6">
            <div className="input-group">
                <input
                    className="form-control"
                    type="file"
                    accept=".csv"
                    id="csvFile"
                    onChange = {(e) => {setCsvFile(e.target.files[0])}}
                />
                <button
                type="submit"
                className="btn btn-outline-secondary"
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}
                >Import CSV</button>
            </div>
        </form>
        )
}

export default ImportFile