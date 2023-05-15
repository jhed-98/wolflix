import React from 'react'

interface SpinnerProps {
    initial?: boolean
}
const Spinner: React.FC<SpinnerProps> = ({ initial }) => {
    return (
        // loadingSpinner   initial
        <div className={`loadingSpinner w-full relative flex items-center justify-center ${initial ? "h-[700px]" : "h-36"}`}>
            {/* spinner */}
            <svg className="spinner z-[2] w-14 h-14 animate-rotate" viewBox="0 0 50 50">
                {/* path */}
                <circle
                    className="path text-red-600 stroke animation-dash stroke-current"
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
