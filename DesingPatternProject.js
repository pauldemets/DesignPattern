/**
 * 
 * Au moins une Factory -- OK
 * Au moins un Singletton -- OK
 * Au moins un Constructor -- OK
 * Au moins une Facade
 * Au moins un Observe 
 * Au moins un décorateur -- OK
 * MVC -- OK
 * 
 */

const view = require('./view');
const model = require('./model');

const startProject = function(){
    model.instanceData();
    view.start();
};


startProject();

