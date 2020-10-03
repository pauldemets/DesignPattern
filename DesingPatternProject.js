/**
 * 
 * Au moins une Facory -- OK
 * Au moins un Singletton -- OK
 * Au moins un Constructor -- OK
 * Au moins une Facade
 * Au moins un Observe 
 * Au moins un décorateur -- OK
 * 
 */


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
    this.hasBeenSeen = false;
    this.createdAt = new Date();

    this.getFileName = () => numericFileClass.filename;
    this.getSize = () => numericFileClass.size;
    this.getType = () => numericFileClass.type;


    this.getDescription = () => {
        return `${numericFileClass.getDescription()}
    Created at : ${this.createdAt}
    Has been seen : ${this.hasBeenSeen} \n`
    };

    this.setSeen = () => this.hasBeenSeen = true;
    this.getSeen = () => this.hasBeenSeen;
};


/**
 * --------SINGLETON--------
 * Objet qui représente la liste de tous les fichier
 * on va pouvoir effectuer différentes actions sur cette liste comme  : 
 * 
 * - ajouter un fichier dans la liste (addNewFile)
 * - lire le fichier suivant/precedent (showNextFile/showPreviousFile)
 * - voir combien de fichiers on a vu (getSize)
 * - voir le nombre total de fichiers présents (getFilesCountSeen)
 * 
 */
const listFiles = (function () {

    let instance;

    const init = function () {
        let myList = [];
        let index = -1;
        let counter = 0;

        const addNewFile = function (file) {
            myList.push(file);
        }

        const checkIfSeen = function (file) {
            if (!file.getSeen()) {
                counter++;
            }
        }

        const getFilesCountSeen = function () {
            return counter;
        }

        const getSize = function () {
            return myList.length;
        }

        const showNextFile = function () {
            index++;
            if (index >= myList.length) {
                index = 0;
            }

            checkIfSeen(myList[index]);

            console.log(myList[index].getDescription());
            myList[index].setSeen();
        }
        const showPreviousFile = function () {
            index--;

            if (index < 0) {
                index = myList.length - 1;
            }
            checkIfSeen(myList[index]);

            console.log(myList[index].getDescription());
            myList[index].setSeen();
        }

        return {
            addNewFile,
            showNextFile,
            showPreviousFile,
            getSize,
            getFilesCountSeen
        }
    }

    return {
        get: () => {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();


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



/**
 * --------INSTANCIATION--------
 * Ici on va créer tous les objets que l'on doit créer (cf sujet projet).
 * Après avoir créer les objects on créer les objets avec décorateur
 * pour profiter de plus de méthodes/attributs
 */
const myNumericFileFactory = new NumericFileFactory();
data.files().forEach(element => {
    const newObj = myNumericFileFactory.createFile(element.type, element);
    listFiles.get().addNewFile(new fileDisplayInfo(newObj));
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
            listFiles.get().addNewFile(new fileDisplayInfo(newObj));
        });
    }, 30000);
};
addLatestFiles();


/**
 * --------CLI--------
 * Mise en place de l'interface en ligne de commande
 */
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');


/**
 *  Ici on définit la réponse du script par rapport 
 * à ce que va faire l'utilisateur
 */
stdin.on('data', function (key) {

    switch (key) {
        //fleche de droite
        case '\u001B\u005B\u0043':
            listFiles.get().showNextFile();
            break;
        //fleche de gauche
        case '\u001B\u005B\u0044':
            listFiles.get().showPreviousFile();
            break;
        //CTRL + C
        case '\u0003':
            console.log("Ending of script...")
            process.exit();
            break;
        case 'e':
            console.log(`You actualy read ${listFiles.get().getFilesCountSeen()} files.`)
            break;
        case 'c':
            console.log(`There are ${listFiles.get().getSize()} files.`)
            break;

        default:
            console.log('Sorry, unknown command...')
            break;
    }
});