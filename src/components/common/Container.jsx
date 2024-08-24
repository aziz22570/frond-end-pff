import { useSelector } from "react-redux"


const Container = ({children}) => {
  const meeting = useSelector((state)=>state.user.meeting)
  const admin = useSelector((state) => state.user.admin);


  return (
    <div className={`${!meeting && !admin && "container py-2"} `}>{children}</div>

  )
}

export default Container