import { useEffect } from 'react';
// import './App.css'
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { GenreInterface, FetchAllGenres } from './interface/type';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoute from "./route/AppRoute";

function App() {

  const dispatch = useDispatch()
  const { url } = useSelector((state: RootState) => state.home);
  console.log('REDUX', url);


  useEffect(() => {
    //Consulta los detalles de configuración de la API.
    fetchApiConfig();
    //Consulta los generos del API
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    const promises: Promise<FetchAllGenres>[] = [];
    const endPoints: string[] = ["tv", "movie"];
    const allGenres: any = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      console.log('GENERS', genres);
      // enlazo con interface de genero
      return genres.map((item: GenreInterface) => (
        allGenres[item.id] = item
      ));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <AppRoute></AppRoute>
    </BrowserRouter>
  )
}

export default App
