const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

const { app }  = require('../server');
const { Course } = require('./../models/course');

beforeEach((done) => {
    Course.remove({}).then(() => {
        done();
    })
})

describe('Post /courses', () => {
    it('should create a new course', (done) => {
        var title = 'Test Title';
        chai.request(app)
        .post('/courses')
        .send({title: title})
        .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body.title).to.equal(title);
            Course.find().then((courses) => {
                expect(courses.length).to.equal(1);
                expect(courses[0].title).to.equal(title);
                done();
            }).catch((e) => done(e));
        })
        .catch((e) => {
            done(e);
        })
        
    });
    it('should not create new course with invalid body', (done) => {
        chai.request(app)
        .post('/courses')
        .send({})
        .end((err, res) => {
            if(err) { return done(err) }
            Course.find().then((courses) => {
                expect(courses.length).to.equal(0);
                done();
            }).catch((e) => done(e));
        })
    })
})

