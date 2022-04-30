const urlBase =
  "https://api.waqi.info/map/bounds/?token=e95c2b4b9e0a3380ec347e9d0def1047f7b2ebae&latlng=-90,-180,90,180";


function getAPI(urlBase) {
  const url = urlBase; 
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (my_json) {
      console.log(my_json);
      my_json.data.forEach(data => {
        if (data.aqi<=50){
        count1(); //se référer au commentaire de la fonction count1()
        L.marker([data.lat, data.lon]).addTo(cluster_1)
        .bindPopup("Air quality : " + data.aqi + "<br>" + "Location : " + data.station.name + "<br>"+ "Time : " + data.station.time)
      }
      if ((data.aqi>=51) && (data.aqi<=100)){
        count2();
        L.marker([data.lat, data.lon]).addTo(cluster_2)
        .bindPopup("Air quality : " + data.aqi + "<br>" + "Location : " + data.station.name + "<br>"+ "Time : " + data.station.time)
      }
      if ((data.aqi>=101) && (data.aqi<=150)){
        count3();
        L.marker([data.lat, data.lon]).addTo(cluster_3)
        .bindPopup("Air quality : " + data.aqi + "<br>" + "Location : " + data.station.name + "<br>"+ "Time : " + data.station.time)
      }
      if ((data.aqi>=151) && (data.aqi<=200)){
        count4();
        L.marker([data.lat, data.lon]).addTo(cluster_4)
        .bindPopup("Air quality : " + data.aqi + "<br>" + "Location : " + data.station.name + "<br>"+ "Time : " + data.station.time)
      }
      if ((data.aqi>=201) && (data.aqi<=300)){
        count5();
        L.marker([data.lat, data.lon]).addTo(cluster_5)
        .bindPopup("Air quality : " + data.aqi + "<br>" + "Location : " + data.station.name + "<br>"+ "Time : " + data.station.time)
      }
      if (data.aqi>300){
        count6();
        L.marker([data.lat, data.lon]).addTo(cluster_6)
        .bindPopup("Air quality : " + data.aqi + "<br>" + "Location : " + data.station.name + "<br>"+ "Time : " + data.station.time)
      }
      });
    });
}
d3.csv("MLW_DATA.csv").then(function(data){
  console.log("Données pollution marine :");
  console.log(data);
  data.forEach(data => {
    moy_lat_1=parseFloat(data.lat_y1);
    moy_lat_2=parseFloat(data.lat_y2);
    moy_lat=(moy_lat_1+moy_lat_2)/2;
    moy_lon_1=parseFloat(data.lon_x1);
    moy_lon_2=parseFloat(data.lon_x2);
    moy_lon=(moy_lon_1+moy_lon_2)/2;
    const marker = L.marker([moy_lat, moy_lon]); // prendre la moyenne de la latitude et de la longitude
    if (data.BeachType =="Sandy"){
      marker.addTo(cluster2)
      .bindPopup("Location : " + data.BeachName + "<br>" + "Community : " + data.CommunityName + "<br>"+ "Date : " + data.EventDate);
    }
    if (data.BeachType =="Pebbels"){
      marker.addTo(cluster2_2)
    .bindPopup("Location : " + data.BeachName + "<br>" + "Community : " + data.CommunityName + "<br>"+ "Date : " + data.EventDate);
    }
    if (data.BeachType =="Other (mixed)"){
      marker.addTo(cluster2_3)
    .bindPopup("Location : " + data.BeachName + "<br>" + "Community : " + data.CommunityName + "<br>"+ "Date : " + data.EventDate);
    }
    
    else{
      marker.addTo(cluster2_4)
    .bindPopup("Location : " + data.BeachName + "<br>" + "Community : " + data.CommunityName + "<br>"+ "Date : " + data.EventDate);
    } 
  });
  
})

getAPI(urlBase);


var map = L.map('map', {
  minZoom: 3,
  maxZoom: 18
  // réglages du zoom pour empêcher l'utilisateur de trop rétrécir la map
}).setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true //empêche la répétition de la map
}).addTo(map);


// groupe de clusters qui concernent les données de l'air
let cluster_1 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster', 
        iconSize: null
      });
  }
});
let cluster_2 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster_2', 
        iconSize: null
      });
  }
});
let cluster_3 = L.markerClusterGroup(
  {
    iconCreateFunction: function(cluster) {
        return L.divIcon({ 
          html: cluster.getChildCount(), 
          className: 'mycluster_3', 
          iconSize: null
        });
    }
  }
);
let cluster_4 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster_4', 
        iconSize: null
      });
  }
});
let cluster_5 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster_5', 
        iconSize: null
      });
  }
});
let cluster_6 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster_6', 
        iconSize: null
      });
  }
});

// des checks liés au tri de ces clusters en fonction des options sélectionnées sur le site
let check_1 = true;
let check_2 = true;
let check_3 = true;
let check_4 = true;
let check_5 = true;
let check_6 = true;

//groupe de clusters qui concernent les données de la mer
let cluster2 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster2', 
        iconSize: null
      });
  }
});
let cluster2_2 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster2_2', 
        iconSize: null
      });
  }
});
let cluster2_3 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster2_3', 
        iconSize: null
      });
  }
});
let cluster2_4 = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster2_4', 
        iconSize: null
      });
  }
});

//des checks liés au tri de ces clusters en fonction des options sélectionnées sur le site (type de plage)
let check2_1 = true;
let check2_2 = true;
let check2_3 = true;
let check2_4 = true;

//des checks qui déterminent si les données air et mer sont affichées ou non
let check_air = false;
let check_mer = false;

// compteurs de données pour le graphique (finalement, pas utilisés car code non fonctionnel)
let compteur_1= 0;
let compteur_2= 0;
let compteur_3= 0;
let compteur_4= 0;
let compteur_5= 0;
let compteur_6= 0;

// fonctions mettant à jour les compteurs pour totaliser le nombre de données sur la pollution de l'air en fonction des différents seuils de celui-ci
function count1(){
  compteur_1++;
  console.log(compteur_1);
}
function count2(){
  compteur_2++;
  console.log(compteur_2);
}
function count3(){
  compteur_3++;
  
  console.log(compteur_3);
  
}
function count4(){
  
  compteur_4++;
  console.log(compteur_4);
}
function count5(){
  compteur_5++;
  console.log(compteur_5);
}
function count6(){
  compteur_6++;
  console.log(compteur_6);
}

// groupe de fonctions destinées à faire apparaître ou disparaître les sous catégories de données concernant l'air
function checker_1(){
  if(check_1==true){
    check_1=false;
    map.removeLayer(cluster_1);
  }
  else{
    check_1=true;
    if(check_air == true){
      cluster_1.addTo(map);
    }
  }
}


function checker_2(){
  if(check_2==true){
    check_2=false;
    map.removeLayer(cluster_2);
  }
  else{
    check_2=true;
    if(check_air == true){
      cluster_2.addTo(map);
    }
  }
}


function checker_3(){
  if(check_3==true){
    check_3=false;
    map.removeLayer(cluster_3);
  }
  else{
    check_3=true;
    if(check_air == true){
      cluster_3.addTo(map);
    }
  }
}


function checker_4(){
  if(check_4==true){
    check_4=false;
    map.removeLayer(cluster_4);
  }
  else{
    check_4=true;
    if(check_air == true){
      cluster_4.addTo(map);
    }
  }
}


function checker_5(){
  if(check_5==true){
    check_5=false;
    map.removeLayer(cluster_5);
  }
  else{
    check_5=true;
    if(check_air == true){
      cluster_5.addTo(map);
    }
  }
}


function checker_6(){
  if(check_6==true){
    check_6=false;
    map.removeLayer(cluster_6);
  }
  else{
    check_6=true;
    if(check_air == true){
      cluster_6.addTo(map);
    }
  }
}

// groupe de fonctions destinées à faire apparaître ou disparaître les sous catégories de données concernant la mer
function checker2_1(){
  if(check2_1==true){
    check2_1=false;
    map.removeLayer(cluster2);
  }
  else{
    check2_1=true;
    if(check_mer == true){
      cluster2.addTo(map);
    }
  }
}

function checker2_2(){
  if(check2_2==true){
    check2_2=false;
    map.removeLayer(cluster2_2);
  }
  else{
    check2_2=true;
    if(check_mer == true){
      cluster2_2.addTo(map);
    }
  }
}

function checker2_3(){
  if(check2_3==true){
    check2_3=false;
    map.removeLayer(cluster2_3);
  }
  else{
    check2_3=true;
    if(check_mer == true){
      cluster2_3.addTo(map);
    }
  }
}


function checker2_4(){
  if(check2_4==true){
    check2_4=false;
    map.removeLayer(cluster2_4);
  }
  else{
    check2_4=true;
    if(check_mer == true){
      cluster2_4.addTo(map);
    }
  }
}




function Thanos(){ //enlève les données sur la pollution de la mer et ajoute celles de l'air
  map.removeLayer(cluster2);
  map.removeLayer(cluster2_2);
  map.removeLayer(cluster2_3);
  map.removeLayer(cluster2_4);
  /*if(check_air==true){
    ChartHide();
  }*/
  check_air = true;
  check_mer = false;

if(check_1==true){
  cluster_1.addTo(map);
}
if(check_2==true){
  cluster_2.addTo(map);
}
if(check_3==true){
  cluster_3.addTo(map);
}
if(check_4==true){
  cluster_4.addTo(map);
}
if(check_5==true){
  cluster_5.addTo(map);
}
if(check_6==true){
  cluster_6.addTo(map);
}
chart();
}

function Thanos2(){ //enlève les données sur la pollution de l'air et ajoute celles de la mer
  check_air = false;
  /*ChartHide();*/
  check_mer = true;
  map.removeLayer(cluster_1);
  map.removeLayer(cluster_2);
  map.removeLayer(cluster_3);
  map.removeLayer(cluster_4);
  map.removeLayer(cluster_5);
  map.removeLayer(cluster_6);

  if(check2_1==true){
    cluster2.addTo(map);
  }
  if(check2_2==true){
    cluster2_2.addTo(map);
  }
  if(check2_3==true){
    cluster2_3.addTo(map);
  }
  if(check2_4==true){
    cluster2_4.addTo(map);
  }
}


function Reset(){ //ajoute les deux types de données
  /*if(check_air==true){
    ChartHide();
  }*/
  check_air = true;
  chart();
  check_mer = true;
  if(check_1==true){
    cluster_1.addTo(map);
  }
  if(check_2==true){
    cluster_2.addTo(map);
  }
  if(check_3==true){
    cluster_3.addTo(map);
  }
  if(check_4==true){
    cluster_4.addTo(map);
  }
  if(check_5==true){
    cluster_5.addTo(map);
  }
  if(check_6==true){
    cluster_6.addTo(map);
  }


  if(check2_1==true){
    cluster2.addTo(map);
  }
  if(check2_2==true){
    cluster2_2.addTo(map);
  }
  if(check2_3==true){
    cluster2_3.addTo(map);
  }
  if(check2_4==true){
    cluster2_4.addTo(map);
  }
}
function chart(){
  /*var div = document.createElement('div');
  div.setAttribute(chartContainer);
  document.body.appendChild(div);
  div.style.height="300px"; 
  div.style.width= "100%";*/
var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Air quality levels"
	},
	axisY: {
		title: "Number of areas counted"
	},
	data: [{        
		type: "column",  

		dataPoints: [      
			{ y: 444, label: "Good" },
			{ y: 262,  label: "Moderate" },
			{ y: 83,  label: "Unhealthy for sensitive groups" },
			{ y: 124,  label: "Unhealthy" },
			{ y: 34,  label: "Very unhealthy" },
			{ y: 24, label: "Hazardous" }
		]
	}]
});
chart.render();}

/* ces fonctions sont des vestiges de tentatives échouées. L'intention était de pouvoir alterner entre carte et graphique

function MapHide(){
  this.map.remove();
  chart();
}

les destructions de la carte et du graphique étaient fonctionnelles, mais par leur réapparition

function ChartHide(){
  document.getElementById('chartContainer').remove()
}
*/




    