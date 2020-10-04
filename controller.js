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
    })(),
};
