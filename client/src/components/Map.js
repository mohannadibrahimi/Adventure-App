import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class PlaceMap extends Component{

  renderLogic(){
    if (this.props.active.lat === "Unknown"){
      return(
        <div>Location Map Unavailable</div>
      )
    } else {
      return(
        this.renderContent()
      )
    }
  }

  renderContent(){
    const position = [this.props.active.lat, this.props.active.lng]
    return(
      <div>
          <Map center={position} zoom="8">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
          <Marker position={position}>
            <Popup>
              {this.props.active.name}
            </Popup>
          </Marker>
          </Map>
        </div>
    )
  }

  render(){
      return this.renderLogic()
  }
}


function mapStateToProps (state) {
  return { 
    active: state.activePlace,
  } 
}

export default connect(mapStateToProps)(PlaceMap);