const csv = require('csv-parser')
const fs = require('fs')
crimeDataStore = []
weatherDataStore = []
crimeDataReduced = []
weatherDataReduced = []
let crimeData = process.argv[2]
let weatherData = process.argv[3]
let crimeDataReadStream = fs.createReadStream(crimeData)
let weatherDataReadStream = fs.createReadStream(weatherData)
crimeDataReadStream
    .pipe(csv())
    .on('data', (data) => crimeDataStore.push(data))
    .on('end', () => {
        let totalCrimes = 0;
        let autoCrimes = 0;
        let violentCrimes = 0;
        let otherCrimes = 0;
            for (let i = 0; i < crimeDataStore.length; i++) {
                let compare = crimeDataStore[i]["UC2_Literal"];
                let crimeDate = new Date(crimeDataStore[i]['occur_date']);
                let comma = ',';
                while (crimeDate)
                if (crimeDate.length >= 9) {
                    totalCrimes++;
                    if (compare === "LARCENY-FROM VEHICLE" || compare === "AUTO THEFT") {
                        autoCrimes++;
                    }
                    if (compare === "AGG ASSAULT" || compare === "HOMICIDE") {
                        violentCrimes++;
                    }
                    if (compare !== "LARCENY-FROM VEHICLE" && compare !== "AUTO THEFT" && compare !== "AGG ASSAULT" && compare !== "HOMICIDE") {
                        otherCrimes++;
                    }
                }
                    let crimeDataFormatted = "date:" + crimeDate + comma + "UC2_Literal:" + compare;
                    crimeDataReduced.push(crimeDataFormatted);
                    console.log(crimeDataReduced)
            }
           // console.log(crimeDataReduced);
});
weatherDataReadStream
    .pipe(csv())
    .on('data', (data) => weatherDataStore.push(data))
    .on('end', () => {
            for(let i = 0; i < weatherDataStore.length; i++) {
                let rainyDay = false;
                let hotDay = false;
                let coldDay = false;
                let niceDay = false;
                //let time = weatherDataStore[i]['time']
                let temp = weatherDataStore[i]['temperature_2m_max']
                let prec = weatherDataStore[i]['precipitation_sum']
                let weatherDate = new Date(weatherDataStore[i]['time']);
                let comma = ','
                while(weatherDataStore)
                if (prec >0.1) {
                    rainyDay = true;
                }
                if(temp >= 85) {
                    hotDay = true;
                }
                if(temp <= 40) {
                    coldDay = true;
                }
                if(rainyDay && hotDay && coldDay === false) {
                    niceDay = true;
                }
                let formattedWeatherData = "date:" + weatherDate + comma +
                    "rainyDay:" + rainyDay + comma +
                    "hotDay:" + hotDay + comma +
                    "coldDay:" + coldDay + comma +
                    "niceDay" + niceDay;
                    weatherDataReduced.push(formattedWeatherData);
                    console.log(weatherDataReduced)
            }
    });