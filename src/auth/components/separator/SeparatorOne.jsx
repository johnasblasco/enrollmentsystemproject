import React from 'react'

const SeparatorOne = ({ title }) => {
    return (
        <span className="flex items-center">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-600  w-32 md:w-72"></span>

            <span className="shrink-0 px-4 text-gray-900">{title}</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-600  w-32 md:w-72"></span>
        </span>
    )
}

export default SeparatorOne
