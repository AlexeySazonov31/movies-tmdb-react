import React, { useState } from "react";
import { Container, Flex, Text, MultiSelect, Select } from "@mantine/core";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import style from "./Home.module.scss";

interface Genre {
  id: number;
  name: string;
}

const fetchGenres = (): Promise<Genre[]> =>
  axios.get("/api/genres").then((response) => response.data.genres);

export const Home = () => {
  const [value, setValue] = useState<string[]>([]);

  const { isError, error, data } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchGenres,
  });

  if (isError) {
    console.log(error.message);
  }

  console.log(value);

  return (
    <Container>
      <Text>Movies</Text>
      <Flex align="flex-end">
        <MultiSelect
          classNames={{
            pill: style.pill,
            pillsList: style.pillsList,
            inputField: !value.length ? style.inputField : style.inputFieldHidden,
            option: style.option
          }}
          label="Genres"
          value={value}
          onChange={setValue}
          placeholder="Select genre"
          error={isError}
          maxDropdownHeight={224}
          withCheckIcon={false}
          data={data?.map((elem) => elem.name)}
        />
        <Select
          label="Release year"
          placeholder="Select release year"
          data={["React", "Angular", "Vue", "Svelte"]}
        />
        <Select
          label="Ratings"
          placeholder="From"
          data={["React", "Angular", "Vue", "Svelte"]}
        />
        <Select placeholder="To" data={["React", "Angular", "Vue", "Svelte"]} />
      </Flex>
    </Container>
  );
};
