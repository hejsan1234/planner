import react, { useEffect } from 'react'
import React from 'react'
import { useState } from 'react'

import './clock.styles.css'

const Clock = () => {

    const [time, setTime] = useState('')

    const getTime = () => {
        const date = new Date();
        setTime(date.toLocaleTimeString('sv-SE'))
    }

    useEffect(() => {
        setInterval(() => {
            getTime();
        }, 1000)
    }, [])

  return (
    <div className='clock'>
        {time}
    </div>
  )
}

export default Clock