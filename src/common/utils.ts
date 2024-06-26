import { FiltersValue, Genre, Movie, MoviesOrNull, Video } from "./types";

export function getGenresIdsArr(filtersValue: FiltersValue, dataGenres: Genre[]): number[] | [] {
    return filtersValue.genres.map((selectedGenre) => {
        const id = dataGenres.find(
            (genre) => selectedGenre === genre.name
        )?.id;
        return Number(id);
    })
}

export function abbrNum(number: number | string, decPlaces: number) {
    decPlaces = Math.pow(10, decPlaces);
    const abbrev = ["K", "M", "B", "T"];
    number = Number(number);
    for (let i = abbrev.length - 1; i >= 0; i--) {
        const size = Math.pow(10, (i + 1) * 3);
        if (size <= number) {
            number = Math.round((number * decPlaces) / size) / decPlaces;
            if (number == 1000 && i < abbrev.length - 1) {
                number = 1;
                i++;
            }
            number = String(number) + abbrev[i];
            break;
        }
    }
    return number;
}

export function genresIdsToStringNames(
    arrIds: number[],
    genresArr: Genre[] | null,
): string {
    if (arrIds.length && genresArr?.length) {
        const arrNames = arrIds.map((id) => {
            const name = genresArr.find((genre) => id === genre.id)?.name;
            return name;
        });
        return arrNames.join(", ");
    } else {
        return "error";
    }
}

export function getRatedMovies(): MoviesOrNull {
    const ratedMoviesJson: string | null = localStorage.getItem("ratedMovies");
    let res: MoviesOrNull;
    if (ratedMoviesJson) {
        res = JSON.parse(ratedMoviesJson);
    } else {
        res = null;
    }
    return res;
}
export function getMovieRating(id: number, ratedMovies: MoviesOrNull): number | null {
    if (ratedMovies) {
        const movie: Movie | undefined = ratedMovies.find(elem => elem.id === id);
        if (movie && (movie.rating || movie.rating === 0)) {
            return movie.rating;
        }
    }
    return null;
}

export function timeConvert(n: number): string {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    let rminutes: string | number = Math.round(minutes);
    rminutes = String(rminutes).length === 1 ? "0" + rminutes : rminutes;
    if (rhours === 0) {
        return rminutes + "m";
    } else {
        return rhours + "h " + rminutes + "m";
    }
}

export function dateConvert(n: string): string {
    return (new Date(n)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function searchInRatedMovies(string: string): MoviesOrNull {
    const ratedMoviesJson: string | null = localStorage.getItem("ratedMovies");
    let ratedMovies: MoviesOrNull;

    if (ratedMoviesJson) {
        ratedMovies = JSON.parse(ratedMoviesJson);
    } else {
        ratedMovies = null;
    }
    if (ratedMovies) {
        const searchedMovies: Movie[] = [];
        for (const elem of ratedMovies) {
            if (elem.title.toLowerCase().search(string.toLowerCase()) !== -1) {
                searchedMovies.push(elem);
            }
        }
        if (searchedMovies.length) {
            return searchedMovies;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export function getShowMovieList(ratedMovies: MoviesOrNull, activePage: number): MoviesOrNull {
    let showMovieList: MoviesOrNull;
    if (ratedMovies) {
        if (ratedMovies.length > 4) {
            if (activePage === 1) {
                showMovieList = ratedMovies.slice(0, 4);
            } else {
                showMovieList = ratedMovies.slice(
                    (activePage - 1) * 4,
                    (activePage - 1) * 4 + 4
                );
            }
        } else {
            showMovieList = ratedMovies;
        }
    } else {
        showMovieList = null;
    }
    return showMovieList;
}

export function getTheBestVideo(arrVideos: Video[]): string {
    let video = arrVideos.find((elem) => { return elem.name === "Official Trailer" });
    if (video) {
        return video.key;
    }
    video = arrVideos.find((elem) => { return elem.type === "Teaser" });
    if (video) {
        return video.key;
    } else {
        return arrVideos[0].key;
    }
}

export function range(a: number, b: number): string[] {
    const arr = [];
    while (a <= b) {
        arr.push(String(a));
        a++
    }
    return arr;
}

export function getArrPagination(activePage: number, total: number): number[] | string[] {
    let start: number;
    let finish: number;
    if (total <= 3) {
        start = 1;
        finish = total;
    } else if (activePage === 1) {
        start = 1;
        finish = 3;
    } else if (activePage === total) {
        start = activePage - 2;
        finish = activePage;
    } else {
        start = activePage - 1;
        finish = activePage + 1;
    }
    return range(start, finish);
}

export const getWidthHeightImgSkeletonInMovieCard = (type: "w" | "h", full: boolean) => {
    if (type === "h" && full) {
        return { base: 545, xs: 345, sm: 255, md: 375 };
    } else if (type === "h" && !full) {
        return { base: 155, xs: 170, md: 155, lg: 170 };
    } else if (type === "w" && full) {
        return { base: "100%", xs: 410, sm: 250, md: 390 };
    } else if (type === "w" && !full) {
        return { base: 145, sm: 150, lg: 160 };
    }
}