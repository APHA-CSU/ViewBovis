import L from 'leaflet';
import SNPsoi from '../../imgs/SNPsoi.svg'
import SNPrelated from '../../imgs/SNPrelated.svg'

const markerNumberIcon = (number) => {
  return `
  <div style="font-size: medium;
  color: white;
  font-weight: 500;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
"><img src="${SNPrelated}" alt="${number}" width="30" height="30"/>
<a style="position: absolute;">${number}</a><div/>`
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
      iconAnchor: [20, 28],
    })
  }
}
export { relatedMarker };