import React, {Component} from 'react'

class SideBar extends Component {

    
    render() {
        return (
            <div className='sidebar'>
                <input value={this.props.query} onChange={this.showVenues}></input>
                <ul className='sidebar-list'>
                    <li>Cafe</li>
                    <li>Cafe 2</li>
                </ul>
            </div>
        )
    }
}

export default SideBar