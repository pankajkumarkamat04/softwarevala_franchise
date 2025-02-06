import React from 'react'

const DashboardTiles = ({ number, name }) => {
    return (
        <div className='col-md-2 admin-dashboard-tiles'>
            <p className='fs-1 d-inline-block pe-2'>{number}</p>
            <p className='d-inline-block'>{name}</p>
        </div>
    )
}

export default DashboardTiles