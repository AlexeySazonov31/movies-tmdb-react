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
    rating?: number;
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


// * Full Movie start

export interface FullMovie {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    rating?: number
    genre_ids?: number[] // ? for valid ts in MovieCard (think about getting rid of)
}

export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

// * full movie end