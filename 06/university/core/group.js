'use strict';

/**
 * @typedef {Object} Group
 * @property {number} number
 */

function Group(number){
  if (typeof(number) != 'number')
      throw new Error('Wrong number');

  this.number = number;
  this.students = [];

  this.setPresenceStudents = function(){
    for(let student of this.students){
      student.setHelth(confirm(`Студент присутствует на занятии:\n${student.fullName()}?`));
    };
  };

  this.checkStudents = function(){
    let listOfIllStudents = this.students.filter(student => !student.helth());
    console.log('*** Список больных студентов ***');
    console.table(listOfIllStudents);
  };
};
