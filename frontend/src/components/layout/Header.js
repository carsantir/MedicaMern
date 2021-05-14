import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';
import Logo from './Logo';
class Header extends Component {
render() {
return (
<div style={{
    display:"flex",
}}>
<header className="header">
<Link to="/"><h1 className="title">MedicaMern</h1></Link>
<AuthOptions />
</header>
</div>
);
}
}
export default Header;