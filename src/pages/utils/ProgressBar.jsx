import React, { useEffect, useState } from "react";
import { Progress } from "reactstrap";
import Typography from "../Common/Typography"
const ProgressData = ({
  carData,
  valid,
  mismatched,
  missing,
  defaultCarData,
  unique,
}) => {
  const [validDataPercentage, setValidDataPercentage] = useState(0);
  const [mismatchedDataPercentage, setMismatchedDataPercentage] = useState(0);
  const [missingDataPercentage, setMissingDataPercentage] = useState(0);

  const handlePercentageData = () => {
    if (carData) {
      setValidDataPercentage((valid.length / carData.length) * 100);
      setMismatchedDataPercentage(
        (mismatched.length / carData.length) * 100
      );
      setMissingDataPercentage((missing.length / carData.length) * 100);
    }
  };

  useEffect(() => {
    handlePercentageData();
  }, [carData, validDataPercentage, mismatchedDataPercentage, missingDataPercentage, handlePercentageData]);

  return (
    <div>
      <Progress multi>
        <Progress bar color="success" value={validDataPercentage} />
        <Progress bar color="warning" value={mismatchedDataPercentage} />
        <Progress bar color="danger" value={missingDataPercentage} />
      </Progress>

      <div className="d-flex flex-column mt-2 w-full">
        <Typography title={"Valid"} length={valid.length} percentage={validDataPercentage} type={"success"} />
        <Typography title={"Valid"} length={mismatched.length} percentage={mismatchedDataPercentage} type={"warning"} />
        <Typography title={"Valid"} length={missing.length} percentage={missingDataPercentage} type={"danger"} />
      </div>

      <div className="d-flex flex-column mt-5">
        <div className="d-flex justify-content-between align-items-center w-full">
          <div className="d-flex align-items-center gap-1">
            <div>Unique</div>
          </div>

          {carData && (
            <div className="d-flex gap-3 w-25 justify-content-end">
              <div>{unique}</div>
              <div className="text-muted invisible w-25">4dfdf</div>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center w-full">
          <div className="d-flex align-items-center gap-1">
            <div>Most Common</div>
          </div>

          {carData && defaultCarData.length > 0 && (
            <div className="d-flex gap-3  w-25 justify-content-end">
              <div>{defaultCarData[0]?.label}</div>
              <div className="text-muted w-25">
                {(
                  (defaultCarData[0]?.value / carData.length) *
                  100
                ).toFixed(2)}
                %
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressData;
