import React, { useState } from "react";

export default function Test() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleFirstDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getSecondDropdownOptions = () => {
    switch (selectedOption) {
      case "option1":
        return (
          <>
            <option value="suboption1">Suboption 1</option>
            <option value="suboption2">Suboption 2</option>
          </>
        );
      case "option2":
        return (
          <>
            <option value="suboption3">Suboption 3</option>
            <option value="suboption4">Suboption 4</option>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <label htmlFor="firstDropdown">Select an option:</label>
      <select
        id="firstDropdown"
        value={selectedOption}
        onChange={handleFirstDropdownChange}
      >
        <option value="">Select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>

      {selectedOption && (
        <>
          <label htmlFor="secondDropdown">Select another option:</label>
          <select id="secondDropdown">{getSecondDropdownOptions()}</select>
        </>
      )}
    </div>
  );
}
