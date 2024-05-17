import {NavLink, MultiSelect, Select, NumberInput, createTheme, Pagination, Anchor, TextInput } from "@mantine/core";

import filtersClasses from "./stylesForMantine/filters.module.scss";
import paginationClasses from "./stylesForMantine/pagination.module.scss";
import anchorClasses from "./stylesForMantine/anchor.module.scss";
import searchClasses from "./stylesForMantine/search.module.scss";
import navLinkClasses from "./stylesForMantine/navLink.module.scss";

export const theme = createTheme({
  breakpoints: {
    ss: '22em',
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },
  fontFamily: 'Inter, sans-serif',
  colors: {
    gray: [
      "#FFFFFF",
      "#F5F5F6",
      "#EAEBED",
      "#D5D6DC",
      "#000000", // gray 4 - empty
      "#ACADB9",
      "#7B7C88",
      "#232134",
      "#000000",
      "#000000",
    ],
    purple: [
      "#ffffff",
      "#F2ECFA",
      "#E5D5FA",
      "#D1B4F8",
      "#BD93F7",
      "#9854F6",
      "#541F9D",
      "#000000",
      "#000000",
      "#000000",
    ],
    yellow: [
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
    ]
  },
  components: {
    MultiSelect: MultiSelect.extend({ classNames: filtersClasses }),
    Select: Select.extend({ classNames: filtersClasses }),
    NumberInput: NumberInput.extend({ classNames: filtersClasses }),
    Pagination: Pagination.extend({ classNames: paginationClasses }),
    Anchor: Anchor.extend({ classNames: anchorClasses }),
    TextInput: TextInput.extend({classNames: searchClasses}),
    NavLink: NavLink.extend({classNames: navLinkClasses}),
  }
});
