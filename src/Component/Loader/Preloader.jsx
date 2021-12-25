import React from 'react'
import "./Preloader.css"

function Preloader() {
    return (
        <div className="preload">
        <div className="text-center preload-item">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
}

export default Preloader
