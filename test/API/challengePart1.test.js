const request = require('supertest');
const { expect } = require('chai');
const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');

describe('API Challenge Part 1', () => {
    const randomName = uniqueNamesGenerator({ dictionaries: [colors, animals] });
  it('Create an user', async () => {
    const response = await request('https://demoqa.com')
        .post('/Account/v1/User')
        .set('Content-Type', 'application/json')
        .send({
          'userName': randomName,
          'password': 'Passw0rd#'
        });

    expect(response.status).to.equal(201);
    expect(response.body.username).to.equal(randomName);

    const userId = response.body.userID;
  });

  it('Generate access token', async () => {
    const response = await request('https://demoqa.com')
        .post('/Account/v1/GenerateToken')
        .set('Content-Type', 'application/json')
        .send({
          'userName': randomName,
          'password': 'Passw0rd#'
        });

    expect(response.status).to.equal(200);
    expect(response.body.token).to.be.a('string');
    expect(response.body.status).to.equal('Success');
  });

  it('Verify if user created is authorized', async () => {
    const response = await request('https://demoqa.com')
        .post('/Account/v1/Authorized')
        .set('Content-Type', 'application/json')
        .send({
          'userName': randomName,
          'password': 'Passw0rd#'
        });

    expect(response.status).to.equal(200);
    expect(response.body).to.equal(true);
  });
});
