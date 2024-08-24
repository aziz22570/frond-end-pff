import React, { memo, useEffect, useState } from 'react'
import Input from '../../../common/input/Input'

const Soustitle = ({canselProgramme,soustitle,index,disabled,handleProgramme,  setAddProgramme,cansel,
  addProgramme,id}) => {


    useEffect(()=>{
      if(cansel && canselProgramme ){
        setAddProgramme(canselProgramme)
      }
    },[cansel])

  const handleSoustitle = (e,index) => {
    setAddProgramme(
    addProgramme.map((programme) => {
      if (programme._id === id) {

        const newSoustitle = programme.soustitles


        newSoustitle[index] = e.target.value  ;


        return {
          title: programme.title,
          soustitles: newSoustitle
            
          }}
        
      return programme;
    })


  )
  };




  return (
  <>
    <Input
              type="text"
              value={soustitle}
              disabled={disabled}
              onClick={handleProgramme}
              translate={{
                transform: "translateX(35%)",
                width: "350px",
                height: "45px",
              }}
              onChange={(e) => handleSoustitle(e,index)}
            />
  </>
  )
}

export default memo(Soustitle)