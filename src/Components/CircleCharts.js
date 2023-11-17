import "../css/CircleCharts.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleCharts = ({income, savings}) => {
  return (
    <>
      <div id="circle-charts-container">
        <div
          style={{ width: 200, height: 150 }}
          className="circle-chart-container"
        >
          <CircularProgressbar
            styles={buildStyles({
              pathColor: "#5A1CD4",
              textColor: "#5A1CD4",
            })}
            strokeWidth={4}
            value={75}
            text={`$${income}`}
          />
          <h1>Income</h1>
        </div>
        <div
          style={{ width: 200, height: 150 }}
          className="circle-chart-container"
        >
          <CircularProgressbar
            styles={buildStyles({
              pathColor: "#5A1CD4",
              textColor: "#5A1CD4",
            })}
            strokeWidth={4}
            value={75}
            text={`$${savings}`}
          />
          <h1>Savings</h1>
        </div>
      </div>
    </>
  );
};

export default CircleCharts;
