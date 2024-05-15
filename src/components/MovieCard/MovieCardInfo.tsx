import {
  dateConvert,
  genresIdsToStringNames,
  timeConvert,
} from "../../constantsAndFunctions";
import { Genre, Movie } from "../../types";
import { Group, Stack, Text, NumberFormatter } from "@mantine/core";

export const MovieCardInfo = ({
  data,
  genres,
  full,
}: {
  data: Movie;
  genres: Genre[] | null | undefined;
  full: boolean;
}) => {
  return (
    <Group
      justify="flex-start"
      wrap="nowrap"
      align="flex-start"
      gap={full ? 25 : 7}
    >
      <Stack align="flex-start" justify="flex-start" gap={7}>
        {full && data.runtime ? <Text c="gray.6">Duration</Text> : <></>}
        {full && data.release_date ? <Text c="gray.6">Premiere</Text> : <></>}
        {full && data.budget ? <Text c="gray.6">Budget</Text> : <></>}
        {full && data.revenue ? <Text c="gray.6">Gross worldwide</Text> : <></>}
        {data.genre_ids?.length && genres?.length ? (
          <Text c="gray.6">Genres</Text>
        ) : (
          <></>
        )}
      </Stack>
      <Stack align="flex-start" justify="flex-start" gap={7}>
        {full && data.runtime ? (
          <Text c="black">{timeConvert(data.runtime)}</Text>
        ) : (
          <></>
        )}
        {full && data.release_date ? (
          <Text c="black">{dateConvert(data.release_date)}</Text>
        ) : (
          <></>
        )}
        {full && data.budget ? (
          <Text c="black">
            <NumberFormatter prefix="$" value={data.budget} thousandSeparator />
          </Text>
        ) : (
          <></>
        )}
        {full && data.revenue ? (
          <Text c="black">
            <NumberFormatter
              prefix="$"
              value={data.revenue}
              thousandSeparator
            />
          </Text>
        ) : (
          <></>
        )}
        {data.genre_ids?.length && genres?.length ? (
          <Text c="black">
            {genresIdsToStringNames(data.genre_ids, genres, full)}
          </Text>
        ) : (
          <></>
        )}
      </Stack>
    </Group>
  );
};
