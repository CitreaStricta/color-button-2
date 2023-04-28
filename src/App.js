import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
export function replaceCamelWithSpaces (colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App () {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed')
  const [checkBox, setCheckBox] = useState(false)

  const newButtonColor = () => {
    if (buttonColor === 'MediumVioletRed') {
      setButtonColor('MidnightBlue')
    } else {
      setButtonColor('MediumVioletRed')
    }
  }

  const toggleCheckBox = () => {
    if (checkBox === false) setCheckBox(true)
    else setCheckBox(false)
  }

  return (
    <div>
      <button
        onClick={newButtonColor}
        style={{ backgroundColor: checkBox === true ? 'gray' : buttonColor }}
        disabled={checkBox}
      >
        Change to{' '}
        {buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'}
      </button>
      <input
        id="disable-button-checkbox"
        type="checkbox"
        defaultChecked={checkBox}
        onClick={toggleCheckBox}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  )
}

export default App
