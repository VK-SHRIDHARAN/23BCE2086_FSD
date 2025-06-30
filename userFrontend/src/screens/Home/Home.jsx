import { useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx';
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