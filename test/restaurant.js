var mongoose = require("mongoose");
let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");
const Restaurant = require("../models/restaurant");

chai.should();
chai.use(chaiHttp);

// Test the Get Route
describe("/GET restaurants", () => {
    it("it should GET all the restaurants", (done) => {
        chai.request(server)
            .get("/restaurants")
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                done();
            });
    });
});

// Test the Get by ID Route
describe("/GET restaurants by ID", () => {
    const id = "6325b4190a5283ac906f59e4";
    it("it should GET a restaurant by ID", (done) => {
        chai.request(server)
            .get("/restaurants/" + id)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.name.should.equal("Long John Silvers");
                response.body._id.should.equal(id);
                done();
            });
    });
    const invalidId = "INVALID_ID";
    it("FAILURE it should not GET a restaurant by ID that does not exist", (done) => {
        chai.request(server)
            .get("/restaurants/" + invalidId)
            .end((error, response) => {
                response.should.have.status(404);
                response.body.message.should.equal("Invalid ID is provided");
                done();
            });
    });
});

// Test the Post Route
describe("Test POST Creation of Restaurant", () => {
    it("New restaurant created", (done) => {
        chai.request(server)
            .post("/restaurants")
            .set("content-type", "application/json")
            .send({
                name: "Mcdonalds Tampines Outlet",
                address: "Tampines Mall",
                ratings: 5,
            })
            .end((err, res) => {
                console.log(res);
                res.should.have.status(201);
                res.body.name.should.equal("Mcdonalds Tampines Outlet");
                res.body.address.should.equal("Tampines Mall");
                res.body.ratings.should.equal(5);
                done();
            });
    });

    it("Failure to create restaurant", (done) => {
        chai.request(server)
            .post("/restaurants")
            .set("content-type", "application/json")
            .send({
                name: "Mcdonalds Tampines Outlet",
                ratings: 5,
            })
            .end((err, res) => {
                console.log(res);
                res.should.have.status(201);
                res.body.name.should.equal("Mcdonalds Tampines Outlet");
                res.body.address.should.equal("Tampines Mall");
                res.body.ratings.should.equal(5);
                done();
            });
    });

    // it("INVALID - It should not add a new contact when specified schema is wrong", (done) => {
    //     chai.request(app)
    //         .post("/api/contacts")
    //         .type("form")
    //         .send({
    //             name: "Tester123",
    //             phone: 987654321,
    //             gender: "Male",
    //         })
    //         .end((err, res) => {
    //             res.should.have.status(400);
    //             res.body.name.should.equal("ValidationError");
    //             done();
    //         });
    // });
});

// Test the Put Route
// Test the Delete Route
