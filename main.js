//http://api.aladhan.com/v1/timingsByCity?country=eg&city=Faiyum

let cities = [
  {
  arabicName : "الفيوم",
  name : "Faiyum"
  },
  {
  arabicName : "القاهرة",
  name : "Cairo"
  },
  {
  arabicName : "بني سويف",
  name : "Beni Suef"
  },
  {
  arabicName : "الاسكندرية",
  name : "Alexandria"
  }
]

for(city of cities) {
  let content = `
  <option>${city.arabicName}</option>
  `
  document.getElementById("btn-selected").innerHTML += content
}
document.getElementById("btn-selected").addEventListener("change" , function(){
  document.getElementById("city").innerHTML = this.value
  let cityName = ""
  for(let city of cities){
    if(city.arabicName == this.value){
      cityName = city.name
    }
  }
  getPrayersTimingsOfCity(cityName)
})

function getPrayersTimingsOfCity(cityName){
  let params = {
    country : "eg",
    city : cityName
  }

  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
  .then(function (response) {
    const timings = response.data.data.timings
    fillTimeForPrayer("Fajr-time",timings.Fajr)
    fillTimeForPrayer("Sunrise-time",timings.Sunrise)
    fillTimeForPrayer("Dhuhr-time",timings.Dhuhr)
    fillTimeForPrayer("Asr-time",timings.Asr)
    fillTimeForPrayer("Maghrib-time",timings.Maghrib)
    fillTimeForPrayer("Isha-time",timings.Isha)
    let dateDAY_M = response.data.data.date.readable;
    let dateDAY_AR = response.data.data.date.hijri.weekday.ar;
  
  
    document.getElementById("day-time").innerHTML =  dateDAY_AR + " " + dateDAY_M
    console.log(response.data.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  
}
getPrayersTimingsOfCity("Faiyum")

function fillTimeForPrayer(id,time){
  document.getElementById(id).innerHTML = time
}
