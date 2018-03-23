import Ember from 'ember';

export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');
  let oldOnError = Ember.onerror || function() {};

  console.log('Inicializando o Rollbar');

  Ember.onerror = (...args) => {
    oldOnError(...args);
    let enabled = rollbarService.get('enabled');

    console.log('Rollbar acionado com o erro: ', args);
    console.log('Rollbar está habilitado: ', enabled);

    if (enabled) {
      rollbarService.error(...args);
    }

    if (!enabled || Ember.testing) {
      throw args[0];
    }
  };
}

export default { initialize };
