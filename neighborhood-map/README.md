Barcelona's Art Places is a website built with FourSquare and Google Map API. All the code is written in React with the use of ES6.

# Start

To start open the terminal and write "yarn start".

# Loading the data and error handling

The site uses Promise and componentDidMount() to make sure no data will be displayed empty. The error handling is presented in console.log and while loading the data from API.

First the site presents results from FourSquare API based on the query "art" and place "Barcelona". Then uses geographical coordinates from FourSquare API to match the place with Google Map API. Also to help to search and filter the data, the marker gets the same "id" as venue from FourSquare API. The "id" in the marker is kept as attribute "number".

# Displaying the map and markers

The Google Map is set to show all the data inside the map's boundaries to make sure the user sees them all. 

The markers are displayed based on the initial data from "this.state.venues" and when the user starts to search inside of them in the Sidebar, the list of markers will change into filtered results from "this.state.filtered".

All the markers have their unique label with the number presented on the icon (this number is different then the "id").

When searching the result, the labels on the markers and the numbers on the Sidebar are kept the same to find them faster. 

# Showing InfoWindow

After clicking on the marker the Infowindow is shown with the data from FourSquare API.

Only one Infowindow is shown at the time. To close the Infowindow the user needs to click the new one or the cross on the Infowindow.

# Showing and filtering the markers

On the sidebar the input collects the data and trims them from the left side. Then the data are stored in the state "query" and used to filter the venues and the markers. 
If the query matches the name of the marker, the marker's attribute "visible" is changed to "true", otherwise is set to "false".

# Displaying the sidebar

The sidebar is hidden till the data from the API are loaded so the user doesn't see the empty list, only the message on the map's place: "Please wait. We are connecting to FourSquare and Google Map API". 

Showing the sidebar is toggled by the state "showList" which is activated by the function "renderMap" and the button with the className "menu-button" in the Header. The icon on the button is also toggled by this state. 

Appropriate displaying the input and the list for the users whom use the Screen Readers are made with the tabindex -1 to hide the list when it is not present on the screen.

# Clicking the venue on the sidebar

When the user clicks the venue on the sidebar, the matched marker bounces and the infowindow is shown. 


