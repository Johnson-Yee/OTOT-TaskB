var mongoose = require("mongoose");
let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");
const Restaurant = require("../models/restaurant");
let createdId = null;
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
                createdId = res.body._id;
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
                res.should.have.status(400);
                res.body.message.should.equal(
                    "Restaurant validation failed: address: Path `address` is required."
                );
                done();
            });
    });
});

// Test the Put Route
describe("Test Put Update Edit of Restaurant", () => {
    it("Edit Restaurant", (done) => {
        chai.request(server)
            .put("/restaurants/" + createdId)
            .set("content-type", "application/json")
            .send({
                name: "Long John Silvers(Edited)",
                address: "Macpherson Blk 12 St 13 (Edited)",
            })
            .end((err, res) => {
                createdId = res.body._id;
                res.should.have.status(200);
                res.body.name.should.equal("Long John Silvers(Edited)");
                res.body.address.should.equal(
                    "Macpherson Blk 12 St 13 (Edited)"
                );
                done();
            });
    });
    const invalidId = "INVALID_ID";
    it("Failure to update restaurant", (done) => {
        chai.request(server)
            .put("/restaurants/" + invalidId)
            .set("content-type", "application/json")
            .send({
                name: "Long John Silvers",
                address: "Macpherson Blk 12 St 13",
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.message.should.equal("Invalid ID is provided");
                done();
            });
    });
});

// Test the Delete Route
describe("Test Delete of Restaurant", () => {

    const invalidId = "INVALID_ID";
    it("Failure to delete restaurant", (done) => {
        chai.request(server)
            .delete("/restaurants/" + invalidId)
            .set("content-type", "application/json")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.message.should.equal("Invalid ID is provided");
                done();
            });
    });

    it("Delete Restaurant", (done) => {
        chai.request(server)
            .delete("/restaurants/" + createdId)
            .end((err, res) => {
                createdId = res.body._id;
                res.should.have.status(200);
                res.body.message.should.equal("Deleted Restaurant");
                done();
            });
    });
});