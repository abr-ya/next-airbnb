"use client";

import { FC } from "react";
import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";
import ErrorMessage from "./ErrorMessage";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface ICountrySelect {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
  isError?: boolean;
}

const CountrySelect: FC<ICountrySelect> = ({ value, onChange, isError }) => {
  const { getAll } = useCountries();

  const optionRender = (country: CountrySelectValue) => (
    <div className="flex flex-row items-center gap-3">
      <div>{country.flag}</div>
      <div>
        {country.label}
        <span className="text-neutral-500 ml-1">{country.region}</span>
      </div>
    </div>
  );

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => optionRender(option)}
        classNames={{
          control: () => "p-0 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
      {isError && <ErrorMessage text="Please, select a country!" />}
    </div>
  );
};

export default CountrySelect;
