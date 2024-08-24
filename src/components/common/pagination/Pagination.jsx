import React from 'react';
import styles from './styles.module.css'


const Pagination = ({currentPage,setCurrentPage,totalpage}) => {
  
  const handlePrevPage = ()=>{
    setCurrentPage(currentPage-1)
  }
  const handleNextPage = ()=>{
    setCurrentPage(currentPage+1)
    
  }
  const handlecurent = (pageNumber)=>{
    setCurrentPage(pageNumber)
    
  }
  return (
    <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
      </li>
      {currentPage === totalpage && totalpage > 2 && <li className={`${styles.cursor} page-item page-link`} onClick={()=>handlecurent(currentPage-2)}>{currentPage-2}</li>}

      {currentPage !== 1 && <li className={`${styles.cursor} page-item page-link`} onClick={()=>handlecurent(currentPage-1)}>{currentPage-1}</li>}
      <li className={`page-item page-link ${styles.curent}`} onClick={()=>handlecurent(currentPage)}>{currentPage}</li>

      {currentPage !== totalpage && <li className={`${styles.cursor} page-item page-link`} onClick={()=>handlecurent(currentPage+1)}>{currentPage+1}</li>}

      {currentPage === 1 && totalpage > 2 &&  <li className={`${styles.cursor} page-item page-link`} onClick={()=>handlecurent(currentPage+2)}>{currentPage+2}</li>}

      <li className="page-item">
        <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalpage}>
          Next
        </button>
      </li>
    </ul>
  </nav>
  );
};

export default Pagination;
