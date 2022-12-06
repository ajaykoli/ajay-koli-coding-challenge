import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";

// components
import CarCompany from "./CarCompany";
import CarModel from "./CarModel";
import CarType from "./CarType";

const Car = () => {

  const [carData, setCarData] = useState(null);
  
  const InitiateAPICall = () => {
    if (!carData) {
        fetch(`/data/data.csv`)
        .then((res) => res.text())
        .then((res) => {
          const csv = res;
          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              setCarData(results.data);
            },
          });
        });
    }
  };

  useEffect(() => {
    InitiateAPICall();
  }, []);

  return (
    <div className="d-flex flex-column gap-3 justify-content-center height-90">
      <CarCompany carData={carData} />
      <CarModel carData={carData} />
      <CarType carData={carData} />
    </div>
  );
};

export default Car;
