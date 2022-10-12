import { useState } from 'react'
import SearchForm from './SearchForm__';

export default function SearchBar() {

  const [ query, setQuery ] = useState('')
  const [ showForm, setShowForm ] = useState(false)

  const handleInputChange = e => {
    e.preventDefault();
    e.stopPropagation(); // just to be sure
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation(); // just to be sure

    Router.push(`/search?q=${query}`);
  };

  return (
    <>
    <svg onClick={() => setShowForm(true)} className="w-8 ml-8 cursor-pointer opacity-60 hover:opacity-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>

    { showForm && <SearchForm__ setShowForm={setShowForm} /> }
    </>
  );
}
