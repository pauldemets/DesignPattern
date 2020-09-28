/**
 * 
 * Au moins une Facory -- OK
 * Au moins un Singletton
 * Au moins un Constructor -- OK
 * Au moins une Facade
 * Au moins un Observe
 * Au moins un décorateur
 * 
 */


const photoFile = function (params) {
    this.name = 'photo';
    const { filename, size, type, pixelNumber } = params;
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.pixelNumber = pixelNumber;
};

const videoFile = function (params) {
    this.name = 'video';
    const { filename, size, type, hd } = params;
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.hd = hd;
};

const songFile = function (params) {
    this.name = 'song';
    const { filename, size, type, converted } = params;
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.converted = converted;
};

const textFile = function (params) {
    this.name = 'text';
    const { filename, size, type, pixelNumber } = params;
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.encrypted = encrypted;
};


const NumericFileFactory = function () { };

NumericFileFactory.prototype.numericFileClass = Object;
NumericFileFactory.prototype.createFile = function (type, params = {}) {
    switch (type) {
        case photoFile.name: this.numericFileClass = photoFile;
            break;
        case videoFile.name: this.numericFileClass = videoFile;
            break;
        case songFile.name: this.numericFileClass = songFile;
            break;
        case textFile.name: this.numericFileClass = textFile;
            break;
    }
    return new this.numericFileClass(params);
};



const myNumericFileFactory = new NumericFileFactory();
const Photo = myNumericFileFactory.createFile('photo', { filename: 'testFile', size: '512MB', type: 'JPEG', pixelNumber: '567k' });
const Song = myNumericFileFactory.createFile('song', { filename: 'songTest', size: '1.02GB', type: 'MP3', converted: 'true' });
const Text = myNumericFileFactory.createFile('text', { filename: 'textFile', size: '1.02GB', type: 'MP3', encrypted: 'true' });
const Video = myNumericFileFactory.createFile('video', { filename: 'videoFile', size: '1.02GB', type: 'MP3', hd: 'false' });



const commands = {

    pwd: function () {
        console.log('Tu as fait un pwd');
    },
    exit: function () {
        console.log('Closing script...');
        process.exit();
    },
    photo: function() {
        console.log('Affichage de la photo :', Photo);
    }
};


process.stdin.setEncoding('utf-8');


process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        let input = chunk.trim();

        if(input in commands){
            commands[input]();
        }
        else{
            console.log('Sorry, unknown command...');
        }
    }
});