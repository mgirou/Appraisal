function decodeData (county, s) {
    var mo, day, year, i, j;
    if (!(s.length > 5)) return {mo: 0, day: 0, year: 0};
    switch (county) {
        case 'Collin/Parcels/':
            mo = parseInt(s);
            j = s.slice(s.indexOf('/') + 1);
            day = parseInt(j);
            j = j.slice(j.indexOf('/') + 1);
            year = parseInt(j);
            break;
        case 'Dallas/Parcels/':
            mo = parseInt(s);
            j = s.slice(s.indexOf('/') + 1);
            day = parseInt(j);
            j = j.slice(j.indexOf('/') + 1);
            year = parseInt(j);
            break;
        case 'Denton/Parcels/':
            mo = parseInt(s.slice(0,2));
            day = parseInt(s.slice(2,4));
            year = parseInt(s.slice(4,8));
            break;
        case 'Tarrant/Parcels/':
            mo = parseInt(s);
            j = s.slice(s.indexOf('/') + 1);
            day = parseInt(j);
            j = j.slice(j.indexOf('/') + 1);
            year = parseInt(j);
            break;
        default:
            console.log(county + ': invalid county in decodeData');
    }
    return ({mo: mo, day: day, year: year});
}
var fs = require('fs'),
    path = 'C:/Users/mgirou/RTADATA/Output/TX/',
    counties = ['Collin/Parcels/', 'Dallas/Parcels/', 'Denton/Parcels/', 'Tarrant/Parcels/'],
    i,
    j,
    input,
    countyCount,
    countyDis,
    countyDefEligible,
    countyOld,
    countyDef,
    newDate,
    countyHomesteaded,
    countyHomesteadEligible,
    hstead, old, dis, vet, homesteadable, def,
    areaCount = 0, areaDef = 0, areaDefEligible = 0, areaDis = 0, areaOld = 0, areaHomesteaded = 0, areaHomesteadEligible = 0,
    month = [],
    year = [],
    subsetTotal = 0,
    tempAmount = 0,
    parcels;

counties.forEach( function(county, jj) {
    month[jj] = [];
    year[jj] = [];
    for (j = 0; j < 13; j++) {
        month[jj][j] = 0;
    }
    for (j = 0; j < 32; j++) {
        year[jj][j] = 0;
    }
    countyCount = 0;
    countyDis = 0;
    countyHomesteaded = 0;
    countyDef = 0;
    countyDefEligible = 0;
    countyOld = 0;
    countyHomesteadEligible = 0;
    for (i = 0; i < 2500; i++) {
        input = fs.readFileSync(path + county + i +  '.json', 'utf8');
        JSON.parse(input).forEach(function(parcel) {
            countyCount++;
            hstead = parcel[27];
            old = parcel[28];
            dis = parcel[29];
            vet = parcel[30];
            homesteadable = parcel[31];
            def = parcel[32];
            if (homesteadable === 1) countyHomesteadEligible++;
            if (hstead === 1) countyHomesteaded++;
            if((dis === 1) || (vet === 1))countyDis++;
            if ((old == 1) || (dis === 1) || (vet === 1)) countyDefEligible++;
            if ((def !==1) && ((old == 1) || dis === 1) || (vet === 1)) countyDef++;
            if (old === 1) countyOld++;
            newDate = decodeData(county, parcel[26]);
            j = Math.min(31,(newDate.year == 0) ? 0 : 2015 - newDate.year);
            if ((newDate.year === 1900) || (newDate.year === 0)) {
                month[jj][0]++;
                year[jj][0]++;
            }  else {
                month[jj][newDate.mo]++;
                year[jj][j]++;
                tempAmount = parcel[8] + parcel[9] + parcel[10];
                if ((j >= 5) &&(tempAmount >= 300000) && (tempAmount <= 1500000)) subsetTotal++;
            }
        });
    }
    console.log(county + ' ' + countyCount + ' dis: ' + countyDis + ' defEligible: ' + countyDefEligible + ' def: ' + countyDef +
    ' old: ' + countyOld + ' hsteadeligible: ' + countyHomesteadEligible + ' hsteaded: ' + countyHomesteaded);
    areaCount += countyCount;
    areaDis += countyDis;
    areaOld += countyOld
    areaDefEligible += countyDefEligible;
    areaDef += countyDef;
    areaHomesteaded += countyHomesteaded;
    areaHomesteadEligible += countyHomesteadEligible;
});
console.log('Total ' + areaCount + ' dis: ' + areaDis + ' defEligible: ' + areaDefEligible + ' def: ' + areaDef +
    ' old: ' + areaOld + ' hsteadEligible: ' + areaHomesteadEligible + ' hsteaded: ' + areaHomesteaded);
for (j = 0; j < 13; j ++) {
    console.log(j + ' ' + month[0][j] + ' ' + month[1][j] + ' ' + month[2][j] + ' ' + month[3][j] + ' ' + (month[0][j] + month[1][j] + month[2][j] + month[3][j]));
}
for (j = 0; j < 32; j ++) {
    console.log((2015 - j) + ' ' + year[0][j] + ' ' + year[1][j] + ' ' + year[2][j] + ' ' + year[3][j] + ' ' + (year[0][j] +year[1][j] + year[2][j] + year[3][j]));
}
console.log(subsetTotal + ' houses worth 300k-1000k and owner occupied for 10+ years');
