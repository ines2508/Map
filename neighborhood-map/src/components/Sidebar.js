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
                                key={place.venue.id}>
                                <p><span className="venue-number">{index}</span><span id="place-name">{place.venue.name}</span></p>
                            </li>
                        ))
                    }  
                </ul>
            </div>
        )
    }
}

export default SideBar