import { useRef } from "react";

import { ResetBtnProps, FiltersProps } from "../../common/types";
import {
  sortValues,
  dropdownProps,
  initialFiltersValue,
} from "../../common/constants";
import { range } from "../../common/utils";

import {
  Grid,
  MultiSelect,
  Select,
  NumberInput,
  UnstyledButton,
  Image,
  NumberInputHandlers,
  Stack,
} from "@mantine/core";

import style from "./resetBtn.module.scss";

import DownSvg from "/down.svg";
const iconDown = <Image src={DownSvg} alt="icon down" h={24} w={24} />;

// import CloseSvg from "/close.svg"; // * reset button icon
// const iconClose = <Image src={CloseSvg} alt="icon close" h={16} w={16} />;

export const Filters = ({
  dataGenres,
  filtersValue,
  isErrorGenres,
  setActivePage,
  setFiltersValue,
  setSort,
  sort,
}: FiltersProps) => {
  // * click function for reset Button
  const handleResetFiltersClick = (): void => {
    setFiltersValue(initialFiltersValue);
    setActivePage(1);
    sessionStorage.removeItem("filters");
    sessionStorage.setItem("homePage", JSON.stringify(1));
  };

  const resetBtnProps: ResetBtnProps = {
    onClick: handleResetFiltersClick,
  };

  // * disable state for reset button
  if (
    !filtersValue.genres.length &&
    !filtersValue.year &&
    !filtersValue.ratingMin &&
    !filtersValue.ratingMax
  ) {
    resetBtnProps.disabled = true;
  }

  // * custom handlers for numberInputs
  const handlersRatingMinRef = useRef<NumberInputHandlers>(null);
  const handlersRatingMaxRef = useRef<NumberInputHandlers>(null);

  // * rightSection for numberInputs
  const getRightSectForNumInput = (
    handler: React.RefObject<NumberInputHandlers>
  ) => {
    return (
      <Stack gap={7}>
        <UnstyledButton onClick={() => handler.current?.increment()}>
          <Image src="/up-s.svg" alt="icon down" />
        </UnstyledButton>
        <UnstyledButton onClick={() => handler.current?.decrement()}>
          <Image src="/down-s.svg" alt="icon top" />
        </UnstyledButton>
      </Stack>
    );
  };

  // * onChange function for filters inputs
  const handleInpValChange = (
    stateKey: "genres" | "year" | "ratingMin" | "ratingMax" | "sort",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    if (stateKey === "sort") {
      setSort(value);
      sessionStorage.setItem("sort", JSON.stringify(value));
    } else {
      const newValue = { ...filtersValue };
      newValue[stateKey] = value;
      setFiltersValue(newValue);
      sessionStorage.setItem("filters", JSON.stringify(newValue));
    }

    sessionStorage.setItem("homePage", JSON.stringify(1));
    setActivePage(1);
  };

  return (
    <>
      <Grid align="flex-end" gutter={{ base: "8px", sm: "16px" }} columns={10}>
        <Grid.Col span={{ base: 5, xs: 3, md: 2.85, lg: 3 }}>
          <MultiSelect
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            withScrollArea={false}
            withCheckIcon={false}
            label="Genres"
            value={filtersValue.genres}
            onChange={(value) => handleInpValChange("genres", value)}
            placeholder="Select genre"
            data={dataGenres?.map((elem) => elem.name)}
            error={isErrorGenres}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 5, xs: 3, md: 2.85, lg: 3 }}>
          <Select
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            withScrollArea={false}
            withCheckIcon={false}
            label="Release year"
            value={filtersValue.year}
            onChange={(value) => handleInpValChange("year", value)}
            placeholder="Select release year"
            data={range(1870, Number(new Date().getFullYear()) + 8).reverse()}
          />
        </Grid.Col>
        <Grid.Col span={{ base: "auto", xs: 4, md: 3 }}>
          <Grid align="flex-end" gutter="8px">
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                label="Ratings"
                placeholder="From"
                value={filtersValue.ratingMin}
                clampBehavior="strict"
                handlersRef={handlersRatingMinRef}
                rightSection={getRightSectForNumInput(handlersRatingMinRef)}
                onChange={(value) => handleInpValChange("ratingMin", value)}
                min={1}
                max={10}
                inputMode="numeric"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                placeholder="To"
                value={filtersValue.ratingMax}
                clampBehavior="strict"
                handlersRef={handlersRatingMaxRef}
                rightSection={getRightSectForNumInput(handlersRatingMaxRef)}
                onChange={(value) => handleInpValChange("ratingMax", value)}
                min={1}
                max={10}
                inputMode="numeric"
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={{ base: "content", md: 1.3, lg: 1 }}>
          <UnstyledButton {...resetBtnProps} classNames={{ root: style.root }}>
            Reset filters
            {/* <span>Reset filters</span> */}
            {/* {iconClose} */}
          </UnstyledButton>
        </Grid.Col>
      </Grid>
      <Grid align="flex-end" justify="end" gutter="16px" columns={10} my={24}>
        <Grid.Col span={{ base: 6, xs: 4.07, sm: 5, md: 2.75, lg: 3 }}>
          <Select
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Sort by"
            value={sort}
            onChange={(value) => handleInpValChange("sort", value)}
            withScrollArea={false}
            withCheckIcon={false}
            data={sortValues.map((elem) => elem.name)}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
