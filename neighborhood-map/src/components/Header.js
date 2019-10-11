import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faFingerprint } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
    return (
        <header>
            <button 
                className='menu-button' 
                aria-label="Toggle Sidebar Menu"
                title="Show list of Barcelona's Art Places"
                onClick={props.toggleButton}
            >{props.showList ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} /> }
            </button>
            <h1 className='header-title'
                tabIndex='0'
            ><span aria-label='logo'><FontAwesomeIcon icon={faFingerprint} /></span> Barcelona's Art Places            
            </h1>
        </header>
    )

}

export default Header