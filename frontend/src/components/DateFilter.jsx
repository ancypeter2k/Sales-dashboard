import { useDispatch, useSelector } from "react-redux";
import { setDays } from "../features/dashboard/dashboardSlice";

export default function DateFilter() {
  const dispatch = useDispatch();
  const days = useSelector((state) => state.dashboard.days);

  return (
    <div className="space-y-2">
      <label htmlFor="date-filter" className="eyebrow block text-xs">
        Reporting Window
      </label>
      <select
        id="date-filter"
        value={days}
        onChange={(e) => dispatch(setDays(Number(e.target.value)))}
        className="select-control"
      >
        <option value={7}>Last 7 days</option>
        <option value={30}>Last 30 days</option>
      </select>
    </div>
  );
}
