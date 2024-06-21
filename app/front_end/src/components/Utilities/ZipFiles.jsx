import JSZip from 'jszip'
import { useEffect, useState } from 'react'
import {combine, parseShp, parseDbf} from 'shpjs';

const FetchDataFiles = () => {
const [allRA,setAllRA] = useState()

const fetchZipfile = async(filename,setData) => {
let response = await fetch("/data/"+ filename)
let blob = await response.blob()
let zip =  await JSZip.loadAsync(blob)
let file = {}
await Promise.all( Object.keys(zip.files).map(async(filename) => {
    const data = await zip.files[filename].async('arraybuffer')
    file[filename] = data
}))
const rootFile = filename.replace(".zip","")
const shpBuffer = file[rootFile+".shp"]
const dbfBuffer = file[rootFile+".dbf"]
const prjBuffer = file[rootFile+".prj"]
console.log("files-------------->",shpBuffer,dbfBuffer)
const geojson = combine([parseShp(shpBuffer),parseDbf(dbfBuffer)]);
console.log("geojson",geojson)
setData(geojson)
}

useEffect(()=>{
const fetchDataFiles = async() => { 
    await fetchZipfile("RiskAreas.zip",setAllRA)
}
fetchDataFiles()
},[])
return {allRA:allRA}
}

export default FetchDataFiles