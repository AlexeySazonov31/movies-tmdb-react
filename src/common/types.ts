import { Dispatch, RefObject } from "react";

export interface ResetBtnProps {
    onClick: () => void;
    disabled?: boolean;
}

export interface Genre {
    id: number;
    name: string;
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

export type RefContext = RefObject<HTMLElement> | null;


export interface FiltersProps {
    filtersValue: FiltersValue;
    setFiltersValue: Dispatch<FiltersValue>;
    sort: SortValue;
    setSort: Dispatch<SortValue>;
    isErrorGenres: boolean;
    dataGenres: Genre[] | null;
}

export interface Search { value: string; error: boolean }

export type MoviesOrNull = Movie[] | null;

// * Full Movie start

export interface Movie {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection?: BelongsToCollection | null
    budget?: number
    genres?: Genre[] | []
    homepage?: string
    id: number
    imdb_id?: string
    origin_country?: string[]
    original_language: string
    original_title?: string
    overview: string
    popularity: number
    poster_path: string | null
    production_companies?: ProductionCompany[] | null
    production_countries?: ProductionCountry[] | null
    release_date: string
    revenue?: number
    runtime?: number
    spoken_languages?: SpokenLanguage[] | []
    status?: string
    tagline?: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    rating?: number
    genre_ids?: number[] // ? for valid ts in MovieCard (think about getting rid of)
    videos?: Videos

}

interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
}

interface ProductionCountry {
    iso_3166_1: string
    name: string
}

interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface Videos {
    results: Video[]
}

export interface Video {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

// * full movie end