import { Genre, Movie } from "../../common/types";
import {
  dateConvert,
  genresIdsToStringNames,
  timeConvert,
} from "../../common/utils";

import { Group, Stack, Text, NumberFormatter } from "@mantine/core";

// * this file is not placed in a separate folder, 
// * because the component is used only inside the component code of the same folder, 
// * p.s. a separate file to increase readability
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
        {full && data.runtime ? (
          <Text span c="gray.6">
            Duration
          </Text>
        ) : (
          <></>
        )}
        {full && data.release_date ? (
          <Text span c="gray.6">
            Premiere
          </Text>
        ) : (
          <></>
        )}
        {full && data.budget ? (
          <Text span c="gray.6">
            Budget
          </Text>
        ) : (
          <></>
        )}
        {full && data.revenue ? (
          <Text span c="gray.6" miw={120}>
            Gross worldwide
          </Text>
        ) : (
          <></>
        )}
        {data.genre_ids?.length && genres?.length ? (
          <Text span c="gray.6">
            Genres
          </Text>
        ) : (
          <></>
        )}
      </Stack>
      <Stack align="flex-start" justify="flex-start" gap={7}>
        {full && data.runtime ? (
          <Text span c="black">
            {timeConvert(data.runtime)}
          </Text>
        ) : (
          <></>
        )}
        {full && data.release_date ? (
          <Text span c="black" lineClamp={1}>
            {dateConvert(data.release_date)}
          </Text>
        ) : (
          <></>
        )}
        {full && data.budget ? (
          <Text span c="black">
            <NumberFormatter prefix="$" value={data.budget} thousandSeparator />
          </Text>
        ) : (
          <></>
        )}
        {full && data.revenue ? (
          <Text span c="black">
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
          <Text span c="black" lineClamp={1}>
            {genresIdsToStringNames(data.genre_ids, genres)}
          </Text>
        ) : (
          <></>
        )}
      </Stack>
    </Group>
  );
};
