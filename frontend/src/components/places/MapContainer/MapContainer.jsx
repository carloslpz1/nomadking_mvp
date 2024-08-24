// import { GoogleMap, LoadScript, Marker } from '@react-google-maps';
import { MapContainer as Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './MapContainer.css'

const MapContainer = () => {
  return (
    <Map center={[4.674680, -74.103883]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[4.674680, -74.103883]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  )
}

export default MapContainer