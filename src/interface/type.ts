export interface FetchAllGenres {
    genres: GenreInterface[];
}
export interface FetchAllImgs {
    page: number;
    results: ImgInterface[];
    total_pages: number;
    total_results: number
}

export interface FetchAllMovies {
    page: number;
    results: MovieInterface[];
    total_pages: number;
    total_results: number
}
export interface FetchAllVideos {
    page: number;
    results: VideosInterface[];
}
export interface FetchAllCredits {
    id: number;
    cast: CastInterface[];
    crew: CrewInterface[]
}

export interface CastInterface {
    id: string;
    adult: boolean;
    cast_id: string;
    character: string;
    credit_id: string;
    gender: string;
    known_for_department: string;
    name: string;
    order: string;
    original_name: string;
    popularity: string;
    profile_path: string;
}

export interface CrewInterface {
    id: string;
    adult: boolean;
    department: string;
    gender: string;
    job: string;
    known_for_department: string;
    name: string;
    order: string;
    original_name: string;
    popularity: string;
    profile_path: string;
}

export interface GenreInterface {
    id: string;
    name: string;
}

export interface ImgInterface { //15
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
export interface MovieInterface {
    id: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    genres: GenreInterface[];
    media_type: string;
    original_language: string;
    original_title: string;
    original_name: string;
    overview: string;
    popularity: string;
    poster_path: string;
    release_date: string;
    revenue: string;
    runtime: number;
    status: string;
    tagline: string;
    first_air_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: string;
    homepage: string;
    name: string;
    created_by: string[];
    // belongs_to_collection: string[];     
}

export interface VideosInterface {
    id: string;
    name: string;
    key: string;
    site: string;
    size: string;
    type: string;
    official: boolean;
    published_at: string;
}