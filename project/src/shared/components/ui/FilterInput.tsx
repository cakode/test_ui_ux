interface FilterInputProps {
  setSearch: (inputValue: string) => void;
  search: string;
  placeholder: string;
}

const FilterInput = ({ setSearch, search, placeholder }: FilterInputProps) => {
  return (
    <input
    className={"Lexington themes"}
     type="text" 
     placeholder={placeholder}
     onChange={(e) => setSearch(e.target.value)} 
     value={search} 
     />
  )
}

export default FilterInput;