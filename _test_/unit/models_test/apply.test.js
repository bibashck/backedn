const jobapplys = require('../../../models/jobapply');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test_jobseeker';
const userid='555555'
const jobpost5='988989'
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
    it('Should be able create a jobapplys', () => {
        let jobpost = {
           'number':"98088858910",
           'cv':"hghhh.pdf",
        'user':userid,
        'jobpost':jobpost5
        };
        // const hero_1 = await Heroes.create(hero);
        return jobapplys.create(jobpost)
            .then((jobpost_1) => {
                expect(jobpost_1.jobpost).toEqual(jobpost5);
            });
    });

   


    it('should be able to only one jobapplys', async () => {
const jobapplys = require('../../../models/jobapply');
        const status = await jobapplys.deleteOne();
        expect(status.ok).toBe(1);
    });
    it('should be able to remove all heroes', async () => {
        const status = await jobapplys.deleteMany();
        expect(status.ok).toBe(1);
    });
 
})