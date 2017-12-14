/*
 * This script test the SHARELET api
 * It assumes that the test db is empty and will delete all his records after the test
 */

//Be very sure that we will use the test environment
if(process.env.NODE_ENV !== 'test') {
    process.env.NODE_ENV = 'test';
}

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Register a new user (/POST user)', () => {
	it('it should not register without email field', (done) => {
		let badUser = {
			password : 'test',
			firstname : 'Test',
			lastname : 'User'
		}
		chai.request(server)
			.post('/api/v1/users')
			.send(badUser)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});

	it('it should not register without password field', (done) => {
		let badUser = {
			email : 'test@test.com',
			firstname : 'Test',
			lastname : 'User'
		}
		chai.request(server)
			.post('/api/v1/users')
			.send(badUser)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});

	it('it should register with 201 return', (done) => {
		let user = {
			email : 'test@test.com',
			password : 'test',
			firstname : 'Test',
			lastname : 'User'
		}
		chai.request(server)
			.post('/api/v1/users')
			.send(user)
			.end((err, res) => {
				res.should.have.status(201);
				done();
			});
	});
});

describe('Authenticate an user', () => {
	it('it should return an error 404 when the user is not found', (done) => {
		let badUser = {
			email : 'test2@test.com',
			password : 'test',
		}
		chai.request(server)
			.post('/api/v1/authenticate')
			.send(badUser)
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
	});

	it('it should return an error 400 when the credentials are bad', (done) => {
		let badUser = {
			email : 'test@test.com',
			password : 'test2',
		}
		chai.request(server)
			.post('/api/v1/authenticate')
			.send(badUser)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});

	it('it should return a token when the credentials are good', (done) => {
		let user = {
			email : 'test@test.com',
			password : 'test',
		}
		chai.request(server)
			.post('/api/v1/authenticate')
			.send(user)
			.end((err, res) => {
				res.body.should.have.property('token');
				done();
			});
	});
});

describe('User methods (/users)', () => {
	let token = null;

	before((done) => {
		let user = {
			email : 'test@test.com',
			password : 'test',
		}
		chai.request(server)
			.post('/api/v1/authenticate')
			.send(user)
			.end((err, res) => {
				token = res.body.token;
				done();
			});
	});

	it('it should get the user profile', (done) => {
		chai.request(server)
			.get('/api/v1/users')
			.set('x-access-token', token)
			.end((err, res) => {
				res.body.should.be.an('object');
				res.body.should.have.property('userid');
				res.body.should.have.property('email');
				res.body.should.have.property('outlets');
				done();
			});
	});

	it('it should update the user profile', (done) => {
		let newProfile = {
			firstname : 'New Test',
			lastname : 'New User',
		};
		chai.request(server)
			.put('/api/v1/users')
			.send(newProfile)
			.set('x-access-token', token)
			.end((err, res) => {
				res.should.have.status(200);
				chai.request(server)
					.get('/api/v1/users')
					.set('x-access-token', token)
					.end((err, res) => {
						res.body.should.be.an('object');
						res.body.firstname.should.be.equal(newProfile.firstname);
						res.body.lastname.should.be.equal(newProfile.lastname);
						done();
					});
			});

		
	});
});

describe('Outlets methods', () => {

	let token = null;

	before((done) => {
		let user = {
			email : 'test@test.com',
			password : 'test',
		}
		chai.request(server)
			.post('/api/v1/authenticate')
			.send(user)
			.end((err, res) => {
				token = res.body.token;
				done();
			});
	});

	it('it should refuse to add an outlet if the password is incorrect', (done) => {
		let outlet = {
			outlet_id : "test",
			pwd : "fake"
		};
		chai.request(server)
			.post('/api/v1/users/outlets')
			.send(outlet)
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});

	it('it should add an outlet if the password is correct', (done) => {
		let outlet = {
			outlet_id : "test",
			pwd : "EeHEZ"
		};
		chai.request(server)
			.post('/api/v1/users/outlets')
			.send(outlet)
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
});

describe('Clean up (delete user)', () => {
	let token = null;
	let user = {
		email : 'test@test.com',
		password : 'test',
	}

	before((done) => {
		
		chai.request(server)
			.post('/api/v1/authenticate')
			.send(user)
			.end((err, res) => {
				token = res.body.token;
				done();
			});
	});

	it('it should delete the user', (done) => {
		chai.request(server)
			.delete('/api/v1/users')
			.set('x-access-token', token)
			.end((err, res) => {
				chai.request(server)
					.post('/api/v1/authenticate')
					.send(user)
					.end((err, res) => {
						res.should.have.status(404);
						done();
					});
			});
	});
});
