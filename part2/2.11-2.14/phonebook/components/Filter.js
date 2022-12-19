const Filter = ({filter, handleFilter}) => {
    
    return (
        <form >
            filter shown with: <input value={filter} onChange={handleFilter} />
        </form>
    )
  }

export default Filter