/* ----------- simple-select.js ----------- */
import * as React from "react";
import type { Props } from "react-select";
import Select from "react-select";

import { cn } from "@/lib/utils";

import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  Option,
} from "./components";
import {
  clearIndicatorStyles,
  controlStyles,
  defaultStyles,
  dropdownIndicatorStyles,
  groupHeadingStyles,
  indicatorsContainerStyles,
  indicatorSeparatorStyles,
  loadingIndicatorStyles,
  loadingMessageStyles,
  menuStyles,
  multiValueStyles,
  noOptionsMessageStyles,
  optionStyles,
  placeholderStyles,
  valueContainerStyles,
} from "./styles";

export const SimpleSelect = React.forwardRef((props: Props, ref) => {
  const {
    value,
    onChange,
    options = [],
    styles,
    classNames,
    components = {},
    ...rest
  } = props;

  return (
    <Select
      // @ts-expect-error - missing props
      ref={ref}
      value={value}
      onChange={onChange}
      options={options}
      unstyled
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        Option,
        ...components,
      }}
      styles={{
        input: (base) => ({
          ...base,
          ...defaultStyles.input,
        }),
        multiValueLabel: (base) => ({
          ...base,
          ...defaultStyles.multiValueLabel,
        }),
        control: (base) => ({
          ...base,
          ...defaultStyles.control,
        }),
        menuList: (base) => ({
          ...base,
          ...defaultStyles.menuList,
        }),
        ...styles,
      }}
      classNames={{
        clearIndicator: (state) =>
          cn(clearIndicatorStyles, classNames?.clearIndicator?.(state)),
        container: (state) => cn(classNames?.container?.(state)),
        control: (state) =>
          cn(
            controlStyles.base,
            state.isDisabled && controlStyles.disabled,
            state.isFocused && controlStyles.focus,
            classNames?.control?.(state),
          ),
        dropdownIndicator: (state) =>
          cn(dropdownIndicatorStyles, classNames?.dropdownIndicator?.(state)),
        group: (state) => cn(classNames?.group?.(state)),
        groupHeading: (state) =>
          cn(groupHeadingStyles, classNames?.groupHeading?.(state)),
        indicatorsContainer: (state) =>
          cn(
            indicatorsContainerStyles,
            classNames?.indicatorsContainer?.(state),
          ),
        indicatorSeparator: (state) =>
          cn(indicatorSeparatorStyles, classNames?.indicatorSeparator?.(state)),
        input: (state) => cn(classNames?.input?.(state)),
        loadingIndicator: (state) =>
          cn(loadingIndicatorStyles, classNames?.loadingIndicator?.(state)),
        loadingMessage: (state) =>
          cn(loadingMessageStyles, classNames?.loadingMessage?.(state)),
        menu: (state) => cn(menuStyles, classNames?.menu?.(state)),
        menuList: (state) => cn(classNames?.menuList?.(state)),
        menuPortal: (state) => cn(classNames?.menuPortal?.(state)),
        multiValue: (state) =>
          cn(multiValueStyles, classNames?.multiValue?.(state)),
        multiValueLabel: (state) => cn(classNames?.multiValueLabel?.(state)),
        multiValueRemove: (state) => cn(classNames?.multiValueRemove?.(state)),
        noOptionsMessage: (state) =>
          cn(noOptionsMessageStyles, classNames?.noOptionsMessage?.(state)),
        option: (state) =>
          cn(
            optionStyles.base,
            state.isFocused && optionStyles.focus,
            state.isDisabled && optionStyles.disabled,
            state.isSelected && optionStyles.selected,
            classNames?.option?.(state),
          ),
        placeholder: (state) =>
          cn(placeholderStyles, classNames?.placeholder?.(state)),
        singleValue: (state) => cn(classNames?.singleValue?.(state)),
        valueContainer: (state) =>
          cn(valueContainerStyles, classNames?.valueContainer?.(state)),
      }}
      {...rest}
    />
  );
});

SimpleSelect.displayName = "SimpleSelect"; // Add display name
