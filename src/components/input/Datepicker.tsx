import SelectList from "./Select";

type DatepickerProps = {
  label?: string,
  inline_label?: boolean,
  inline_options?: boolean,
  inline?: boolean,
  register: any,
  name?: string
}

enum Month {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12
}

function Datepicker({label, inline_label=false, inline_options=false, inline=false, register, name='date', ...props}: DatepickerProps) {
    const inlined_label = inline_label || inline ? " flex-row" : " flex-col "
    const inlined_options = inline_options || inline ? " flex-row" : " flex-col "
    const listLabel = label && <h4 className="block text-gray-700 text-sm font-bold">{label}</h4>;

    return <div className={"flex" + inlined_label}>
      {listLabel}
      <div className={"flex" + inlined_options}>
        <SelectList choices={Array.from({length: 31}, (_, i) => i + 1)} register={register} selectName={`${name}.day`} placeholder_text = "Day" />
        <SelectList choices={Object.keys(Month).splice(12)} register={register} selectName={`${name}.month`} placeholder_text = "Month"/>
        <SelectList choices={Array.from({length: 50}, (_, i) => (new Date()).getFullYear() - i)} register={register} selectName={`${name}.year`} placeholder_text = "Year"/>
      </div>
    </div>
}

export default Datepicker;