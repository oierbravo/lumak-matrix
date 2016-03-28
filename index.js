'use strict';

const hooks = require('./hooks');

class Service {
  constructor(options) {
    this.options = options || {};
    this.matrixData = [
          1,0,0,0,0,0,1,1,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,
          1,0,0,0,0,0,1,1
        ];
   
  };
  var NUM_ROWS = 8;
  var NUM_COLS = 8;


  find(params) {
    console.log('matrix-find-params-query',params.query);
    var output = [];
    for(var i = 0; i < NUM_COLS;i++){
      for(var j = 0; j < NUM_ROWS;j++){
            var el = {
            index:j + i * NUM_COLS,
          x:i,
          y:j,
          value:matrixData[j + i * NUM_COLS]

        }
        output.push(el);
      }

    }
    return Promise.resolve(output);
  }

  get(id, params) {
    console.log('matrix-get-id',id);
    console.log('matrix-get-params-query',params.query);
    var output = {};
    /*if(typeof this.datos[id] !== 'undefined'){
      var data = this.datos[id];
      //var output =  _.extend(output,data);
      if(typeof params.query.key !== 'undefined'){
        output = data[params.query.key];
      } else {
        output = data;
     }
    }*/

    return Promise.resolve(output);
  }

  update(id, data, params) {
    console.log('matrix-update-index',id);
    console.log('matrix-update-data',data);
   // console.log('update-params',params);
    if(typeof this.datos[id] !== 'undefined'){
      this.matrixData[id] = data.value;
    }
    return Promise.resolve({index:id,value:data.value,x:data.x,y:data.y});
  }

  patch(id, data, params) {
    console.log('matrix-patch-id',id);
    console.log('matrix-patch-data',data);
    return Promise.resolve(data);
  }

}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/matrix', new Service());

  // Get our initialize service to that we can bind hooks
  const matrixService = app.service('/matrix');

  // Set up our before hooks
  matrixService.before(hooks.before);

  // Set up our after hooks
  matrixService.after(hooks.after);
};

module.exports.Service = Service;
