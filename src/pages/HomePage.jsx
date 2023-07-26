import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiURL = "https://ih-countries-api.herokuapp.com/countries";

function CountriesList() {
  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("Initial Render");
    axios.get(apiURL).then((response) => {
      setCountries(response.data);
      setFetching(false);
    });
  }, []);

  return (
    <div>
      <h2>WikiCountries: Your Guide to the World</h2>
      <br />
      <div className="dataContainerOut">
        {countries.map((country) => {
            const flagUrl = `https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`;
            return (        
                    <div key={country._id} className="dataContainer">
                    <Link to={`/${country.alpha3Code}`} className="linkCountry">
                    <img src={flagUrl} alt={country.name.common} />
                    <p>{country.name.common}</p>
                    </Link>
                    </div>
            );
        })}
      </div>
      {fetching && <p>Loading ...</p>}


    </div>
  );
}

export default CountriesList;

