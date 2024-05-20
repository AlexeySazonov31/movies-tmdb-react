import { Dispatch } from "react";

import { getArrPagination } from "../../common/utils";

import { Group, Image, UnstyledButton } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import style from "./Pagination.module.scss";

export const Pagination = ({
  total,
  activePage,
  setActivePage,
  sessionStorageKeyName,
}: {
  total: number;
  activePage: number;
  setActivePage: Dispatch<number>;
  sessionStorageKeyName: string;
}) => {
  // * when changing the page, scroll up
  const [, scrollTo] = useWindowScroll();

  const click = (value: number): void => {
    scrollTo({ y: 0 });
    setActivePage(value);
    sessionStorage.setItem(
      sessionStorageKeyName,
      JSON.stringify(+value)
    );
  };

  return (
    <Group classNames={{ root: style.root }} gap={8}>
      <UnstyledButton
        classNames={{ root: style.control }}
        data-custom-disabled={Boolean(activePage === 1)}
        custom-type="edge"
        onClick={() => {
          !(activePage === 1) && click(activePage - 1);
        }}
      >
        <Image src="/left.svg" alt="left icon" w={16} h={16} />
      </UnstyledButton>
      {getArrPagination(activePage, total).map((elem) => {
        return (
          <UnstyledButton
            key={"paginationBtn" + elem}
            classNames={{ root: style.control }}
            data-active={Boolean(+elem === activePage)}
            onClick={() => {
              click(+elem);
            }}
          >
            {elem}
          </UnstyledButton>
        );
      })}

      <UnstyledButton
        classNames={{ root: style.control }}
        data-custom-disabled={Boolean(activePage === total)}
        custom-type="edge"
        onClick={() => {
          !(activePage === total) && click(activePage + 1);
        }}
      >
        <Image src="/right.svg" alt="right icon" w={16} h={16} />
      </UnstyledButton>
    </Group>
  );
};
