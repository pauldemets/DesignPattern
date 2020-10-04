const controller = require('./controller');
const data = require('./data');


const typesVideoFile = ['avi', 'mp4'];
const typesSongFile = ['mp3'];
const typesPhotoFile = ['jpg', 'png'];
const typesTextFile = ['docx', 'pdf'];


/**
 * Fonction qui permet de créer une tache asynchrone
 * pour créer les deux ficher après 30 sec
 */
const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
    setTimeout(() => {
        cb();
        resolve();
    }, timeout);
});


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




const fileDisplayInfo = function (numericFileClass) { //Decorateur = surcharge des objets files
    var hasBeenSeen = false;
    var createdAt = new Date();
    var myNumericFileClass = numericFileClass;

    this.getDescription = () => {
        return `${myNumericFileClass.getDescription()}
        Created at : ${createdAt}
        Has been seen : ${hasBeenSeen} \n`;
    };

    this.setSeen = () => hasBeenSeen = true;
    this.getSeen = () => hasBeenSeen;
    this.getDateCreated = () => createdAt;
};




/**
 * --------FACTORY--------
 * Factory qui permet le création des différents fichiers : 
 * 
 * - photo
 * - video
 * - sons
 * - text
 */
const NumericFileFactory = function () { };

NumericFileFactory.prototype.numericFileClass = undefined;
NumericFileFactory.prototype.createFile = function (type, params = {}) {
    switch (true) {
        case typesPhotoFile.includes(type): this.numericFileClass = photoFile;
            break;
        case typesVideoFile.includes(type): this.numericFileClass = videoFile;
            break;
        case typesSongFile.includes(type): this.numericFileClass = songFile;
            break;
        case typesTextFile.includes(type): this.numericFileClass = textFile;
            break;
        default:
            console.log('Error creating objects !');
            return;
    }
    return new this.numericFileClass(params);
};


module.exports = {
    /**
    * --------INSTANCIATION--------
    * Ici on va créer tous les objets que l'on doit créer (cf sujet projet).
    * Après avoir créer les objects on créer les objets avec décorateur
    * pour profiter de plus de méthodes/attributs
    */
    instanceData: function () {
        const myNumericFileFactory = new NumericFileFactory();
        data.files().forEach(element => {
            const newObj = myNumericFileFactory.createFile(element.type, element);
            controller.listFiles.get().addNewFile(new fileDisplayInfo(newObj));
        });

        /**
         * Ici on ajoute les deux dernier fichiers 30secondes après le lancement
         * du script.
         */
        const addLatestFiles = async () => {
            await setAsyncTimeout(() => {
                console.log('-- Adding 2 latest files... --');
                data.latestFiles().forEach(element => {
                    const newObj = myNumericFileFactory.createFile(element.type, element);
                    controller.listFiles.get().addNewFile(new fileDisplayInfo(newObj));
                });
            }, 30000);
        };
        addLatestFiles();
    }
};

