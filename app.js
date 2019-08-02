const person = {
  firstName: "Steve",
  lastName: "Smith",
  age: 30,
  email: "steve@aol.com",
  hobbies: ["music", "sports"],
  address: {
    city: "Miami",
    state: "Florida"
  },
  getBirthYear: function() {
    return new Date().getFullYear() - this.age;
  }
};

let val;

val = person.lastName;
val = person["lastName"];
val = person.age;
val = person.email;
val = person.hobbies;
val = person.hobbies[0];
val = person.address;
val = person.address.city;
val = person.getBirthYear();

console.log(val);

const people = [
  { name: "John", age: 30 },
  { name: "Mike", age: 29 },
  { name: "Jason", age: 22 }
];

for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}
