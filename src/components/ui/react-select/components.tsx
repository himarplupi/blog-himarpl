import * as React from "react";
import { CheckIcon, ChevronDownIcon, XIcon as CloseIcon } from "lucide-react";
import type {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  OptionProps,
} from "react-select";
import { components } from "react-select";

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className={"h-4 w-4 opacity-50"} />
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <CloseIcon className={"h-3.5 w-3.5 opacity-50"} />
    </components.ClearIndicator>
  );
};

export const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon className={"h-3 w-3 opacity-50"} />
    </components.MultiValueRemove>
  );
};

export const Option = (props: OptionProps) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        {/* @ts-expect-error - missings props */}
        <div>{props.data.label}</div>
        {props.isSelected && <CheckIcon />}
      </div>
    </components.Option>
  );
};
