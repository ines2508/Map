import React, {Component} from 'react'

class SideBar extends Component {

    
    render() {

        console.log(this.props.filteredVenues)
        return (
            <div className='sidebar'>
                <input 
                       onChange={this.props.showVenues}></input>
                <ul className='sidebar-list'>
                    {this.props.filteredVenues.map(
                        (place, index) => (
                            <li key={place.venue.id}>
                                <p><span className="venue-number">{index}</span>{place.venue.name}</p>
                            </li>
                        )
                    )
                }
                    
                </ul>
            </div>
        )
    }
}

export default SideBar