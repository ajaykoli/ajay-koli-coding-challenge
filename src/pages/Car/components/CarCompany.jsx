import React, { useEffect, useState } from "react";
import { TYPE1 } from "../../utils/constant";
import ProgressBar from "../../utils/ProgressBar";


const MakeCar = ({ carData }) => {
  const [valid, setValid] = useState([]);
  const [mismatched, setMismatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [defaultCarData, setDefaultCarData] = useState([]);
  const [other, setOther] = useState(0);
  const [companyList, setCompanyList] = useState({});


  useEffect(() => {

    if(carData){
      const missingData = [];
      const mismatchedData = [];
      const validData = [];
      const companies = {};
  
      carData?.map((data) => {
  
        const previousValue = companies[data[TYPE1]];
        previousValue === undefined ? companies[data[TYPE1]] = 1 : companies[data[TYPE1]] = previousValue + 1;
        
        if (data[TYPE1] == undefined || null || "") {
          missingData.push(data);
        } else if (typeof data[TYPE1] != "string") {
          mismatchedData.push(data);
        } else {
          validData.push(data[TYPE1]);
        }
      });
  
      setValid(validData);
      setMismatched(mismatchedData);
      setMissing(missingData);
      setCompanyList(companies);
  
      /* GET INITIAL TWO ELEMENTS */
      if (Object.keys(companies).length > 0) {
        const objData = Object.entries(companies)
          .sort(({ 1: a }, { 1: b }) => parseInt(b) - parseInt(a))
          .slice(0, 2)
          .map(([label, value]) => ({ label, value }));
  
        setDefaultCarData(objData);
  
        const otherData = carData.length - objData[0]?.value - objData[1]?.value;
  
        setOther(otherData);
      }      
    }

  }, [carData]);

  return (
    <div className="d-flex text-start gap-4 border-bottom pb-2">
      <div className="d-flex flex-1 flex-column">
        <div>
          <div className="fw-bold">A. Make</div>
          <div>Compnay of the vehicle</div>
        </div>
        <div className="d-flex flex-column gap-3">
          {carData && defaultCarData && (
            <div className="d-flex w-full justify-content-between">
              <div>{defaultCarData[0]?.label}</div>
              <div className="fw-bold text-primary">
                {(
                  (defaultCarData[0]?.value * 100) /
                  carData.length
                ).toFixed(2)}
                %
              </div>
            </div>
          )}

          {carData && defaultCarData && (
            <div className="d-flex w-full justify-content-between">
              <div>{defaultCarData[1]?.label}</div>
              <div className="fw-bold text-primary">
                {(
                  (defaultCarData[1]?.value * 100) /
                  carData.length
                ).toFixed(2)}
                %
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between text-muted fs-6">
            <div>Other({Object.keys(companyList).length - 2})</div>
            <div>
              {carData &&
                other &&
                ((other * 100) / carData.length).toFixed(2)}
              %
            </div>
          </div>
        </div>
      </div>

      <div className="flex-2">
        <ProgressBar
          carData={carData}
          valid={valid}
          mismatched={mismatched}
          missing={missing}
          defaultCarData={defaultCarData}
          unique={Object.keys(companyList)?.length}
        />
      </div>
    </div>
  );
};

export default MakeCar;
