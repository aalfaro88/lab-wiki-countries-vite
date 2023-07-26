import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CountryDetailsPage = () => {
  const { countryId } = useParams();
  const countryURL = `https://ih-countries-api.herokuapp.com/countries/${countryId}`;

  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(countryURL)
      .then((response) => {
        setCountryData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
        setLoading(false);
      });
  }, [countryURL]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>{countryData.name.common}</h3>
      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${countryData.alpha2Code.toLowerCase()}.png`}
        alt={countryData.name.common}
      />
      <p>Capital: {countryData.capital}</p>
      <p>Area: {countryData.area}</p>
      <div>
        <p>Borders:</p>
        <ul>
          {countryData.borders.map((border) => (
            <li key={border}>
              <Link to={`/${border}`}>{border}</Link>
            </li>
          ))}
        </ul>
        <Link to="/">Go back to home</Link>
      </div>
    </div>
  );
};

export default CountryDetailsPage;
