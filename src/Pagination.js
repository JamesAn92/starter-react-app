import './Pagination.css'

function Pagination({ filteredPokemons, pageNumber ,setPageNumber }) {
    const pageSize = 10;
    const pageCount = Math.ceil(filteredPokemons.length / pageSize);
   
    return (
        <div className="page-numbers">
            <div>
            <button onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))} disabled={pageNumber === 1}>Prev</button>
            {Array.from({ length: pageCount }, (_, index) => index +1).map(
            (page, index) => {
                if (index < pageNumber + 5 && index > pageNumber - 6) {
                    return (
                        <button key={index} onClick={() => setPageNumber(index + 1)} className={(index + 1 === pageNumber)? 'active' : ''}>
                            {index + 1}
                        </button>
                        );
                    }
                }                
            )}
            <button onClick={() => setPageNumber(Math.min(pageNumber + 1, pageCount))} disabled={pageNumber === pageCount}>Next</button>
            </div>
        </div>
    );
  }
  
  export default Pagination;
