import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataMovies, FiltersValue, Genre, Movie, SortValue } from "./types";
import { sortValues } from "./constants";


export function useGenres (){
    return useQuery({ queryKey: ['genres'], queryFn: fetchGenres, retry: false, })
}

export function useMovies (activePage: number, sort: SortValue, filtersValue: FiltersValue, genresIdsArr: number[] | []){
    return useQuery({
        queryKey: ["movies", activePage, sort, filtersValue],
        queryFn: () =>
            fetchMovies(
                String(activePage),
                String(sortValues.find((elem) => elem.name === sort)?.value),
                genresIdsArr,
                filtersValue.year,
                filtersValue.ratingMin ? filtersValue.ratingMin : null,
                filtersValue.ratingMax ? filtersValue.ratingMax : null
            ),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: true,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
    })
}
    
export function useMovie(id: string | undefined){
       return useQuery({ queryKey: ['movie', id], queryFn: () => fetchMovie(id ? id : "error") })
}




const fetchGenres = (): Promise<Genre[]> =>
    axios.get("/api/genres").then((response) => response.data.genres);

const fetchMovies = (
    page: string,
    sort: string,
    genres: number[] | [],
    year: string | null,
    ratingMin: number | string | null,
    raitingMax: number | string | null
): Promise<DataMovies> =>
    axios
        .get("/api/movies", {
            params: {
                page: page,
                sort_by: sort,
                genres: genres,
                release_year: year,
                rating_min: ratingMin,
                rating_max: raitingMax,
            },
        })
        .then(response => response.data);

const fetchMovie = (
    id: string
): Promise<Movie> =>
    axios.get(`/api/movies/${id}`).then(response => response.data)

