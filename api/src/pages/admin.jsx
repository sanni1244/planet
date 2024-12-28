import React from 'react'
import { Link } from 'react-router-dom'


const Admin = () => {
    return (
        <>
            <p><Link to={'/admin1'}>Admin 1</Link></p>
            <p><Link to={'/admin2'}>Admin 2</Link></p>
            <p><Link to={'/admin3'}>Admin 3</Link></p>
        </>

    )
}

export default Admin