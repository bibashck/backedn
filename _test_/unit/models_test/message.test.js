const messages = require('../../../models/message');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test_jobseeker';

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
    it('Should be able create a message', () => {
        let message = {
            name: "name",
            email:"bibashck@gmai.com",
            message:"message",
            type: "5"
        };
        // const hero_1 = await Heroes.create(hero);
        return messages.create(message)
            .then((jobpost_1) => {
                expect(jobpost_1.name).toEqual('Pilot');
            });
    });


   


    it('should  able to delete one messages', async () => {
        const status = await messages.deleteOne();
        expect(status.ok).toBe(1);
    });
    it('should be able to remove all heroes', async () => {
        const status = await messages.deleteMany();
        expect(status.ok).toBe(1);
    });
 
})