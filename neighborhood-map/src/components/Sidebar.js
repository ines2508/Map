import React, {Component} from 'react'

class SideBar extends Component {

    render() {
        return (
            <div className='sidebar'>
                <input onChange={this.props.showVenues}></input>
                <ul className='sidebar-list'>
                    {
                        this.props.venues.map((place, index) => (
                            <li className="list-place"
                                id={place.venue.id}
                                key={place.venue.id}
                                onClick={this.props.showInfowindow}
                            >
                                <p className="venue-title">
                                    <span className="venue-number" id={place.venue.id}>
                                    {index}
                                    </span>
                                    <span className="venue-name" id={place.venue.id}>
                                    {place.venue.name}
                                    </span>
                                </p>
                                <p className="venue-address" id={place.venue.id}>
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