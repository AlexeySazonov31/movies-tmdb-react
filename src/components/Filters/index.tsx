import { ResetBtnProps, FiltersProps } from "../../types";
import {
  years,
  sortValues,
  dropdownProps,
  initialFiltersValue,
} from "../../constantsAndFunctions";

import {
  Grid,
  MultiSelect,
  Select,
  NumberInput,
  UnstyledButton,
  Image,
} from "@mantine/core";

import DownSvg from "/down.svg";
import CloseSvg from "/close.svg";
const iconDown = <Image src={DownSvg} alt="icon down" h={24} w={24} />;
const iconClose = <Image src={CloseSvg} alt="icon close" h={16} w={16} />;

export const Filters = ({ ...props }: FiltersProps) => {
  const resetFilters = (): void => {
    props.setFiltersValue(initialFiltersValue);
  };

  const resetBtnProps: ResetBtnProps = {
    onClick: resetFilters,
  };

  if (
    !props.filtersValue.genres.length &&
    !props.filtersValue.year &&
    !props.filtersValue.ratingMin &&
    !props.filtersValue.ratingMax
  ) {
    console.log("disabled reset btn");
    resetBtnProps.disabled = true;
  }

  return (
    <>
      <Grid align="flex-end" gutter="16px" columns={10.13}>
        <Grid.Col span={{ base: 10, sm: 5, md: 2.5, lg: 3 }}>
          <MultiSelect
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Genres"
            value={props.filtersValue.genres}
            onChange={(values) =>
              props.setFiltersValue({ ...props.filtersValue, genres: values })
            }
            placeholder="Select genre"
            error={props.isErrorGenres}
            withScrollArea={false}
            withCheckIcon={false}
            data={props.dataGenres?.map((elem) => elem.name)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 10, sm: 5, md: 2.5, lg: 3 }}>
          <Select
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Release year"
            value={props.filtersValue.year}
            onChange={(value) =>
              props.setFiltersValue({ ...props.filtersValue, year: value })
            }
            placeholder="Select release year"
            withScrollArea={false}
            withCheckIcon={false}
            data={years}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 10, sm: 5, md: 3.5, lg: 3 }}>
          <Grid align="flex-end" gutter="8px">
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                label="Ratings"
                placeholder="From"
                value={props.filtersValue.ratingMin}
                onChange={(value) =>
                  props.setFiltersValue({
                    ...props.filtersValue,
                    ratingMin: value,
                  })
                }
                min={1}
                max={
                  props.filtersValue.ratingMax
                    ? Number(props.filtersValue.ratingMax)
                    : 10
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                placeholder="To"
                value={props.filtersValue.ratingMax}
                onChange={(value) =>
                  props.setFiltersValue({
                    ...props.filtersValue,
                    ratingMax: value,
                  })
                }
                min={
                  props.filtersValue.ratingMin
                    ? Number(props.filtersValue.ratingMin)
                    : 1
                }
                max={10}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span="content">
          <UnstyledButton {...resetBtnProps}>
            <span>Reset filters</span>
            {iconClose}
          </UnstyledButton>
        </Grid.Col>
      </Grid>
      <Grid align="flex-end" justify="end" gutter="16px" columns={10} my={24}>
        <Grid.Col span={{ base: 10, sm: 6, md: 2.5, lg: 3 }}>
          <Select
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Sort by"
            value={props.sort}
            onChange={props.setSort}
            withScrollArea={false}
            withCheckIcon={false}
            data={sortValues.map((elem) => elem.name)}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
