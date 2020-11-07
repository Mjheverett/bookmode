//populate the database with your seed values!
const seed = async () => { 
    await sequelize.sync() //sync to your database!  
    const matthew = await User.create({ id: "auth0|5fa057099951970068077f7a", name: "Matthew Everett", email: "mjheverett@gmail.com" });
    const katy = await User.create({ id: "", name: "Katy Sage", email: "" });
    const harmony = await User.create({ id: "auth0|5fa056d9a8efd4006f8175a4", name: "Harmony Trevena", email: "harmonytrevena@gmail.com" });
    const dylan = await User.create({ id: "auth0|5fa056f0a8efd4006f8175b7", name: "Dylan Cooper", email: "dylancooper155@gmail.com" });
    sequelize.close() //close your db connection 
    console.log('User Seed Successful!') //everything is working correctly!
}
seed() //initialize the sync!