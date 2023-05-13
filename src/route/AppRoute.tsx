import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import DetailsPage from '../pages/details/DetailsPage';
import SearchPage from '../pages/search/SearchPage';
import ExplorePage from '../pages/explore/ExplorePage';
import NotFoundPage from '../pages/error/NotFoundPage';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppRoute = () => {
    return (
        <Fragment>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:mediaType/:id" element={<DetailsPage />} />
                <Route path="/search/:query" element={<SearchPage />} />
                <Route path="/explore/:mediaType" element={<ExplorePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Fragment>
    )
}

export default AppRoute
