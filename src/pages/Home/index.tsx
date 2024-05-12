import React, { useState } from "react";
import {
  Container,
  Text,
  MultiSelect,
  Select,
  UnstyledButton,
  Grid,
  Image,
  NumberInput,
} from "@mantine/core";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Down from "/down.svg";

import style from "./Home.module.scss";

interface Genre {
  id: number;
  name: string;
}

const fetchGenres = (): Promise<Genre[]> =>
  axios.get("/api/genres").then((response) => response.data.genres);

export const Home = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [year, setYear] = useState<string | null>("");
  const [ratingMin, setRatingMin] = useState<string | number>("");
  const [ratingMax, setRatingMax] = useState<string | number>("");

  const { isError, error, data } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchGenres,
  });

  if (isError) {
    console.log(error.message);
  }

  const iconDown = <Image src={Down} alt="icon down" h={24} w={24} />;
  const years: string[] = Array.from({ length: 2030 - 1870 + 1 }, (n, i) =>
    String(i + 1870)
  ).reverse();

  const resetFilters = () :void => {
    setGenres([]);
    setYear(null);
    setRatingMin("");
    setRatingMax("");
  }

  return (
    <Container size={980} mt={40} p={0}>
      <Text size="32px" fw={700} pb={40}>
        Movies
      </Text>
      <Grid align="flex-end" gutter="16px" columns={10}>
        <Grid.Col span={{ base: 10, md: 5, lg: 3 }}>
          <MultiSelect
            size="md"
            classNames={{
              pill: style.pill,
              pillsList: style.pillsList,
              inputField: !genres.length
                ? style.inputField
                : style.inputFieldHidden,
              option: style.option,
              label: style.label,
              input: style.input,
              dropdown: style.dropdown,
              section: style.section,
            }}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            rightSection={iconDown}
            label="Genres"
            value={genres}
            onChange={setGenres}
            placeholder="Select genre"
            error={isError}
            withScrollArea={false}
            withCheckIcon={false}
            data={data?.map((elem) => elem.name)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 10, md: 5, lg: 3 }}>
          <Select
            size="md"
            classNames={{
              option: style.option,
              label: style.label,
              input: style.input,
              dropdown: style.dropdown,
              section: style.section,
            }}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            rightSection={iconDown}
            label="Release year"
            value={year}
            onChange={setYear}
            placeholder="Select release year"
            withScrollArea={false}
            withCheckIcon={false}
            data={years}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 10, md: 5, lg: 3 }}>
          <Grid align="flex-end" gutter="8px">
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                classNames={{
                  label: style.label,
                  input: style.input,
                  section: style.section,
                }}
                label="Ratings"
                placeholder="From"
                value={ratingMin}
                onChange={setRatingMin}
                min={1}
                max={ratingMax ? Number(ratingMax) : 10}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                classNames={{
                  label: style.label,
                  input: style.input,
                  section: style.section,
                }}
                placeholder="To"
                value={ratingMax}
                onChange={setRatingMax}
                min={ratingMin ? Number(ratingMin) : 1}
                max={10}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span="content">
          <UnstyledButton className={style.resetButton} onClick={resetFilters}>
            Reset filters
          </UnstyledButton>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
