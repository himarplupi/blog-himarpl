/* ----------- simple-select.js ----------- */
import * as React from "react";
import ReactCreateableSelect from "react-select/creatable";

import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  Option,
} from "./components";
import { defaultClassNames, defaultStyles } from "./style.helper";

export const CreateableSelect = React.forwardRef(
  (props: React.ComponentProps<typeof ReactCreateableSelect>, ref) => {
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
      <ReactCreateableSelect
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
  },
);

CreateableSelect.displayName = "CreateableSelect"; // Add display name
