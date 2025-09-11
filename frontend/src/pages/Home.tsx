import {Link} from 'react-router-dom';

function Home(){

    return(
        <>
            <nav className="w-full">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </>
    )
}

export default Home;