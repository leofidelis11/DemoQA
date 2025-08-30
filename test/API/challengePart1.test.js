const request = require("supertest");
const { expect } = require("chai");
const {
  uniqueNamesGenerator,
  colors,
  animals,
} = require("unique-names-generator");

describe("Challenge Part 1", () => {
    const randomName = uniqueNamesGenerator({ dictionaries: [colors, animals] });
    let token;
    let userId;

  it("Create an user", async () => {
    const response = await request("https://demoqa.com")
      .post("/Account/v1/User")
      .set("Content-Type", "application/json")
      .send({
        userName: randomName,
        password: "Passw0rd#",
      })
    
    userId = response.body.userID
    expect(response.status).to.equal(201);
    expect(response.body.username).to.equal(randomName);
  });

  it("Generate access token", async () => {
    const response = await request("https://demoqa.com")
      .post("/Account/v1/GenerateToken")
      .set("Content-Type", "application/json")
      .send({
        userName: randomName,
        password: "Passw0rd#",
      });
    token = response.body.token
    expect(response.status).to.equal(200);
    expect(response.body.token).to.be.a("string");
    expect(response.body.status).to.equal("Success");
  });

  it("Verify if user created is authorized", async () => {
    const response = await request("https://demoqa.com")
      .post("/Account/v1/Authorized")
      .set("Content-Type", "application/json")
      .send({
        userName: randomName,
        password: "Passw0rd#",
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.equal(true);
  });

  it("List available books", async () => {
    const response = await request("https://demoqa.com")
      .get("/BookStore/v1/Books")
      .set("Content-Type", "application/json");

    expect(response.status).to.equal(200);
    expect(response.body.books[0].title).to.equal("Git Pocket Guide");
  });

  it("Rent two books of free choice", async () => {
    const response = await request("https://demoqa.com")
      .post("/BookStore/v1/Books")
      .set('Authorization', `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId: userId,
        collectionOfIsbns: [
          {
            isbn: "9781449325862",
          },
          {
            isbn: "9781449331818",
          },
        ]
      });  

    expect(response.status).to.equal(201);
    expect(response.body.books[0].isbn).to.be.a('string');
    expect(response.body.books[1].isbn).to.equal('9781449331818');
  }); 

  it("List user details with chosen books", async () => {
    const response = await request("https://demoqa.com")
      .get(`/Account/v1/User/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .set("Content-Type", "application/json");

    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal(randomName);
    expect(response.body.books[0].title).to.equal("Git Pocket Guide");
    expect(response.body.books[0].author).to.equal("Richard E. Silverman");
    expect(response.body.books[0].pages).to.equal(234);
    expect(response.body.books[1].title).to.equal("Learning JavaScript Design Patterns");
    expect(response.body.books[1].author).to.equal("Addy Osmani");
    expect(response.body.books[1].pages).to.equal(254);
  });
});
