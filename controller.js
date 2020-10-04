
/**
 * --------FACADE--------
 * Petite facade qui permet d'obtenir des informations 
 * supplémentaires sur un fichier : sa position dans la 
 * liste des fichiers ainsi que sa date de création.
 */
const fileHelp = function () { };
fileHelp.prototype = {
    get: function (index, fileDisplayInfo) {
        return `Le fichier que vous venez de lire est le ${index + 1}${index + 1 == 1 ? 'er' : 'ème'} \n` +
            `et il a été crée le ${fileDisplayInfo.getDateCreated()}`;
    },
};

/**
 * --------OBSERVER--------
 * Observer qui va permettre de notifier l'utilisateur 
 * lorqu'il va appuyer sur soit la fleche de gauche ou
 * de droite pour naviguer entre les différents fichiers.
 * Un message apparaitra alors pour lui indiquer quelle action
 * il vient de réaliser.
 */
const pushHandler = function (item) {
    console.log("fired: " + item);
};

function Push() {
    this.handlers = [];  // observers
}

Push.prototype = {
    subscribe: function (fn) {
        this.handlers.push(fn);
    },
    unsubscribe: function (handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    },
    fire: function (contextObj, msg) {
        const context = contextObj || window;
        this.handlers.forEach((handler) => handler(context, msg));
    }
}

module.exports = {
    /**
    * --------SINGLETON--------
    * Objet qui représente la liste de tous les fichiers
    * on va pouvoir effectuer différentes actions sur cette liste comme  : 
    * 
    * - ajouter un fichier dans la liste (addNewFile)
    * - lire le fichier suivant/precedent (showNextFile/showPreviousFile)
    * - voir combien de fichiers on a vu (getSize)
    * - voir le nombre total de fichiers présents (getFilesCountSeen)
    * 
    */
    listFiles: (function () {

        let instance;

        const init = function () {
            let myList = [];
            let index = -1;
            let counter = 0;
            let push = new Push();

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
                push.subscribe(pushHandler);
                push.fire('Pushed Right -->');
                push.unsubscribe(pushHandler);

                index++;
                if (index >= myList.length) {
                    index = 0;
                }

                checkIfSeen(myList[index]);

                console.log('> ' + myList[index].getDescription());
                myList[index].setSeen();
            }
            const showPreviousFile = function () {
                push.subscribe(pushHandler);
                push.fire('Pushed Left <--');
                push.unsubscribe(pushHandler);

                index--;

                if (index < 0) {
                    index = myList.length - 1;
                }
                checkIfSeen(myList[index]);

                console.log('> ' + myList[index].getDescription());
                myList[index].setSeen();
            }

            const showHelp = function () {
                if (index < 0 || index >= myList.length) {
                    return 'not found...';
                }
                myHelp = new fileHelp();
                return myHelp.get(index, myList[index]);
            }

            return {
                addNewFile,
                showNextFile,
                showPreviousFile,
                getSize,
                getFilesCountSeen,
                showHelp
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
    })(),
};
