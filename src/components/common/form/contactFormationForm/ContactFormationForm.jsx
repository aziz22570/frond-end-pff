import React, { useEffect, useState } from 'react'
import Input from '../../input/Input'
import Button from '../../button/Button'
import { useUpdateUser } from '../../../../API/User'

const ContactFormationForm = ({email,number,visitor}) => {
  const [emailInput,setEmailInput] = useState(email)
  const [numberInput,setNumberInput] = useState(number)
  const [btnText,setBtnText] = useState("Update")
  const {updateData} = useUpdateUser()


  useEffect(() =>setEmailInput(email),[email])
  useEffect(() =>setNumberInput(number),[number])
  const handleEmailInput = (e) => {
    setEmailInput(e.target.value)
  }
  const handleNumberInput = (e) => {
    setNumberInput(e.target.value)
  }
  const handleUpdate = async() => {
    btnText === "Save" && await  updateData({"email": emailInput, "number": numberInput})
    btnText === "Update" ? setBtnText("Save") : setBtnText("Update");

  
  }
  const handleCancel = () => {
    setBtnText("Update");
    setEmailInput(email)
    setNumberInput(number)
  }
  
  return (
    <div>
          <div className="d-flex align-items-baseline flex-column">
      <Input
        type={"text"}
        id={"email"}
        text={"Email:"}
        value={emailInput}
        onChange={handleEmailInput}
        disabled={btnText === "Update"}
      />
            <Input
        type={"text"}
        id={"numer"}
        text={"Phone Number:"}
        value={numberInput}
        onChange={handleNumberInput}
        disabled={btnText === "Update"}

      />
            <div className="d-flex pt-4 w-100 justify-content-end">
        {/* <Button text="Annuler" type="bgw" w="w100" onClick={addCategory} /> */}
        { btnText === "Save" && <Button text="Cancel" type="bgw" w="w100" onClick={handleCancel} />}

      {!visitor &&  <Button text={btnText} type="bgb" w="w100" onClick={handleUpdate} />}
      </div>
    </div>
    </div>
  )
}

export default ContactFormationForm