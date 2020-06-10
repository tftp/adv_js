'use strict';

/**
 * @typedef {Object} Student
 * @property {string} firstName
 * @property {string} middleName
 * @property {string} lastName
 */

function Student(fio){
    if (typeof(fio) != 'string')
        throw new Error('Wrong name');

    let _fullName = fio.split(' ');

    if (_fullName.length != 3)
        throw new Error('Wrong name');

    let _helth = true;

    this.lastName = _fullName[0];
    this.firstName = _fullName[1];
    this.middleName = _fullName[2];

    this.fullName = function(){
      return _fullName.join(' ');
    };

    this.shortName = function(){
      return `${this.lastName} ${this.firstName[0]}. ${this.middleName[0]}.`;
    };

    this.setHelth = function(statement){
      _helth = statement;
    };

    this.helth = function(){
      return _helth;
    };
};
