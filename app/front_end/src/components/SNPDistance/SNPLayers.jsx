import L from 'leaflet';
import SNPsoi from '../../imgs/SNPsoi.svg'
import SNPrelated from '../../imgs/SNPrelated.svg'

const markerNumberIcon = (number) => {
  return `<img src="${SNPrelated}" alt="${number}" width="30" height="30"/>
  <div style="
  position: absolute;
  right: 35%;
  top: 10%;
  font-size: medium;
  color: white;
  font-weight: 700;
">${number}<div/>`

}

const relatedMarker = (props, SOI) => { 
if(props.submission === SOI) {
  return new L.Icon({
    className: `number-marker marker-${props.submission}`,
    iconUrl: SNPsoi,
    iconSize: [40, 40],
    iconAnchor: [20, 35],
  })} else {
    return new L.DivIcon({
      className : "number-marker-related",
      html : markerNumberIcon(props.snp_distance),
      styles : {border: "none",
      background: "transparent", display : "flex"},
      iconSize: [40, 40],
      iconAnchor: [10, 25],
    })
  }
}
export { relatedMarker };