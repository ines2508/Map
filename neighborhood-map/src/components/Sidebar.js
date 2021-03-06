import React, {Component} from 'react'

class SideBar extends Component {

    render() {
        return (
            
            <div className='sidebar'role="menu" aria-label='sidemenu'>
                <input 
                    value={this.props.query}
                    aria-label='searchbox'
                    type="text"
                    tabIndex={this.props.showList ? '0' : '-1' }
                    onChange={this.props.showVenues}
                    placeholder="Search the place"
                >
                    
                </input>
                <ul className='sidebar-list'
                    aria-label="List of art's places"
                    tabIndex={this.props.showList ? '0' : '-1' }
                >
                    {this.props.venues.map((place) => (

                        <li className="list-place"
                            id={place.venue.id}
                            key={place.venue.id}
                            onClick={this.props.showInfowindow}
                            onKeyPress={this.props.showInfowindowOnPress}
                            role="button"
                            tabIndex={this.props.showList ? '0' : '-1' }
                        >
                            <p className="venue-title" id={place.venue.id}>
                                <span className="venue-number" 
                                      id={place.venue.id}
                                >
                                    {Math.abs(Number(place.referralId.slice(-2)))}
                                </span>
                                <span className="venue-name" 
                                      id={place.venue.id}
                                >
                                    {place.venue.name}
                                </span>
                            </p>
                            <p className="venue-address" 
                               id={place.venue.id}
                            >
                                {place.venue.location.address}
                                {place.venue.location.city}
                            </p>
                        </li>
                        ))
                    }  
                </ul>
            </div> 
        )
    }
}

export default SideBar