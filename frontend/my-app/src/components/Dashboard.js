import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK } from "../common/constants";
import {
    Button,
    Table,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import restaurantService from "../service/restaurantService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faPencil } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [ratings, setRatings] = useState("");
    const [id, setId] = useState("");
    const [editMode, setEditMode] = useState(false);

    const [restaurants, setRestaurants] = useState([
        {
            id: "Placeholder",
            name: "Placeholder",
            address: "Placeholder",
            ratings: 1,
        },
        // {
        //     id: "63259996e6d6052b2a7c68cc",
        //     name: "Pizzamaru",
        //     address: "Street 1233 Blk 291 Tines",
        //     ratings: 5,
        // },
        // {
        //     id: "6325ac1bdb56bd6a9a4f21d4",
        //     name: "Yaku Coffee and Toast",
        //     address: "East Coast St 12 Blk 123",
        //     ratings: 5,
        // },
    ]);

    useEffect(() => {
        getAllRestaurants();
    }, []);

    const toggleModal = () => {
        if (isOpen) reset();
        if (editMode) setEditMode(false);
        setIsOpen(!isOpen);
    };

    const reset = () => {
        setName("");
        setAddress("");
        setRatings("");
    };

    const sortRes = (array) => {
        return array.sort(function (a, b) {
            var res = a.ratings > b.ratings ? -1 : 1;
            return res;
        });
    };

    const openEditMode = (restaurant) => {
        setEditMode(true);
        setName(restaurant.name);
        setAddress(restaurant.address);
        setRatings(restaurant.ratings);
        setId(restaurant._id);
        setIsOpen(true);
    };
    async function createRestaurant() {
        var obj = {
            name: name,
            address: address,
            ratings: ratings,
        };
        var rest = restaurants;
        rest.push(obj);
        setRestaurants(sortRes(rest));
        await restaurantService.create(obj);
        setIsOpen(false);
        reset();
    }

    async function editRestaurant() {
        var obj = {
            name: name,
            address: address,
            ratings: ratings,
        };
        await restaurantService.update(id, obj);
        setIsOpen(false);
        setEditMode(false);
    }

    async function deleteRestaurant(id, restaurants) {
        restaurants = restaurants.filter(function (restaurant) {
            return restaurant._id !== id;
        });
        setRestaurants(restaurants);
        await restaurantService.deleteRes(id);
    }

    async function getAllRestaurants() {
        try {
            const rawData = await restaurantService.getAll();

            if (rawData.status === 200) {
                var rawRestaurantList = rawData.data;
                var restaurants = [];
                rawRestaurantList.forEach((restaurant) => {
                    restaurants.push(
                        (({ _id, name, address, ratings }) => ({
                            _id,
                            name,
                            address,
                            ratings,
                        }))(restaurant)
                    );
                });
                setRestaurants(sortRes(restaurants));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2>Top Restaurants in Singapore</h2>
            <Button
                onClick={toggleModal}
                style={{
                    float: "right",
                    marginRight: "1.5rem",
                    marginBottom: "0.2rem",
                }}
                color="success"
            >
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Modal isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader>
                    {editMode
                        ? "Edit an existing restaurant"
                        : "Add a new restaurant"}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Restaurant Name"
                                        type="name"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ratings">Ratings</Label>
                                    <Input
                                        id="ratings"
                                        name="ratings"
                                        placeholder="Ratings out of 10"
                                        type="ratings"
                                        onChange={(e) =>
                                            setRatings(e.target.value)
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                placeholder="1234 Telok Ayer St"
                                type="address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={editMode ? editRestaurant : createRestaurant}
                    >
                        Submit
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Table>
                <thead>
                    <tr>
                        <th>Top</th>
                        {Object.keys(restaurants[0]).map((key) => {
                            var string = key.replace(/[^a-z0-9]/gi, "");
                            string =
                                string[0].toUpperCase() + string.substring(1);

                            if (string === "Id") {
                                return;
                            }

                            return <th>{string}</th>;
                        })}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant, index) => {
                        return (
                            <>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    {/* <td>{restaurant._id}</td> */}
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.address}</td>
                                    <td>{restaurant.ratings}</td>
                                    <td>
                                        <Button
                                            color="danger"
                                            onClick={() =>
                                                deleteRestaurant(
                                                    restaurant._id,
                                                    restaurants
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                        <Button
                                            style={{
                                                marginLeft: "0.5rem",
                                            }}
                                            color="primary"
                                            onClick={() =>
                                                openEditMode(restaurant)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faPencil} />
                                        </Button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Dashboard;
