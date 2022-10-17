import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  let url = "http://localhost:3001/pets"

  const handleTypeChange = (type) => {
    console.log(type)
    setFilters({ type: type })
  }

  const handleTypeClick = () => {
    if(filters.type !== "all") {
      url += `?type=${filters.type}`
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPets(data)
      })
  }

  const adoptPet = (id) => {
    
    const adoptedPets = pets.map((pet) => {
      return pet.id === id ? {...pet, isAdopted: true} : pet});
    setPets(adoptedPets)
    
  } 




  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters handleTypeChange={handleTypeChange} handleTypeClick={handleTypeClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={adoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
