import React from 'react'
import './day.styles.css'

const Day = ({ text, getDay }) => {
  return (
    <div >
        <input onSelect={getDay} className='option' type="text" readOnly value={text} />
    </div>
  )
}

export default Day