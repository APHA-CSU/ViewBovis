import{R as j,u as _,r as m,j as e,a as C,t as $}from"./index-CAXKRelq.js";import{M as O,T,B as I,R as A,H as z,a as L,_ as B,b as w,m as R}from"./Basemaps-q393aNKV.js";import{L as d,u as F}from"./hooks-D13TNDXo.js";const y="data:image/svg+xml,%3csvg%20width='103'%20height='126'%20viewBox='0%200%20103%20126'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M83.6875%2063C83.6875%2091.556%2056.013%20110.037%2051.9863%20112.575C51.6771%20112.77%2051.3229%20112.77%2051.0137%20112.575C46.987%20110.037%2019.3125%2091.556%2019.3125%2063C19.3125%2039.375%2034.9084%2023.625%2051.5%2023.625C68.6667%2023.625%2083.6875%2039.375%2083.6875%2063Z'%20fill='%23C95300'/%3e%3cpath%20d='M68.1667%2063C68.1667%2074.4208%2060.6152%2083.5%2051.5%2083.5C42.3847%2083.5%2034.8333%2074.4208%2034.8333%2063C34.8333%2051.5792%2042.3847%2042.5%2051.5%2042.5C60.6152%2042.5%2068.1667%2051.5792%2068.1667%2063Z'%20fill='white'%20stroke='white'/%3e%3c/svg%3e",k="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='%23575757'%20class='bi%20bi-geo-alt-fill'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M8%2016s6-5.686%206-10A6%206%200%200%200%202%206c0%204.314%206%2010%206%2010m0-7a3%203'/%3e%3c/svg%3e",H=r=>`
  <div style="font-size: medium;
  color: white;
  font-weight: 500;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
"><img src="${k}" alt="${r}" width="30" height="30"/>
<a style="position: absolute;">${r}</a><div/>`,v=(r,c)=>r.submission===c?new d.Icon({className:`number-marker marker-SOI marker-${r.submission}`,iconUrl:y,iconSize:[40,40],iconAnchor:[20,35]}):new d.DivIcon({className:`number-marker-related marker-${r.submission}`,html:H(r.snp_distance),styles:{border:"none",background:"transparent",display:"flex"},iconSize:[40,40],iconAnchor:[20,28]}),Z=j.memo(({checkedLayers:r,useCountyandHotspotLayers:c,setOpenSideBar:g,openSideBar:f,SNPMapDataset:n,RiskLayers:b,CountyLayers:p,HotspotLayers:u})=>{const l=_(t=>t.counter.openSNPTable),s=m.useRef(null),h=t=>new d.DivIcon({html:`<span class="cluster-icon">${t.getChildCount()}</span>`,className:"cluster-icon",iconSize:[30,30]}),a=function(t,i){return`
      <div id="popup_header_${t.animal_id}" class="fs-5 fw-bold">${t.animal_id}</div><br>
        <div id="popTabContent">     
          <table class="table table-striped">
            <tbody>
              <tr>
                <td><strong>Submission:</strong></td>
                <td>${i}</td> 
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>${t.dob}</td>
              </tr>
              <tr>
                <td><strong>Slaughter Date:</strong></td>
                <td>${t.slaughter_date}</td>
              </tr>
              <tr>
                <td><strong>Miles:</strong></td>
                <td>${parseFloat(t.distance).toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>SNP Distance:</strong></td>
                <td>${t.snp_distance}</td>
              </tr>
              <tr>
                <td><strong>Precise Location:</strong></td>
                <td>${t.cph}</td> 
              </tr>
              <tr>
                <td><strong>OS Map Reference:</strong></td>
                <td>${t.os_map_ref}</td>
              </tr>
              <tr>
                <td><strong>Species:</strong></td>
                <td>${t.species}</td> 
              </tr>
              <tr>
                <td><strong>Animal Type:</strong></td>
                <td>${t.animal_type}</td> 
              </tr>
              <tr>
                <td><strong>Sex:</strong></td>
                <td>${t.sex==="F"?"Female":t.sex==="M"?"Male":"Unknown"}
                </td>
              </tr> 
              <tr>
                <td><strong>Disclosing Test Type:</strong></td>
                <td>${t.disclosing_test}</td>
              </tr> 
              <tr>
                <td><strong>Import Country:</strong></td>
                <td>${t.import_country==null?"British":`${t.import_country}`}</td>
              </tr> 
            </tbody>
          </table>
        </div>
      </div>        
      `},x={maxWidth:400,className:"relatedPopupOptions",autoClose:!1,closeOnClick:!1,maxHeight:300};return e.jsx("div",{ref:s,children:e.jsxs(O,{center:[53.3781,-1],zoom:6,zoomAnimation:!0,zoomAnimationThreshold:20,children:[e.jsx(T,{attribution:`© <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors`,url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.jsx(I,{}),e.jsx(A,{}),e.jsx(z,{setOpenSideBar:g,openSideBar:f,type:"snp_map"}),e.jsx(L,{}),e.jsxs(m.Suspense,{fallback:e.jsx(e.Fragment,{}),children:[e.jsx(u,{isChecked:c.hotspotLayers}),e.jsx(p,{isChecked:c.countyLayers}),Object.keys(r).length>0&&e.jsx(b,{checkedLayers:r})]}),e.jsx(E,{SNPMapDataset:n,openTable:l,mapRef:s}),!l&&e.jsx(B,{chunkedLoading:!0,iconCreateFunction:h,children:Object.keys(n).filter(t=>{var i,o;return t!=="SOI"&&t!==n.SOI&&((i=n[t])==null?void 0:i.lat)&&((o=n[t])==null?void 0:o.lon)}).map((t,i)=>e.jsx(w,{ref:o=>{o==null||o.bindPopup(a({...n[t]},t),x)},icon:v({...n[t],submission:t},n.SOI),position:[n[t].lat,n[t].lon]},"snp_related_marker_"+i))}),l&&e.jsx(e.Fragment,{children:Object.keys(n).filter(t=>{var i,o;return t!=="SOI"&&t!==n.SOI&&((i=n[t])==null?void 0:i.lat)&&((o=n[t])==null?void 0:o.lon)}).map((t,i)=>e.jsx(w,{ref:o=>{o==null||o.bindPopup(a({...n[t]},t),x)},icon:v({...n[t],submission:t},n.SOI),position:[n[t].lat,n[t].lon]},"snp_related_marker_"+i))}),Object.keys(n).filter(t=>t===n.SOI).map((t,i)=>e.jsx(w,{ref:o=>{o==null||o.bindPopup(a({...n[t]},t),x)},icon:v({...n[t],submission:t},n.SOI),position:[n[t].lat,n[t].lon]},"snp_related_marker_"+i))]})})}),E=({SNPMapDataset:r,openTable:c,mapRef:g})=>{const f=C(),n=F(),b=new ResizeObserver(()=>{n&&g.current&&n.invalidateSize()}),p=new d.Control({position:"topright"});p.onAdd=function(l){const s=d.DomUtil.create("div","leaflet-control leaflet-bar");return s.setAttribute("id","btn__show-table"),s.onclick=function(){f($())},c?s.insertAdjacentHTML("afterbegin",'<a class="snp-table-toggle">Hide Table</a>'):s.insertAdjacentHTML("afterbegin",'<a class="snp-table-toggle">Show Table</a>'),s};const u=new d.control({position:"topright"});u.onAdd=function(l){let s=d.DomUtil.create("div","leaflet-control leaflet-bar");return s.style.width="150px",s.style.background="white",s.insertAdjacentHTML("afterbegin",`
    <div style="padding-top:5px;">
        <span class="fs-6" style="padding-left:6px;"><strong>Legend</strong></span>
        <span style="display: flex; align-items: center; padding-bottom: 5px;">
          <img src=${y} class="legend-marker-img">
          <span class="legend-marker-title">Sample</span>
        </span>
        <span style="display: flex; align-items: center; padding-bottom: 5px;padding-left: 8px;">
        <img src=${k} width="25" height="25">
          <span class="legend-marker-title">SNP Relatedness</span>
        </span>
        <span style="display: flex; align-items: center;">
        <img src=${R} class="legend-marker-img">
        <span class="legend-marker-title">Geographic Group</span>
        </span>
      </div>
    `),s},m.useEffect(()=>{const l=Object.keys(r).filter(s=>{var h,a;return((h=r[s])==null?void 0:h.lat)&&((a=r[s])==null?void 0:a.lon)}).map(s=>[r[s].lat,r[s].lon]);return(l==null?void 0:l.length)>0&&(u.addTo(n),n.fitBounds(d.latLngBounds(l).pad(.1))),()=>{u.remove()}},[r]),m.useEffect(()=>(p.addTo(n),()=>{p.remove()}),[c]),m.useEffect(()=>(g.current&&b.observe(g.current),()=>{b.disconnect()}),[])};export{Z as default};
