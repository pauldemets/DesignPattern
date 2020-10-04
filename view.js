
const controller = require('./controller');

module.exports = {
    start: function () {

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
                    controller.listFiles.get().showNextFile();
                    break;
                //fleche de gauche
                case '\u001B\u005B\u0044':
                    controller.listFiles.get().showPreviousFile();
                    break;
                //CTRL + C
                case '\u0003':
                    console.log("> Ending of script...")
                    process.exit();
                    break;
                case 'e':
                    console.log(`> You actualy read ${controller.listFiles.get().getFilesCountSeen()} files.`)
                    break;
                case 'c':
                    console.log(`> There are ${controller.listFiles.get().getSize()} files.`)
                    break;
                case 'h':
                    console.log('>' + controller.listFiles.get().showHelp());
                    break;

                default:
                    console.log('> Sorry, unknown command...')
                    break;
            }
        });
    }
};





