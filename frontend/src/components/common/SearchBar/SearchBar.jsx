import { FaSistrix } from "react-icons/fa"
import './SearchBar.css'

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="search" placeholder="#Explore" />
      <div className="search-icon">
        <FaSistrix />
      </div>
    </div>
  )
}

export default SearchBar