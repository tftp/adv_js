student1 = new Student('Иванов Иван Иванович');
student2 = new Student('Сидоров Петр Петрович');
student3 = new Student('Петров Валентин Сергеевич');
group1 = new Group(1);
group1.students.push(student1);
group1.students.push(student2);
group1.students.push(student3);
group1.setPresenceStudents();
group1.checkStudents();
