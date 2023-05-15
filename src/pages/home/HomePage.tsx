import HeroBanner from './components/HeroBanner'
import Trending from './components/Trending'
import Popular from './components/Popular'
import TopRated from './components/TopRated'

// import "../../assets/scss/home/home.scss"

const HomePage = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    )
}

export default HomePage
