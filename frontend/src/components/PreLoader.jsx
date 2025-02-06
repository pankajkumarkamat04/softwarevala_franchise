import React from 'react'
import "../assets/css/loader.css"

const PreLoader = () => {
    return (
        <div className="preloader">
            <div className="spinner"></div>
            <p className="loading-text">Loading...</p>
        </div>
    )
}

export default PreLoader