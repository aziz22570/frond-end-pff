import React, { useEffect, useState } from 'react'
import { useUpdateUser } from '../../../../API/User'
import Input from '../../input/Input'
import Button from '../../button/Button'

const SecuritySettingForm = () => {

  const [recentPasswordInput,setRecentPasswordInput] = useState("")
  const [newPasswordInput,setNewPasswordInput] = useState("")
  const [btnText,setBtnText] = useState("Update")
  const {updateData} = useUpdateUser()



  const handleRecentPasswordInput = (e) => {
    setRecentPasswordInput(e.target.value)
  }
  const handleNewPasswordInput = (e) => {
    setNewPasswordInput(e.target.value)
  }
  const handleUpdate = async() => {
    btnText === "Save" && await  updateData({"recentPassword": recentPasswordInput, "newPassword": newPasswordInput})

    btnText === "Update" ? setBtnText("Save") : setBtnText("Update");
  
  }
  const handleCancel = () => {
    setBtnText("Update");
    setRecentPasswordInput("")
    setNewPasswordInput("")
  }
  
  return (
    <div>
          <div className="d-flex align-items-baseline flex-column">
      <Input
        type={"text"}
        id={"email"}
        text={"Recent password:"}
        value={recentPasswordInput}
        onChange={handleRecentPasswordInput}
        placeholder={"********"}
        disabled={btnText === "Update"}

      />
            <Input
        type={"text"}
        id={"numer"}
        text={"New Password:"}
        value={newPasswordInput}
        onChange={handleNewPasswordInput}
        disabled={btnText === "Update"}

      />
            <div className="d-flex pt-4 w-100 justify-content-end">
        {/* <Button text="Annuler" type="bgw" w="w100" onClick={addCategory} /> */}
        { btnText === "Save" && <Button text="Cancel" type="bgw" w="w100" onClick={handleCancel} />}

        <Button text={btnText} type="bgb" w="w100" onClick={handleUpdate} />
      </div>
    </div>
    </div>
  )


}

export default SecuritySettingForm

