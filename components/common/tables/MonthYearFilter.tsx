import { useEffect, useMemo } from "react";
import Select from "react-select";

const getMonths = () => {
  return [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ].map((month, index) => ({ label: month, value: index + 1 })); // Convert to objects
};

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => ({ label: year, value: year }));
};

const MonthYearFilter = ({ monthFilter, setMonthFilter, yearFilter, setYearFilter }) => {
  const months = getMonths();
  const years = getYears();

  const now = new Date();
  let lastMonthIndex = now.getMonth() - 1; // Last month
  let lastYear = now.getFullYear();

  if (lastMonthIndex < 0) {
    lastMonthIndex = 11; // December of last year
    lastYear -= 1;
  }

  useEffect(() => {
    if (!monthFilter) setMonthFilter(months[lastMonthIndex]);
    if (!yearFilter) setYearFilter(years[0]); // Default to the latest year
  }, []);

  const monthProps = useMemo(() => ({
    options: months,
    onChange: setMonthFilter,
    defaultValue: months[lastMonthIndex],
    menuPortalTarget: document.body,
    placeholder: "Select Month",
    isSearchable: false,
    styles: {
      control: (provided: any) => ({ ...provided, minWidth: "200px" }),
      menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    }
  }), [months, setMonthFilter]);

  const yearProps = useMemo(() => ({
    options: years,
    onChange: setYearFilter,
    defaultValue: years[0],
    menuPortalTarget: document.body,
    placeholder: "Select Year",
    isSearchable: false,
    styles: {
      control: (provided: any) => ({ ...provided, minWidth: "120px" }),
      menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    }
  }), [years, setYearFilter]);

  return (
    <div className="flex space-x-3">
      <Select {...monthProps} />
      <Select {...yearProps} />
    </div>
  );
};

export default MonthYearFilter;
