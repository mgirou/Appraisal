// IN PROCESS, get to it later.  will eventually do all the downloads, etc.
    'use strict';
    // http:/www.dcad.org/viewPDFS.aspx?type=3&id=\\Dcadapms\webdata\FORMS\DATA PRODUCTS\DCAD2014_CURRENT.ZIP is where you go to get DCAD current 2014 download, be prepared for dialog
    //  http://nodejs.org/api/zlib.html shows how to unzip/read the file
    //var zlib = require('zlib');
   // var http = require('http');
    var fs = require('fs');
/*var request = require('request');

request('http://www.dcad.org/viewPDFS.aspx?type=3&id=\\Dcadapms\webdata\FORMS\DATA PRODUCTS\DCAD2014_CURRENT.ZIP', function (error, response, body) {
    console.log('received response');
    if(error) {
        console.log('error');
        console.log(error);
    }
    if (!error && response.statusCode == 200) {
        console.log('we are good to go');
        console.log(body) // Print the google web page.
    } else {
        console.log('status code ' + response.statusCode);
    }
})
var zlib = require('zlib').createUnzip();
var path = 'c:/users/mgirou/RTAData/Input/TX/Dallas/CountyData/DCAD2014_CURRENT/';
var inp = fs.createReadStream(path + 'DCAD2014_CURRENT.zip');
var out = fs.createWriteStream(path + 'testZlib');
inp.pipe(zlib).pipe(out);

//inp.pipe(gzip).pipe(out); */
/*
    this.parcelCodes = require('./lib/ParcelCodes/parcelCodes');
    this.parcelMisc = require('./lib/ParcelMisc/parcelMisc');
    var fs = require('fs'),
        //shapeFileReq =  require('./lib/ShapeFile/shapeFile'),
        gridDir = 'C:/Users/mgirou/RTAData/Output/TX/' + COUNTY + '/Parcels/',
        HashMap = require('.lib/HashMap/hashmap.js'),
        i;
    //var COUNTY = 'DALLAS';     now just 'name'
    this.gisStack = new HashMap();
    this.assessorStack = new HashMap();
    this.metaData = JSON.parse(fs.readFileSync('C:/Users/mgirou/RTAData/Output/TX/' + COUNTY + '/metadata.txt','utf8')),
    this.auditFd = fs.openSync('C:/Users/mgirou/RTAData/Audits/TX/' + COUNTY + '/audit.txt', 'w');
    this.shapeFileObject = new require('./lib/ShapeFile/shapeFile')('C:/Users/mgirou/RTAData/Input/TX/' + COUNTY + '/countyData/PARCEL/PARCEL');
    this.supplementalFileName =  'C:/Users/mgirou/RTAData/Input/TX/' + COUNTY + '/supplement.json';
    this.noGeoDataFilename = 'C:/Users/mgirou/RTAData/Audits/TX/' + COUNTY + '/nogeodata.json';
    this.gridFilenames = [];
    for(i = 0; i < (this.metaData.latGridSize * this.metaData.lngGridSize); i++) {
        this.gridFilenames.push(gridDir + i + '.json');
    }
    this.uniqueId = 0; //how many unique properties are there
    this.noGeoDataProperties = []; //objects representing properties that do not have lat/lng values
    this.noHouseCount = 0; //how many properties have houses worth less than $ 1,000
}

County.prototype = {
    constructor: County,
    open: function open() {
       'use strict';
        var self = this,
            fd,
            fs = require('fs');
        fs.writeSync(self.auditFd, new Date().toString() + '\n');
        self.gridFilenames.forEach( function(gridFilename) {
            fd= fs.openSync(gridFilename, 'w');
            fs.writeSync(fd,'[');
            fs.closeSync(fd);
        });
    },
    getLatLngs: function () {
        'use strict';
        var self = this;
        // process the Shapefile data
        var events = require('events');
        var eventEmitter = new events.EventEmitter();
        eventEmitter.on('ready', function readLoop() {
            shapeFileObject.readNext(function mainReadCallback(err, shapeData) {
                if (shapeData !== null){  // data has already been sanitized by our previous programs
                    //SEE NEXT.  IS IT ALWAYS Acct OR COULD IT BE COUNTY-SPECIFIC??????
                    self.gisStack.set(shapeData.attributes.Acct, {lat: shapeData.centroid[0], lng: shapeData.centroid[1]});
                    eventEmitter.emit('ready');  // maybe more data
                } else {
                    eventEmitter.emit('end');
                }
            });
        });
        //now, we read in the supplemental list of parcels and lat/lngs
        if (self.fs.existsSync(supplementalFileName)) {
            JSON.parse(self.fs.readFileSync(supplementalFileName, 'utf8')).forEach(function(row) {
                self.gisStack.set(shapeData.attributes.Acct, {lat: shapeData.row[1], lng: shapeData.row[2]});
            });
        }
        eventEmitter.on('end', finishIt);
        self.shapeFileObject.open(function shapeOpenCallback(err) {
            if (err) {
                self.fs.writeSync(auditFd, "error from mainOpenCallback " + err + '\n');
            } else {
                eventEmitter.emit('ready');
            }
        });


    },
    process: function process() {
        //switch based on county name/identifier, returns array of objects, each containing the 32 data elements
        'use strict';
        var self = this;
    },
    close: function close() {
        'use strict';
        var self = this,
            fs = require('fs'),
            fd;
        self.gridFilenames.forEach( function(gridFilename) {
            fd= fs.openSync(gridFilename, 'a');
            fs.writeSync(fd,']');
            fs.closeSync(fd);
        });
        fs.writeFileSync(noGeoDataFilename, JSON.stringify(self.noGeoDataProperties));
       // fs.writeFileSync('C:/Users/mgirou/RTAData/Audits/TX/' + COUNTY + '/allHouses.json', JSON.stringify(keepersJSON));
        fs.writeSync(self.auditFd, new Date().toString() + '\n');
        fs.writeSync(self.auditFd, self.uniqueId + ' written, ' + self.noGeoDataProperties.length + ' no geodata, ' + self.noHouseCount + ' no house\n');
        fs.closeSync(self.auditFd);
    }
}
function isHomesteadable(s) {
    if ((s.indexOf(' LLC') >= 0) || (s.indexOf(' INC') >= 0) || (s.indexOf(' HOLDING CO') >= 0) || (s.indexOf(' HOLDING CO') >= 0)) return false;
    if ((s.indexOf(' EST') >= 0) || (s.indexOf(' ESTATE') >= 0)) return false;
    return true;
}
function computeTaxes(county, zip, parcelValue) {
    var city,
        countyRate,
        cityRate,
        schoolRate,
        schoolPct,
        totalTaxes = 0,
        homesteadWorth = 0;
    switch (county) {
        case 'TXDallas':
            city = 'Dallas'; //default assumption
            countyRate = 0.006528; //county rate
            cityRate = 0.00797;
            schoolRate = 0.01282085;
            schoolPct = 0.10;
            if (zip === '75205') { city = 'HP'; cityRate = 0.0022; schoolRate = 0.011267; schoolPct = 0.20;}
            if (zip === '75225'){ city = 'UP'; cityRate = 0.0027432; schoolRate = 0.011267; schoolPct = 0.20;}
            if (zip ==- '75080'){ city = 'Richardson'; cityRate = 0.0063516; schoolRate = 0.0134005; schoolPct = 0.10;}
            totalTaxes = (city === 'Richardson') ? ((countyRate * 0.80) + (cityRate * 0.90)) * parcelValue : (cityRate + countyRate) * 0.80 * parcelValue;  //taxbill, non-school
            totalTaxes += (-15000 + (1.0 - schoolPct) * parcelValue) * schoolRate; //school portion of tax bill
            homesteadWorth =  (city === 'Richardson') ? countyRate * 0.20 * parcelValue : (cityRate + countyRate) * 0.20 * parcelValue;
            homesteadWorth +=   (15000 + schoolPct * parcelValue) * schoolRate;
            break;
        case 'TXCollin':
            break;
        case 'TXDenton':
            break;
        case 'TXTarrant':
            break;
        default:
    }
    return {totalTaxes: totalTaxes, homesteadWorth: homesteadWorth};
}
module.exports = County;   */