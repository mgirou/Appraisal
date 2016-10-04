var County = require('./lib/county/county.js'),
    countyNames = ['Collin', 'Dallas', 'Denton', 'Tarrant'];


    //countyName = 'Tarrant';
    countyName = process.argv[2];
if (countyNames.indexOf(countyName) < 0) {
    console.log(countyName + ' is not a known county; must be ' + JSON.stringify(countyNames));
    process.exit(0);
}
console.log('doing ' + countyName);
    county = new County(countyName);
    county.open();
//var records = county.process();
//process.exit();
    county.getLatLngs(function () {
        console.log(county.gisStackCount() + ' lat/lng records produced');
        var records = county.process();
        console.log('Process() produced ' + records.main + ' ' + records.pointers);
        county.close();
    });


