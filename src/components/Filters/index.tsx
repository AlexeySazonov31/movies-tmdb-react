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
// import CloseSvg from "/close.svg";
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
  const resetFilters = (): void => {
    setFiltersValue(initialFiltersValue);
    setActivePage(1);
    sessionStorage.removeItem("filters");
    sessionStorage.setItem("homePage", JSON.stringify(1));
  };

  const resetBtnProps: ResetBtnProps = {
    onClick: resetFilters,
  };

  if (
    !filtersValue.genres.length &&
    !filtersValue.year &&
    !filtersValue.ratingMin &&
    !filtersValue.ratingMax
  ) {
    resetBtnProps.disabled = true;
  }

  // * custom handlers for number inputs
  const handlersRatingMinRef = useRef<NumberInputHandlers>(null);
  const handlersRatingMaxRef = useRef<NumberInputHandlers>(null);

  return (
    <>
      <Grid align="flex-end" gutter={{ base: "8px", sm: "16px" }} columns={10}>
        <Grid.Col span={{ base: 5, xs: 3, sm: 3, md: 2.85, lg: 3 }}>
          <MultiSelect
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Genres"
            value={filtersValue.genres}
            onChange={(values) => {
              const newFValue = { ...filtersValue, genres: values };
              setFiltersValue(newFValue);
              sessionStorage.setItem("filters", JSON.stringify(newFValue));
              sessionStorage.setItem("homePage", JSON.stringify(1));
              setActivePage(1);
            }}
            placeholder="Select genre"
            error={isErrorGenres}
            withScrollArea={false}
            withCheckIcon={false}
            data={dataGenres?.map((elem) => elem.name)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 5, xs: 3, sm: 3, md: 2.85, lg: 3 }}>
          <Select
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Release year"
            value={filtersValue.year}
            onChange={(value) => {
              const newFValue = { ...filtersValue, year: value };
              setFiltersValue(newFValue);
              sessionStorage.setItem("filters", JSON.stringify(newFValue));
              sessionStorage.setItem("homePage", JSON.stringify(1));
              setActivePage(1);
            }}
            placeholder="Select release year"
            withScrollArea={false}
            withCheckIcon={false}
            data={range(1870, Number(new Date().getFullYear()) + 8).reverse()}
          />
        </Grid.Col>
        <Grid.Col span={{ base: "auto", xs: 4, sm: 4, md: 3, lg: 3 }}>
          <Grid align="flex-end" gutter="8px">
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                label="Ratings"
                placeholder="From"
                value={filtersValue.ratingMin}
                clampBehavior="strict"
                handlersRef={handlersRatingMinRef}
                rightSection={
                  <Stack gap={7}>
                    <UnstyledButton
                      onClick={() => handlersRatingMinRef.current?.increment()}
                    >
                      <Image src="/up-s.svg" alt="icon down" />
                    </UnstyledButton>
                    <UnstyledButton
                      onClick={() => handlersRatingMinRef.current?.decrement()}
                    >
                      <Image src="/down-s.svg" alt="icon top" />
                    </UnstyledButton>
                  </Stack>
                }
                onChange={(value) => {
                  console.log("in !!!!!");
                  const newFValue = {
                    ...filtersValue,
                    ratingMin: value,
                  };
                  setFiltersValue(newFValue);
                  sessionStorage.setItem("filters", JSON.stringify(newFValue));
                  sessionStorage.setItem("homePage", JSON.stringify(1));
                  setActivePage(1);
                }}
                min={1}
                max={
                  filtersValue.ratingMax ? Number(filtersValue.ratingMax) : 10
                }
                inputMode="decimal"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                placeholder="To"
                value={filtersValue.ratingMax}
                clampBehavior="strict"
                handlersRef={handlersRatingMaxRef}
                rightSection={
                  <Stack gap={7}>
                    <UnstyledButton
                      onClick={() => handlersRatingMaxRef.current?.increment()}
                    >
                      <Image src="/up-s.svg" alt="icon down" />
                    </UnstyledButton>
                    <UnstyledButton
                      onClick={() => handlersRatingMaxRef.current?.decrement()}
                    >
                      <Image src="/down-s.svg" alt="icon top" />
                    </UnstyledButton>
                  </Stack>
                }
                onChange={(value) => {
                  const newFValue = {
                    ...filtersValue,
                    ratingMax: value,
                  };
                  setFiltersValue(newFValue);
                  sessionStorage.setItem("filters", JSON.stringify(newFValue));
                  sessionStorage.setItem("homePage", JSON.stringify(1));
                  setActivePage(1);
                }}
                min={
                  filtersValue.ratingMin ? Number(filtersValue.ratingMin) : 1
                }
                max={10}
                inputMode="decimal"
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col
          span={{
            base: "content",
            xs: "content",
            sm: "content",
            md: 1.3,
            lg: 1,
          }}
        >
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
            onChange={(value) => {
              setSort(value);
              sessionStorage.setItem("sort", JSON.stringify(value));
              sessionStorage.setItem("homePage", JSON.stringify(1));
              setActivePage(1);
            }}
            withScrollArea={false}
            withCheckIcon={false}
            data={sortValues.map((elem) => elem.name)}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
