"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[88],{8495:(t,e,n)=>{n.d(e,{A:()=>i});n(5043);const i=n.p+"static/media/movementCluster.a3550c9f2beb7fe7086c099ed4535084.svg"},2242:(t,e,n)=>{n.d(e,{A:()=>r});var i=n(228),s=n.n(i),a=n(5043),o=n(9896);const r=()=>{const t=(0,o.ko)(),e=s().tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),n=s().tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",maxZoom:16}),i=s().tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"}),r={"Open Street Map":e,"Esri Grey Canvas":n,"Esri World Imagery":i};(0,a.useEffect)((()=>{const n=new(s().control.layers)(r,null,{collapsed:!0});n.addTo(t);const i=n.getContainer();i.querySelectorAll("div")[0].insertAdjacentHTML("beforebegin","<strong style='font-size: 15px; margin-bottom: 15px;'>Basemaps</strong>");return i.querySelectorAll("input")[0].setAttribute("checked","true"),e.addTo(t),()=>{n.remove()}}),[])}},8814:(t,e,n)=>{n.d(e,{A:()=>r});var i=n(228),s=n.n(i),a=n(5043),o=n(9896);const r=t=>{let{setOpenSideBar:e,openSideBar:n}=t;const i=(0,o.ko)();(0,a.useEffect)((()=>{const t=new(s().Control)({position:"topleft"});return t.onAdd=function(){const t=s().DomUtil.create("div","leaflet-control leaflet-bar");return t.setAttribute("id","btn__map-fullscreen"),t.onclick=function(){e(!n),i.invalidateSize()},n?t.insertAdjacentHTML("afterbegin",'<a id="toggle-sidebar" title="Hide sidebar">\n          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">\n            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>\n            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"\n            />\n          </svg>\n        </a>\n              '):t.insertAdjacentHTML("afterbegin",'<a id="toggle-sidebar" title="Show sidebar">\n          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">\n          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"></path>\n          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>\n        </svg>\n        </a>\n              '),t},t.addTo(i),()=>{t.remove()}}),[n])}},9837:(t,e,n)=>{n.d(e,{A:()=>l});var i=n(5043),s=n(9896),a=n(228),o=n.n(a);const r=o().Control.extend({options:{position:"topleft",unitSystem:"imperial",color:"#4D90FE",contrastingColor:"#fff",show_last_node:!1,show_azimut:!1},clickSpeed:200,onAdd:function(t){var e=o().DomUtil.create("div","leaflet-control leaflet-bar"),n=o().DomUtil.create("a","icon-ruler",e),i=t.getContainer(),s=this;n.href="#",n.title="Toggle measurement tool",o().DomEvent.on(n,"click",o().DomEvent.stop).on(n,"click",(function(){o().DomUtil.hasClass(n,"icon-active")?(s.resetRuler(!!s.mainLayer),o().DomUtil.removeClass(n,"icon-active"),o().DomUtil.removeClass(i,"ruler-map")):(s.initRuler(),o().DomUtil.addClass(n,"icon-active"),o().DomUtil.addClass(i,"ruler-map"))})),this.options.color&&-1===this.options.color.indexOf("#")?this.options.color="#"+this.options.color:this.options.color||(this.options.color="#4D90FE");var a=this.options.color.replace("#","");return this.options.contrastingColor="#"+(function(t){var e="string"===typeof t?function(t){if(3===t.length)t=t.charAt(0)+t.charAt(0)+t.charAt(1)+t.charAt(1)+t.charAt(2)+t.charAt(2);else if(6!==t.length)throw new Error("Invalid hex color: "+t);for(var e=[],n=0;n<=2;n++)e[n]=parseInt(t.substr(2*n,2),16);return e}(t):t;return.2126*e[0]+.7152*e[1]+.0722*e[2]}(a)>=165?"000":"fff"),e},onRemove:function(t){this.resetRuler(!!this.mainLayer)},initRuler:function(){var t=this,e=this._map;this.mainLayer=o().featureGroup(),this.mainLayer.addTo(this._map),e.touchZoom.disable(),e.doubleClickZoom.disable(),e.boxZoom.disable(),e.keyboard.disable(),e.tap&&e.tap.disable(),this.dblClickEventFn=function(t){o().DomEvent.stop(t)},this.clickEventFn=function(e){t.clickHandle?(clearTimeout(t.clickHandle),t.clickHandle=0,t.options.show_last_node&&(t.preClick(e),t.getMouseClickHandler(e)),t.getDblClickHandler(e)):(t.preClick(e),t.clickHandle=setTimeout((function(){t.getMouseClickHandler(e),t.clickHandle=0}),t.clickSpeed))},this.moveEventFn=function(e){t.clickHandle||t.getMouseMoveHandler(e)},e.on("click",this.clickEventFn,this),e.on("mousemove",this.moveEventFn,this),this.resetRuler()},initLayer:function(){this.layer=o().featureGroup(),this.layer.addTo(this.mainLayer),this.layer.on("selected",this.layerSelected),this.layer.on("click",this.clickEventFn,this)},resetRuler:function(t){var e=this._map;t&&(e.off("click",this.clickEventFn,this),e.off("mousemove",this.moveEventFn,this),this.mainLayer&&this._map.removeLayer(this.mainLayer),this.mainLayer=null,this._map.touchZoom.enable(),this._map.boxZoom.enable(),this._map.keyboard.enable(),this._map.tap&&this._map.tap.enable()),this.layer=null,this.prevLatlng=null,this.poly=null,this.multi=null,this.latlngs=null,this.latlngsList=[],this.sum=0,this.distance=0,this.separation=1,this.last=0,this.fixedLast=0,this.totalIcon=null,this.total=null,this.lastCircle=null,this.UNIT_CONV=1e3,this.SUB_UNIT_CONV=1e3,this.UNIT="km",this.SUB_UNIT="m","imperial"===this.options.unitSystem&&(this.UNIT_CONV=1609.344,this.SUB_UNIT_CONV=5280,this.UNIT="mi",this.SUB_UNIT="ft"),this.measure={scalar:0,unit:this.SUB_UNIT}},cleanUpMarkers:function(t){var e=this.layer;e&&e.eachLayer((function(n){n.options&&"tmp"===n.options.type&&(t?n.options.type="fixed":e.removeLayer(n))}))},cleanUpFixed:function(){var t=this.layer;t&&t.eachLayer((function(e){e.options&&"fixed"===e.options.type&&t.removeLayer(e)}))},convertDots:function(){var t=this,e=this.layer;e&&e.eachLayer((function(e){if(e.options&&"dot"===e.options.type){var n=e.options.marker,i=n?n.options.icon.options:null,s=i?i.html:"";if(s&&-1===s.indexOf(t.measure.unit)){var a=e.options.label.split(" "),r=parseFloat(a[0]),l=a[1],c="";-1!==e.options.label.indexOf(t.measure.unit)?c=e.options.label:l===t.UNIT?c=(r*t.SUB_UNIT_CONV).toFixed(2)+" "+t.SUB_UNIT:l===t.SUB_UNIT&&(c=(r/t.SUB_UNIT_CONV).toFixed(2)+" "+t.UNIT);var p=o().divIcon({className:"total-popup-label",html:c});n.setIcon(p)}}}))},displayMarkers:function(t,e,n){var i,s,a,r,l,c=t[t.length-1],p=t[0],d=p.distanceTo(c)/this.UNIT_CONV,h=d,u=this._map.latLngToContainerPoint(c),m=this._map.latLngToContainerPoint(p),g=1;this.measure.unit===this.SUB_UNIT&&(h*=g=this.SUB_UNIT_CONV);for(var v=n*g+h,f=n*g,y=Math.floor(f);y<v;y++)r=(v-y)/h,y%this.separation||y<f||(i=u.x-r*(u.x-m.x),s=u.y-r*(u.y-m.y),l=o().point(i,s),c=this._map.containerPointToLatLng(l),a=y+" "+this.measure.unit,this.renderCircle(c,0,this.layer,e?"fixed":"tmp",a),this.last=v);return d},renderCircle:function(t,e,n,i,s){var a=this.options.color,r="",l="",c={color:this.options.color,fillOpacity:1,opacity:1,fill:!0,type:i=i||"circle"},p=this.prevLatlng&&this._map?this._map.latLngToContainerPoint(this.prevLatlng):null,d=this._map?this._map.latLngToContainerPoint(t):null;"dot"===i&&(l="node-label",p&&this.options.show_azimut&&(r=' <span class="azimut"> '+this.lastAzimut+"&deg;</span>"));var h=this._map.containerPointToLatLng(d);if(s){var u=o().divIcon({className:"total-popup-label "+l,html:'<span style="color: '+a+';">'+s+r+"</span>"});c.icon=u,c.marker=o().marker(h,{icon:u,type:i}).addTo(n),c.label=s}var m=o().circleMarker(t,c);return m.setRadius(3),m.addTo(n),m},getAzimut:function(t,e){var n=0;return t&&e&&((n=parseInt(180*Math.atan2(e.y-t.y,e.x-t.x)/Math.PI))>0?n+=90:n<0&&(n=(n=Math.abs(n))<=90?90-n:360-(n-90))),this.lastAzimut=n,n},renderPolyline:function(t,e,n){var i=o().polyline(t,{color:this.options.color,weight:2,opacity:1,dashArray:e});return i.addTo(n),i},renderMultiPolyline:function(t,e,n){var i;return(i=o().version.startsWith("0")?o().multiPolyline(t,{color:this.options.color,weight:2,opacity:1,dashArray:e}):o().polyline(t,{color:this.options.color,weight:2,opacity:1,dashArray:e})).addTo(n),i},formatDistance:function(t,e){return{scalar:o().Util.formatNum(t<1?t*parseFloat(this.SUB_UNIT_CONV):t,e),unit:t<1?this.SUB_UNIT:this.UNIT}},hasClass:function(t,e){var n=o().DomUtil.hasClass;for(var i in e)if(n(t,e[i]))return!0;return!1},preClick:function(t){var e=this,n=t.originalEvent.target;this.hasClass(n,["leaflet-popup","total-popup-content"])||(e.layer||e.initLayer(),e.cleanUpMarkers(!0),e.fixedLast=e.last,e.prevLatlng=t.latlng,e.sum=0)},getMouseClickHandler:function(t){var e,n=this;for(var i in n.fixedLast=n.last,n.sum=0,n.poly&&(n.latlngsList.push(n.latlngs),n.multi?n.multi.setLatLngs(n.latlngsList):n.multi=n.renderMultiPolyline(n.latlngsList,"5 5",n.layer,"dot")),n.latlngsList)e=n.latlngsList[i],n.sum+=e[0].distanceTo(e[1])/n.UNIT_CONV;var s=(n.measure.unit===this.SUB_UNIT?n.sum*n.SUB_UNIT_CONV:n.sum).toFixed(2);n.renderCircle(t.latlng,0,n.layer,"dot",parseInt(s)?s+" "+n.measure.unit:""),n.prevLatlng=t.latlng},getMouseMoveHandler:function(t){var e="";if(this.prevLatlng){var n=t.latlng;this.latlngs=[this.prevLatlng,t.latlng],this.poly?this.poly.setLatLngs(this.latlngs):this.poly=this.renderPolyline(this.latlngs,"5 5",this.layer),this.distance=parseFloat(this.prevLatlng.distanceTo(t.latlng))/this.UNIT_CONV,this.measure=this.formatDistance(this.distance+this.sum,2);var i=this.prevLatlng?this._map.latLngToContainerPoint(this.prevLatlng):null,s=this._map.latLngToContainerPoint(n);if(i&&this.options.show_azimut)e=' <span class="azimut azimut-final" style="'+("color: "+this.options.contrastingColor+";")+'"> &nbsp; '+this.getAzimut(i,s)+"&deg;</span>";var a=this.measure.scalar+" "+this.measure.unit,r='<span class="total-popup-content" style="background-color:'+this.options.color+"; color: "+this.options.contrastingColor+'">'+a+e+"</span>";this.total?(this.totalIcon=o().divIcon({className:"total-popup",html:r}),this.total.setLatLng(t.latlng),this.total.setIcon(this.totalIcon)):(this.totalIcon=o().divIcon({className:"total-popup",html:r}),this.total=o().marker(t.latlng,{icon:this.totalIcon,clickable:!0}).addTo(this.layer));var l=this.measure.scalar,c=this.separation,p=parseInt(l).toString().length,d=Math.pow(10,p),h=l>d/2?d/10:d/20,u=0;if(this.separation=h,c!==this.separation&&this.fixedLast){this.cleanUpMarkers(),this.cleanUpFixed();var m=this.multi.getLatLngs();for(var g in m)u+=this.displayMarkers.apply(this,[m[g],!0,u]);this.displayMarkers.apply(this,[this.poly.getLatLngs(),!1,this.sum]),this.convertDots()}else this.cleanUpMarkers(),this.displayMarkers.apply(this,[this.poly.getLatLngs(),!1,this.sum])}},getDblClickHandler:function(t){var e="",n=this;if(this.total){if(this.layer.off("click"),o().DomEvent.stop(t),this.options.show_azimut)e=' <span class="azimut azimut-final" style="'+("color: "+this.options.contrastingColor+";")+'"> &nbsp; '+this.lastAzimut+"&deg;</span>";var i=this.layer,s=this.measure.scalar+" "+this.measure.unit+" ",a=(this.measure.unit===this.SUB_UNIT?(this.measure.scalar,this.UNIT_CONV):this.measure.scalar,this.total.getLatLng(),this.total),r=['<div class="total-popup-content" style="background-color:'+this.options.color+"; color: "+this.options.contrastingColor+'">'+s+e,'  <svg class="close" viewbox="0 0 45 35">','   <path style="stroke: '+this.options.contrastingColor+'" class="close" d="M 10,10 L 30,30 M 30,10 L 10,30" />',"  </svg>","</div>"].join("");this.totalIcon=o().divIcon({className:"total-popup",html:r}),this.total.setIcon(this.totalIcon);var l={total:this.measure,total_label:a,unit:this.UNIT_CONV,sub_unit:this.SUB_UNIT_CONV};i.on("click",(function(t){o().DomUtil.hasClass(t.originalEvent.target,"close")?n.mainLayer.removeLayer(i):i.fireEvent("selected",l)})),i.fireEvent("selected",l),this.resetRuler(!1)}},purgeLayers:function(t){for(var e in t)t[e]&&this.layer.removeLayer(t[e])},layerSelected:function(t){}}),l=()=>{const t=(0,s.ko)();(0,i.useEffect)((()=>{const e=new r({unitSystem:"imperial",position:"topleft",color:"#FF0080",type:"line"});return e.addTo(t),()=>{e.remove()}}))}},900:(t,e,n)=>{n.d(e,{A:()=>r});var i=n(228),s=n.n(i),a=n(5043),o=n(9896);const r=()=>{const t=(0,o.ko)(),e=[52.56555275762325,-1.4667093894864072];(0,a.useEffect)((()=>{const n=new(s().Control)({position:"topleft"}),i=new(s().control.scale)({imperial:!1});return n.onAdd=function(){const n=s().DomUtil.create("div","leaflet-control leaflet-bar");return n.onclick=()=>{t.setView(e,6)},n.insertAdjacentHTML("afterbegin",'\n        <a title="Reset view">\n            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">\n            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>\n            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>\n            </svg>\n        </a>\n        '),n},n.addTo(t),i.addTo(t),()=>{n.remove(),i.remove()}}),[])}},3088:(t,e,n)=>{n.r(e),n.d(e,{default:()=>C});var i=n(9419),s=n(9349),a=n(6036),o=n(9896),r=(n(6433),n(228)),l=n.n(r),c=n(5043);const p=n.p+"static/media/SNPsoi.9c9a73af37ef4ab3fbcb1a7e586ef58c.svg";const d=n.p+"static/media/SNPrelated.3d6ef995b712704d8be98d53fc8be63f.svg",h=(t,e)=>{return t.submission===e?new(l().Icon)({className:`number-marker marker-SOI marker-${t.submission}`,iconUrl:p,iconSize:[40,40],iconAnchor:[20,35]}):new(l().DivIcon)({className:`number-marker-related marker-${t.submission}`,html:(n=t.snp_distance,`\n  <div style="font-size: medium;\n  color: white;\n  font-weight: 500;\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n"><img src="${d}" alt="${n}" width="30" height="30"/>\n<a style="position: absolute;">${n}</a><div/>`),styles:{border:"none",background:"transparent",display:"flex"},iconSize:[40,40],iconAnchor:[20,28]});var n};var u=n(5936),m=n.n(u),g=n(8814),v=n(9837),f=n(900),y=n(8495),b=n(2242),L=n(4556),_=n(5579),k=n(579);const x=c.memo((t=>{let{checkedLayers:e,useCountyandHotspotLayers:n,setOpenSideBar:o,openSideBar:r,SNPMapDataset:p,RiskLayers:d,CountyLayers:u,HotspotLayers:y}=t;const _=(0,L.d4)((t=>t.counter.openSNPTable)),x=(0,c.useRef)(null),C=function(t,e){return`\n      <div id="popup_header_${t.animal_id}" class="fs-5 fw-bold">${t.animal_id}</div><br>\n        <div id="popTabContent">     \n          <table class="table table-striped">\n            <tbody>\n              <tr>\n                <td><strong>Submission:</strong></td>\n                <td>${e}</td> \n              </tr>\n              <tr>\n                <td><strong>Date of Birth:</strong></td>\n                <td>${t.dob}</td>\n              </tr>\n              <tr>\n                <td><strong>Slaughter Date:</strong></td>\n                <td>${t.slaughter_date}</td>\n              </tr>\n              <tr>\n                <td><strong>Miles:</strong></td>\n                <td>${parseFloat(t.distance).toFixed(2)}</td>\n              </tr>\n              <tr>\n                <td><strong>SNP Distance:</strong></td>\n                <td>${t.snp_distance}</td>\n              </tr>\n              <tr>\n                <td><strong>Precise Location:</strong></td>\n                <td>${t.cph}</td> \n              </tr>\n              <tr>\n                <td><strong>OS Map Reference:</strong></td>\n                <td>${t.os_map_ref}</td>\n              </tr>\n              <tr>\n                <td><strong>Species:</strong></td>\n                <td>${t.species}</td> \n              </tr>\n              <tr>\n                <td><strong>Animal Type:</strong></td>\n                <td>${t.animal_type}</td> \n              </tr>\n              <tr>\n                <td><strong>Sex:</strong></td>\n                <td>${"F"===t.sex?"Female":"M"===t.sex?"Male":"Unknown"}\n                </td>\n              </tr> \n              <tr>\n                <td><strong>Disclosing Test Type:</strong></td>\n                <td>${t.disclosing_test}</td>\n              </tr> \n              <tr>\n                <td><strong>Import Country:</strong></td>\n                <td>${null==t.import_country?"British":`${t.import_country}`}</td>\n              </tr> \n            </tbody>\n          </table>\n        </div>\n      </div>        \n      `},S={maxWidth:400,className:"relatedPopupOptions",autoClose:!1,closeOnClick:!1,maxHeight:300};return(0,k.jsx)("div",{ref:x,children:(0,k.jsxs)(i.W,{center:[53.3781,-1],zoom:6,zoomAnimation:!0,zoomAnimationThreshold:20,children:[(0,k.jsx)(s.e,{attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),(0,k.jsx)(b.A,{}),(0,k.jsx)(f.A,{}),(0,k.jsx)(g.A,{setOpenSideBar:o,openSideBar:r,type:"snp_map"}),(0,k.jsx)(v.A,{}),(0,k.jsxs)(c.Suspense,{fallback:(0,k.jsx)(k.Fragment,{}),children:[(0,k.jsx)(y,{isChecked:n.hotspotLayers}),(0,k.jsx)(u,{isChecked:n.countyLayers}),Object.keys(e).length>0&&(0,k.jsx)(d,{checkedLayers:e})]}),(0,k.jsx)(T,{SNPMapDataset:p,openTable:_,mapRef:x}),!_&&(0,k.jsx)(m(),{chunkedLoading:!0,iconCreateFunction:t=>new(l().DivIcon)({html:`<span class="cluster-icon">${t.getChildCount()}</span>`,className:"cluster-icon",iconSize:[30,30]}),children:Object.keys(p).filter((t=>{var e,n;return"SOI"!==t&&t!==p.SOI&&(null===(e=p[t])||void 0===e?void 0:e.lat)&&(null===(n=p[t])||void 0===n?void 0:n.lon)})).map(((t,e)=>(0,k.jsx)(a.p,{ref:e=>{null===e||void 0===e||e.bindPopup(C({...p[t]},t),S)},icon:h({...p[t],submission:t},p.SOI),position:[p[t].lat,p[t].lon]},"snp_related_marker_"+e)))}),_&&(0,k.jsx)(k.Fragment,{children:Object.keys(p).filter((t=>{var e,n;return"SOI"!==t&&t!==p.SOI&&(null===(e=p[t])||void 0===e?void 0:e.lat)&&(null===(n=p[t])||void 0===n?void 0:n.lon)})).map(((t,e)=>(0,k.jsx)(a.p,{ref:e=>{null===e||void 0===e||e.bindPopup(C({...p[t]},t),S)},icon:h({...p[t],submission:t},p.SOI),position:[p[t].lat,p[t].lon]},"snp_related_marker_"+e)))}),Object.keys(p).filter((t=>t===p.SOI)).map(((t,e)=>(0,k.jsx)(a.p,{ref:e=>{null===e||void 0===e||e.bindPopup(C({...p[t]},t),S)},icon:h({...p[t],submission:t},p.SOI),position:[p[t].lat,p[t].lon]},"snp_related_marker_"+e)))]})})})),T=t=>{let{SNPMapDataset:e,openTable:n,mapRef:i}=t;const s=(0,L.wA)(),a=(0,o.ko)(),r=new ResizeObserver((()=>{a&&i.current&&a.invalidateSize()})),h=new(l().Control)({position:"topright"});h.onAdd=function(t){const e=l().DomUtil.create("div","leaflet-control leaflet-bar");return e.setAttribute("id","btn__show-table"),e.onclick=function(){s((0,_.SE)())},n?e.insertAdjacentHTML("afterbegin",'<a class="snp-table-toggle">Hide Table</a>'):e.insertAdjacentHTML("afterbegin",'<a class="snp-table-toggle">Show Table</a>'),e};const u=new(l().control)({position:"topright"});u.onAdd=function(t){let e=l().DomUtil.create("div","leaflet-control leaflet-bar");return e.style.width="150px",e.style.background="white",e.insertAdjacentHTML("afterbegin",`\n    <div style="padding-top:5px;">\n        <span class="fs-6" style="padding-left:6px;"><strong>Legend</strong></span>\n        <span style="display: flex; align-items: center; padding-bottom: 5px;">\n          <img src=${p} class="legend-marker-img">\n          <span class="legend-marker-title">Sample</span>\n        </span>\n        <span style="display: flex; align-items: center; padding-bottom: 5px;padding-left: 8px;">\n        <img src=${d} width="25" height="25">\n          <span class="legend-marker-title">SNP Relatedness</span>\n        </span>\n        <span style="display: flex; align-items: center;">\n        <img src=${y.A} class="legend-marker-img">\n        <span class="legend-marker-title">Geographic Group</span>\n        </span>\n      </div>\n    `),e},(0,c.useEffect)((()=>{const t=Object.keys(e).filter((t=>{var n,i;return(null===(n=e[t])||void 0===n?void 0:n.lat)&&(null===(i=e[t])||void 0===i?void 0:i.lon)})).map((t=>[e[t].lat,e[t].lon]));return(null===t||void 0===t?void 0:t.length)>0&&(u.addTo(a),a.fitBounds(l().latLngBounds(t).pad(.1))),()=>{u.remove()}}),[e]),(0,c.useEffect)((()=>(h.addTo(a),()=>{h.remove()})),[n]),(0,c.useEffect)((()=>(i.current&&r.observe(i.current),()=>{r.disconnect()})),[])},C=x}}]);
//# sourceMappingURL=88.0fc118ba.chunk.js.map