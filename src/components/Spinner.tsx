import React from 'react'
import "..//assets/scss/components/spinner.scss"

interface SpinnerProps {
    initial?: boolean
}
const Spinner: React.FC<SpinnerProps> = ({ initial }) => {
    return (
        <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
            <svg className="spinner" viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                ></circle>
            </svg>
        </div>
    )
}

export default Spinner