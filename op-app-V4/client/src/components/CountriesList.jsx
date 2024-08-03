import React, { useEffect, useState } from 'react';

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/countries/world')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCities(data))
      .catch(error => setError(error));
  }, []);

  if (error) {
    return <div>Error fetching city data: {error.message}</div>;
  }



  return (
    <div>
      <h1>Countries by Population</h1>
      {error && <p>{error}</p>}
      <ul>
        {countries.length > 0 ? (
          countries.map((country) => (
            <li key={country.Name}>
              {country.Name} - Population: {country.Population}
            </li>
          ))
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </div>
  );
};

export default CountriesList;
