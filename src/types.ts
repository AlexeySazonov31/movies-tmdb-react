import { Dispatch } from "react";

export interface ResetBtnProps {
    onClick: () => void;
    disabled?: boolean;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface DataMovies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface FiltersValue {
    genres: string[] | [];
    year: string | null;
    ratingMin: number | string;
    ratingMax: number | string;
}

export type SortValue = string | null;

export interface FiltersProps {
    filtersValue: FiltersValue;
    setFiltersValue: Dispatch<FiltersValue>;
    sort: SortValue;
    setSort: Dispatch<SortValue>;
    isErrorGenres: boolean;
    dataGenres: Genre[] | null;
}