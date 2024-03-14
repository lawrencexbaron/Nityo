type SelectInputProps = {
  label: string;
  value: string;
  name: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = ({
  label,
  value,
  name,
  options,
  onChange,
}: SelectInputProps) => {
  return (
    <div className="mb-3 w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        name={name}
        onChange={onChange}
        className="px-3 py-2 capitalize bg-white border w-full border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
