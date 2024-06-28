import React from 'react'
import empty from "./empty.svg"
import Image from 'next/image'

interface EmptyStateProps{
    headerText: string,
    description: string,
}

const EmptyState = ({headerText, description}:EmptyStateProps) => {
    return (
        <div className='h-[50vh] flex flex-col items-center justify-center'>
            <Image src={empty} alt='Empty' height={100} width={100} />
            <h1 className='text-[#887f74] md:text-2xl font-bold'>{headerText}</h1>
            <p className='text-zinc-300 font-bold font-xl text-center'>{description}</p>
        </div>
    )
}

export default EmptyState