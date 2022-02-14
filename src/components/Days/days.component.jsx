import React from 'react'
import Day from './day'
import { v4 as uuidv4 } from 'uuid';
import './days.styles.css'

const Days = ({ options, getDay }) => {
    
  return (
    <div className='options-wrapper'>
        {
            options.map(options => (
                <Day 
                text={options}
                key={uuidv4()}
                getDay={getDay}
                />
            ))
        }
    </div>
  )
}

export default Days