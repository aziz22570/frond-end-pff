import React, { useEffect, useState } from 'react'
import { useUpdateUser } from '../../../../API/User'
import Input from '../../input/Input'
import Button from '../../button/Button'

const SecuritySettingForm = () => {

  const [recentPasswordInput,setRecentPasswordInput] = useState("")
  const [newPasswordInput,setNewPasswordInput] = useState("")
  const [btnText,setBtnText] = useState("Update")
  const {updateData} = useUpdateUser()
  const [passwordError, setPasswordError] = useState([]);

  function removeValue(arr, valueToRemove) {
    return arr.filter(value => value !== valueToRemove);
  }


  
  const handleBlurPassword = ()=>{
    const errors = {
      security: "-one lowercase letter,uppercase letter,one digit and one special character is required.",
      length: "-Password must be at least 8 characters long."
    };
  
    // Define password validation regexes
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialRegex = /[@$!%*?&]/;
    // validate password format
    let errorMessages = [];

    if (!lowercaseRegex.test(newPasswordInput) || !uppercaseRegex.test(newPasswordInput) || !digitRegex.test(newPasswordInput) || !specialRegex.test(newPasswordInput)) {
      errorMessages.push(errors.security);
    }
    if (newPasswordInput.length < 8) {
      errorMessages.push(errors.length);
    }
    if (errorMessages.length > 0) {
      setPasswordError(errorMessages); // Combine all error messages
    } else {
      setPasswordError(""); // Clear error if all validations are satisfied
    }

  }




  const handleRecentPasswordInput = (e) => {
    setRecentPasswordInput(e.target.value)
  }
  const handleNewPasswordInput = (e) => {
    setNewPasswordInput(e.target.value)
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialRegex = /[@$!%*?&]/;
    let errors = [...passwordError]; // Create a shallow copy of passwordError to modify
        // Handle regex check
        if(errors.length > 0) {
          if (!lowercaseRegex.test(e.target.value) || 
            !uppercaseRegex.test(e.target.value) || 
            !digitRegex.test(e.target.value) || 
            !specialRegex.test(e.target.value)) {
          if (!errors.includes("-one lowercase letter,uppercase letter,one digit and one special character is required.")) {
            errors.push("-one lowercase letter,uppercase letter,one digit and one special character is required.");
          }
        } else {
          errors = removeValue(errors, "-one lowercase letter,uppercase letter,one digit and one special character is required.");
        }
      
        // Handle length check
        if (e.target.value.length < 8) {
          if (!errors.includes("-Password must be at least 8 characters long.")) {
            errors.push("-Password must be at least 8 characters long.");
          }
        } else {
          errors = removeValue(errors, "-Password must be at least 8 characters long.");
        }
      
        // Update state
        setPasswordError(errors.length > 0 ? errors : "");
        }

    
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
        onBlur={handleBlurPassword}

      />
      {passwordError.length > 0 && 
    passwordError.map((error, index) => <p key={index} style={{fontSize: "11px",alignSelf:"baseline",textAlign: "left",width:"230px"}} className='text-danger'> {error} </p>)
    }
            <div className="d-flex pt-4 w-100 justify-content-end">
        {/* <Button text="Annuler" type="bgw" w="w100" onClick={addCategory} /> */}
        { btnText === "Save" && <Button text="Cancel" type="bgw" w="w100" onClick={handleCancel} />}

        <Button text={btnText} type="bgb" w="w100" onClick={handleUpdate} disabled={(passwordError || !recentPasswordInput || !newPasswordInput )  &&  btnText === "Save" } />
      </div>
    </div>
    </div>
  )


}

export default SecuritySettingForm

