//populate the database with your seed values!
const seed = async () => { 
    await sequelize.sync({force: true}) //sync to your database!  
    const ebook = await Media.create({ type: "e-book" });
    const hardcover = await Media.create({ type: "hardcover" })
    const paperback = await Media.create({ type: "paperback" })
    const audiobook = await Media.create({ type: "audiobook" })
    sequelize.close() //close your db connection 
    console.log('Seed Successful!') //everything is working correctly!
    }
  seed() //initialize the sync!