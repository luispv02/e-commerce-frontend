import { DASHBOARD_DATE_RANGES, type DashboardDateRangeId } from "../../../data/admin/dashboard";

interface Props {
  value: DashboardDateRangeId;
  onChange: (id: DashboardDateRangeId) => void;
}

export const DashboardDateRangeFilter = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col justify-center items-end gap-2">
      <label
        htmlFor="dashboard-range"
        className="text-xs font-semibold uppercase tracking-wide text-gray-500 shrink-0"
      >
        Periodo
      </label>
  
      <select
        id="dashboard-range"
        value={value}
        onChange={(e) => onChange(e.target.value as DashboardDateRangeId)}
        className="rounded-lg border border-gray-300 bg-white text-sm text-gray-900 shadow-sm cursor-pointer p-2 outline-0"
      >
        {DASHBOARD_DATE_RANGES.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
