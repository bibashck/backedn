const posts = require('../../../models/Post');
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
    it('Should be able create a message', () => {
        let post = {
           description:"holana",
           userid: id
        };
        // const hero_1 = await Heroes.create(hero);
        return posts.create(post)
            .then((post_1) => {
                expect(post_1.description).toEqual('holana');
            });
    });


   


    it('should  able to delete one posts', async () => {
        const status = await posts.deleteOne();
        expect(status.ok).toBe(1);
    });
    it('should be able to remove all posts', async () => {
        const status = await posts.deleteMany();
        expect(status.ok).toBe(1);
    });
 
})