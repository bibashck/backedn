const jobposts = require('../../../models/JobPost');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test_jobseeker';
const userid='userid'
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
    it('Should be able create a jobposts', () => {
        let jobpost = {
            'name': 'Pilot',
            'JobType': 'Aviation',
            'Applicant': '25',
            'Deadline': '01/05/2020',
            'Salary': '50000',
            'Description': 'kam garna aaye aaunus ',
            'cv': 'img.pdf',
        'userid':userid
        };
        // const hero_1 = await Heroes.create(hero);
        return jobposts.create(jobpost)
            .then((jobpost_1) => {
                expect(jobpost_1.name).toEqual('Pilot');
            });
    });

   


    it('should be able to only one jobpost', async () => {
        const status = await jobposts.deleteOne();
        expect(status.ok).toBe(1);
    });
    // it('should be able to remove all heroes', async () => {
    //     const status = await jobposts.deleteMany();
    //     expect(status.ok).toBe(1);
    // });
 
})