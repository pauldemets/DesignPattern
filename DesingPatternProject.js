/**
 * 
 * Au moins une Facory -- OK
 * Au moins un Singletton
 * Au moins un Constructor -- OK
 * Au moins une Facade
 * Au moins un Observe 
 * Au moins un décorateur OK
 * 
 */

const photoFile = function (params) {
    const { filename, size, type, pixelNumber } = params;
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.pixelNumber = pixelNumber;

    this.getDescription = function () {
        return `Fichier: ${this.filename}; Type : ${this.type};  Size: ${this.size}; Pixels number: ${this.pixelNumber}`
    };

};

const videoFile = function (params) {
    const { filename, size, type, hd } = params;
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.hd = hd;

    this.getDescription = function () {
        return `Fichier: ${this.filename}; Type: ${this.type}; Size: ${this.size}; Hd: ${this.hd}`
    }
};

const songFile = function (params) {
    const { filename, size, type, converted } = params;
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.converted = converted;

    this.getDescription = function () {
        return `Fichier ${this.filename} Type ${this.type} Size ${this.type} Converted ${this.converted}`;
    }
};

const textFile = function (params) {
    const { filename, size, type, encrypted } = params;
    this.filename = filename;
    this.size = size;
    this.type = type;
    this.encrypted = encrypted;

    this.getDescription = function () {
        return `Fichier: ${this.filename}; Type: ${this.type}; Size: ${this.size}; Encrypted: ${this.encrypted}`;
    }
};

const fileDisplayInfo = function (numericFileClass) {
    this.hasBeenSeen = false;
    this.createdAt = new Date();

    this.getFileName = () => numericFileClass.filename;
    this.getSize = () => numericFileClass.size;
    this.getType = () => numericFileClass.type;

    this.getDescription = () => ` ${numericFileClass.getDescription()}
    Created at ${this.createdAt}
    Has been seen ${this.hasBeenSeen}`;

    this.setSeen = () => this.hasBeenSeen = true;
};


const listFiles = function () {
    this.myList = [];
    this.index = -1;

    this.addNewFile = function (file) {
        this.myList.push(file);
    }
    this.showNextFile = function () {
        this.index++;
        if (this.index >= this.myList.length) {
            this.index = 0;
        }
        console.log(this.myList[this.index].getDescription());
    }
    this.showPreviousFile = function () {
        this.index--;

        if (this.index < 0) {
            this.index = this.myList.length - 1;
        }
        console.log(this.myList[this.index].getDescription());
    }
}

const NumericFileFactory = function () { };

NumericFileFactory.prototype.numericFileClass = undefined;
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
        default:
            console.log('Error creating objects !');
            return;
    }
    return new this.numericFileClass(params);
};


const myNumericFileFactory = new NumericFileFactory();
const photo = myNumericFileFactory.createFile('photoFile', { filename: 'testFile', size: '512MB', type: 'JPEG', pixelNumber: '567k' });
const song = myNumericFileFactory.createFile('songFile', { filename: 'songTest', size: '1.02GB', type: 'MP3', converted: 'true' });
const text = myNumericFileFactory.createFile('textFile', { filename: 'textFile', size: '1.02GB', type: 'MP3', encrypted: 'true' });
const video = myNumericFileFactory.createFile('videoFile', { filename: 'videoFile', size: '1.02GB', type: 'MP3', hd: 'false' });

const p1 = new fileDisplayInfo(photo);
const s1 = new fileDisplayInfo(song);
const t1 = new fileDisplayInfo(text);
const v1 = new fileDisplayInfo(video);


const myFiles = new listFiles();
myFiles.addNewFile(p1);
myFiles.addNewFile(s1);
myFiles.addNewFile(t1);
myFiles.addNewFile(v1);





const commands = {
    pwd: function () {
        console.log('Tu as fait un pwd');
        readline.prompt();
    },
    exit: function () {
        console.log('Closing script...');
        readline.close();
        process.exit();
    },
    photo: function () {
        console.log('Affichage de la photo :', Photo);
        readline.prompt();
    }
};

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (key) {
    if (key == '\u001B\u005B\u0043') {
        myFiles.showNextFile()
    }
    else if (key == '\u001B\u005B\u0044') {
        myFiles.showPreviousFile()
    }
    else if (key == '\u0003') {
        console.log("Ending of script...")
        process.exit();
    }
    else {
        console.log(key);
        if (key == 'e') {
            console.log('You actualy read 6 files.')
        }
        else if (key == 'c') {
            console.log(`There are ${myFiles.length} files.`)
        }
        else {
            console.log('Sorry, unknown command...')
        }
    }


});

