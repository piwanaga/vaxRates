let vacDetails = [
    {"st": "Connecticut", "date": "07/13/2022", "vac": 3461972},
	{"st": "Connecticut", "date": "06/05/2022", "vac": 3435344},
	{"st": "Massachusetts", "date": "07/13/2022", "vac": 6906672},
	{"st": "New Hampshire", "date": "06/05/2022", "vac": null}, 
	{"st": "New Jersey", "date": "07/13/2022", "vac": 8137665},
	{"st": "New Jersey", "date": "05/08/2022", "vac": 8037635},
    {"st": "New Jersey", "date": "06/05/2022", "vac": 8082265},
	{"st": "New York", "date": "06/05/2022", "vac": 17643907},
	{"st": "Rhode Island", "date": "07/13/2022", "vac": 1065654},
	{"st": "Rhode Island", "date": "06/05/2022", "vac": 1055404},
];


// Population:
let census = [
    {"st": "Connecticut", "ppl": 3605944},
    {"st": "Massachusetts", "ppl": 7029917},
    {"st": "New Hampshire", "ppl": 1377529},
    {"st": "Rhode Island", "ppl": 1097379},
    {"st": "Vermont", "ppl": 643077},
];


// vaccination rate = vac / ppl:
// Example:
// Connecticut: rate = 3461972 / 3605944 = 96%
// Massachusetts: rate = 6906672 / 7029917 = 98.24%



// RETURN:
// let rates = [
// 	{"st": "Connecticut", "latest": "07/13/2022", "rate": 0.96},
// 	{"st": "Massachusetts", "latest": "07/13/2022", "rate": 0.9824},
// 	{"st": "New Jersey", "latest": null, "rate": null},
// ];

const convertDateStr = (str) => {
	return new Date(str).getTime(); // 07/25/2022-> 2838492920010102;  07/24/2022-> 2838492920000
}


const getRates = (vax, census) => {
let rates = []
let seen = new Set()

vax.sort((a, b) => convertDateStr(b.date) - convertDateStr(a.date))

for (let i = 0; i < vax.length; i ++) {
	let state = vax[i].st
  if (seen.has(state)) {
  	continue
  } 
  let output = {
  	st: state, latest: null, rate: null
  }
  
  let matchingState = census.filter((c) => c.st === state)
  
  if (matchingState.length) {
  	if (vax[i].vac !== null) {
    	output.latest = vax[i].date
      output.rate = vax[i].vac / matchingState[0].ppl
    }
  }
  seen.add(state)
  rates.push(output)
}

return rates
}
