import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Background from '../logo/medicina.png';
function Home () {
const {userData} = useContext(UserContext);
const history = useHistory();

return (
<div style={{
                background: `url(${Background})`,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                // backgroundPosition: center center;
                // background-repeat: no-repeat;
                // background-size: cover;
                // overflow: hidden;
            }}>
</div>
);
}
export default Home;