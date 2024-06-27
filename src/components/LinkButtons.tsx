import React from 'react'

interface LinkButton {
    buttonText: string
}

const LinkButtons = ({ buttonText }: LinkButton) => {
    return (
        <button className='px-3 py-2 bg-zinc-800 mx-2 rounded-lg hover:font-bold hover:text-black hover:bg-orange-200 duration-200'>
            {buttonText}
        </button>
    )
}

export default LinkButtons