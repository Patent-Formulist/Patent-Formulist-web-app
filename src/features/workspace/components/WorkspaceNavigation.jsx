import { Link } from "react-router-dom"

import logo from '../../../resources/logo.svg'

function WorkspaceNavigation() {
    return (
        <div>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>

            <nav className="nav-links">
                <img src={logo} alt="Logo" />
                <img src={logo} alt="Logo" />
                <img src={logo} alt="Logo" />
            </nav>
        </div>
    )
}

export default WorkspaceNavigation