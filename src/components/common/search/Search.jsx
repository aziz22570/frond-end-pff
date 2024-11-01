import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Search = ({search,resultRef}) => {
  const [value,setValue] = useState(search)
  const navigate = useNavigate()
useEffect(() =>{
        if(!value){  
  navigate('/formations')}},[value,navigate])

  const handleSearch = (e) => {
    e.preventDefault()
    if(value){  
      navigate(`/formations/${value}`)}
      if(resultRef){resultRef.current.scrollIntoView({ behavior: 'smooth' });}
      

  }
  const resetSearch = (e) => {
    setValue("")
  }
  const handleinput = (e) => {
    setValue(e.target.value)
  }
  return (
    <section className={styles.section}>
    <div className={styles.container}>
      <h1 className={styles.searchTitle}>Navigate Training by Category</h1>
      <p className={styles.searchText}>
        Find your Training effortlessly using our category-based search.
        Simply select your area of interest, and discover the perfect
        certification for you.
      </p>
      <form className={styles.searchForm}>
        <input type="search" value={value} onChange={handleinput}/>
        {value && <button className={styles.clear} onClick={resetSearch} type="submit">{<IoClose color="red" />}</button>}
        <button className={styles.search} onClick={handleSearch} type="submit">{<FaSearch color="white" />}</button>
      </form>
    </div>
    </section>
  );
};

export default Search;
