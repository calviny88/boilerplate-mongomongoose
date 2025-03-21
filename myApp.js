require('dotenv').config();

const mongoose = require("mongoose");

const uri = "mongodb+srv://wmyuen:<db_password>@calviny.fnnlz.mongodb.net/?appName=calviny";

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});


let Person = mongoose.model("Person", personSchema);

const createSchema = function(done) {
  //... do something (risky) ...

  if (error) return done(error);
  done(null, result);
};



const createAndSavePerson = (done) => {

  const newPerson = new Person (
    { 
    "name": "John",
    "age": 18,
    "favoriteFoods": ["Indian", "Chinese"]
    }
  );

  newPerson.save(function(err, data) {
    if (err) {
      console.error(err);
      return done(err);  // Pass the error to 'done'
    }
    done(null, data);
  });


};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);  // Handle errors properly
    done(null, data);            // Pass the result to the callback
  });

  
};

const findPeopleByName = (personName, done) => {

  Person.find( {name : personName}, ( err, data ) => {
    if (err) return done(err);  // Handle errors properly
    done(null, data);            // Pass the result to the callback
  });
};

const findOneByFood = (food, done) => {

  Person.findOne( {favoriteFoods : food}, ( err, data ) => {
    if (err) return done(err);  // Handle errors properly
    done(null, data);            // Pass the result to the callback
  });


};

const findPersonById = (personId, done) => {
  Person.findById( {_id : personId}, ( err, data ) => {
    if (err) return done(err);  // Handle errors properly
    done(null, data);            // Pass the result to the callback
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById( {_id : personId}, ( err, person ) => {
    if (err) {
      console.error("Error finding person:", err);
      return done(err);  // Handle errors properly
    }
    if (!person){
      return done(new Error("Person not found"));
    }            // Pass the result to the callback
    person.favoriteFoods.push(foodToAdd);  // Add new food

    person.save((err, updatedPerson) => {
      if (err) {
        console.error("Error saving person:", err);
        return done(err);
      }
      done(null, updatedPerson);  // Pass the updated document
    });
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;



  Person.findOneAndUpdate(
    { name: personName },               // Find by name
    { $set: { age: ageToSet } },        // Update the age
    { new: true, runValidators: true }, // Return the updated document
    (err, updatedPerson) => {
      if (err) {
        console.error("Error updating person:", err);
        return done(err);
      }
      if (!updatedPerson) {
        return done(new Error("Person not found"));
      }
      done(null, updatedPerson);         // Pass the updated document
    }
  )
  };


const removeById = (personId, done) => {
  Person.findByIdAndRemove( {_id : personId}, ( err, removedPerson ) => {
    if (err) {
      console.error("Error finding person:", err);
      return done(err);  // Handle errors properly
    }
    if(!removedPerson){
      return done(new Error("Person not found"));
    }
    done(null, removedPerson);       
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) {
      console.error("Error removing people:", err);
      return done(err);
    }
    
    // Pass the result to the callback
    done(null, result);
  });

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })     // Find people who like burrito
  .sort({ name: 1 })                             // Sort by name (ascending)
  .limit(2)                                       // Limit to 2 documents
  .select("-age")                                 // Hide the age field
  .exec((err, data) => {                          // Execute the query
    if (err) {
      console.error("Error finding people:", err);
      return done(err);
    }
    done(null, data);                             // Pass the data to callback
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
