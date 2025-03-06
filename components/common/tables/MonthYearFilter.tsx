import { useEffect, useMemo, useState } from "react";
import Select from "react-select";

const getMonths = () => [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
].map((month, index) => ({ label: month, value: index + 1 }));

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => ({ label: year, value: year }));
};

const MonthYearFilter = ({ setMonthFilter = (_value: any) => { }, setYearFilter = (_value: any) => { } }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const months = getMonths();
  const years = getYears();

  const filteredMonths = selectedYear === new Date().getFullYear() ? months.slice(0, new Date().getMonth() + 1) : months;

  useEffect(() => {
    setYearFilter(selectedYear);
  }, [selectedYear]);

  const monthProps = useMemo(() => ({
    options: filteredMonths,
    onChange: (selectedOption: any) => { setMonthFilter(selectedOption.value) },
    defaultValue: filteredMonths[filteredMonths.length - 1],
    menuPortalTarget: document.body,
    placeholder: "Select Month",
    isSearchable: false,
    styles: {
      control: (provided: any) => ({ ...provided, minWidth: "200px" }),
      menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    }
  }), [filteredMonths, setMonthFilter]);

  const yearProps = useMemo(() => ({
    options: years,
    onChange: (selectedOption: any) => setSelectedYear(selectedOption.value),
    defaultValue: { label: selectedYear, value: selectedYear },
    menuPortalTarget: document.body,
    placeholder: "Select Year",
    isSearchable: false,
    styles: {
      control: (provided: any) => ({ ...provided, minWidth: "120px" }),
      menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    }
  }), [years, selectedYear, setYearFilter]);

  return (
    <div className="flex space-x-3">
      <Select {...monthProps} />
      <Select {...yearProps} />
    </div>
  );
};

export default MonthYearFilter;
