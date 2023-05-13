export interface FetchAllGenres {
    genres: GenreInterface[];
}
export interface GenreInterface {
    id: string;
    name: string;
}

export interface FetchAllImgs {
    page: number;
    results: ImgInterface[];
    total_pages: number;
    total_results: number
}
export interface ImgInterface {
    adult: boolean;
    backdrop_path: string;
    genre_ids: GenreInterface[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: string;
}       