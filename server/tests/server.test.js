var {
    ObjectID
} = require('mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

const {
    app
} = require('../server');
const {
    Course
} = require('./../models/course');

const courses = [{
        _id: new ObjectID(),
        title: "first test course"
    },
    {
        _id: new ObjectID(),
        title: "second test course"
    }
]
beforeEach((done) => {
    Course.remove({}).then(() => {
        Course.insertMany(courses);
    }).then(() => done());
});

describe('Post /courses', () => {
    it('should create a new course', (done) => {
        var title = 'Test Title';
        chai.request(app)
            .post('/courses')
            .send({
                title: title
            })
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body.title).to.equal(title);
                Course.find().then((courses) => {
                    expect(courses.length).to.equal(3);
                    expect(courses[2].title).to.equal(title);
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
                if (err) {
                    return done(err)
                }
                Course.find().then((courses) => {
                    expect(courses.length).to.equal(2);
                    done();
                }).catch((e) => done(e));
            })
    })
});

describe('GET /courses', () => {
    it('should get all courses', (done) => {
        chai.request(app)
            .get('/courses')
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Course.find().then((courses) => {
                    expect(res).to.have.status(200);
                    expect((res) => {
                        expect(res.body.courses.length).equals(2);
                    })
                    done();
                }).catch((e) => done(e));
            })
    })
})

// describe('GET /courses/:id', () => {
//     it('should get the a course doc', (done) => {
//         chai.request(app)
//         .get(`/courses/${courses[0]._id.toHexString()}`)
//         .end((err, res) => {
//             expect(res).to.have.status(200);
//             //expect(res.body.courses.title).equals(courses[0].title);
//             done();
//         }).catch((e) => done(e));
//     })
// })