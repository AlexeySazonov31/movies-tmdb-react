import { Group, Image, UnstyledButton } from "@mantine/core";
import { Dispatch } from "react";

import style from "./Pagination.module.scss";
import { getArrPagination } from "../../common/utils";
import { useWindowScroll } from "@mantine/hooks";

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
  const [, scrollTo] = useWindowScroll();

  const click = (value: number): void => {
    scrollTo({ y: 0 });
    setActivePage(value);
    sessionStorage.setItem(
      sessionStorageKeyName,
      JSON.stringify(Number(value))
    );
  };

  return (
    <Group classNames={{ root: style.root }} gap={8}>
      <UnstyledButton
        classNames={{ root: style.control }}
        onClick={() => {
            !(activePage === 1) && click(activePage - 1);
        }}
        data-custom-disabled={Boolean(activePage === 1)}
        custom-type="edge"
      >
        <Image src="/left.svg" alt="left icon" w={16} h={16} />
      </UnstyledButton>
      {getArrPagination(activePage, total).map((elem) => {
        return (
          <UnstyledButton
            key={"padinationBTN" + elem}
            classNames={{ root: style.control }}
            data-active={Boolean(Number(elem) === activePage)}
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
        onClick={() => {
            !(activePage === total) && click(activePage + 1);
        }}
        data-custom-disabled={Boolean(activePage === total)}
        custom-type="edge"
      >
        <Image src="/right.svg" alt="right icon" w={16} h={16} />
      </UnstyledButton>
    </Group>
  );
};
