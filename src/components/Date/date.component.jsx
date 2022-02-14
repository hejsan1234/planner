import React, { useEffect, useState } from 'react'
import './date.styles.css'

const Dates = () => {

    const [date, setDate] = useState('')

    const getDate = () => {
        const currDate = new Date();
        setDate(currDate.toLocaleDateString('sv-SE'))
    }

    useEffect(() => {
        getDate();
    }, [])

  return (
    <div className='sv-date'>
        {date}
    </div>
  )
}

export default Dates