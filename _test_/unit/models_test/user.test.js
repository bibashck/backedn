const users = require('../../../Models/users');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test_jobseeker';
const id = "55555";

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    // await mongoose.connection.dropCollection('heros');
    // await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('jobposts Schema', () => {
    it('Should be able create a users', () => {
        let user = {
            'FirstName': 'Pilot',
            'LastName': 'Aviation',
            'contactnumber': '25',
            'Address': 'kathmandu',
            'email': 'bibashck@gmail.com',
            'Country': 'nepal ',
            'image': 'img.pdf',
        'Description':'astai hojingai',
        'username': 'bibashck',
            'password': '50000',
        };
        // const hero_1 = await Heroes.create(hero);
        return users.create(user)
            .then((post_1) => {
                expect(post_1.username).toEqual('bibashck');
            });
    });


   


    it('should  able to delete one users', async () => {
        const status = await users.deleteOne();
        expect(status.ok).toBe(1);
    });
    it('should be able to remove all users', async () => {
        const status = await users.deleteMany();
        expect(status.ok).toBe(1);
    });
 
})