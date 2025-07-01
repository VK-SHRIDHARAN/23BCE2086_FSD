import { useState } from 'react';
import Header from '../../Components/Header/Header.jsx';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu.jsx';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';

const Home = () => {
    const [category, setCategory] = useState('All');

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
        </div>
    );
};

export default Home;