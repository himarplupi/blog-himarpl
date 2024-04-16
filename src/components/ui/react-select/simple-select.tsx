/* ----------- simple-select.js ----------- */
import * as React from "react";
import type { Props } from "react-select";
import Select from "react-select";

import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  Option,
} from "./components";
import { defaultClassNames, defaultStyles } from "./style.helper";

export const SimpleSelect = React.forwardRef((props: Props, ref) => {
  const {
    value,
    onChange,
    options = [],
    styles = defaultStyles,
    classNames = defaultClassNames,
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
      styles={styles}
      classNames={classNames}
      {...rest}
    />
  );
});

SimpleSelect.displayName = "SimpleSelect"; // Add display name
