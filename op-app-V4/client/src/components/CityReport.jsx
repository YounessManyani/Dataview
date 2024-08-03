import React, { useEffect, useState } from 'react';
import Button from "./Button";

function CityReport() {
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20); // Initial number of cities to display
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/city/report')
      .then(response => {
        setLoading(false);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCities(data))
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }, []);

  const loadMoreCities = () => {
    setVisibleCount(prevCount => prevCount + 20);
  };

  if (error) {
    return <div className="text-center text-red-500">Error fetching city data: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="h1 mb-6 text-center">City Report</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cities.slice(0, visibleCount).map((city) => (
              <li
                key={city.CityName}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold text-blue-700">{city.CityName}</h2>
                <p className="text-gray-700">{city.CountryName}</p>
                <p className="text-gray-500">Population: {city.Population.toLocaleString()}</p>
              </li>
            ))}
          </ul>
          {visibleCount < cities.length && (
            <div className="text-center mt-8">
              {/* <button
                onClick={loadMoreCities}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
              >
                Load More Cities
              </button> */}
          <Button   onClick={loadMoreCities}>
          Load More Cities
          </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CityReport;
