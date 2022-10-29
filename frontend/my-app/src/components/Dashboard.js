import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK } from "../common/constants";

const Dashboard = () => {
    const [restaurant, setRestaurant] = useState([
        {
            id: "63258eb008507967dfd060bb",
            name: "Dominoes Edited",
            address: "Street 999 Blk 291 Bedok",
            ratings: 3,
        },
        {
            id: "63259996e6d6052b2a7c68cc",
            name: "Pizzamaru",
            address: "Street 1233 Blk 291 Tines",
            ratings: 5,
        },
        {
            id: "6325ac1bdb56bd6a9a4f21d4",
            name: "Yaku Coffee and Toast",
            address: "East Coast St 12 Blk 123",
            ratings: 5
        },
    ]);

    useEffect(() => {
        getAllRestaurants();
    }, []);

    async function getAllRestaurants() {
        try {

            const rawData = await axios.get(`${API_LINK}/restaurants/`);

            console.log(rawData);

            // if (data.data.status === "success") {
            //     var contacts = data.data.data;

            //     var contactList = [];

            //     contacts.forEach((contact) => {
            //         contactList.push(
            //             (({ name, email, phone, gender }) => ({
            //                 name,
            //                 email,
            //                 phone,
            //                 gender,
            //             }))(contact)
            //         );
            //     });

            //     console.log(contactList);
            //     setContact(contactList);
            // }
        } catch (error) {
            console.log("error: ", error);
        }
    }

    // const getContactsToRender = () => {
    //     // console.log(contacts);
    //     return contacts.map((contact, idx) => {
    //         //   console.log(idx);
    //         return (
    //             <div className="columns contact mt-3 is-vcentered">
    //                 <div className="column">
    //                     <div className="has-icons-left" key={idx}>
    //                         <span className="icon is-small is-left pr-3">
    //                             <i className="fas fa-user"></i>
    //                         </span>
    //                         {contact.name}
    //                     </div>
    //                 </div>
    //                 <div className="column">
    //                     <div className="has-icons-left" key={idx}>
    //                         <span className="icon is-small is-left pr-3">
    //                             <i className="fas fa-envelope"></i>
    //                         </span>
    //                         {contact.email}
    //                     </div>
    //                 </div>
    //                 <div className="column">
    //                     <div className="has-icons-left" key={idx}>
    //                         <span className="icon is-small is-left pr-3">
    //                             <i className="fas fa-phone"></i>
    //                         </span>
    //                         {contact.phone}
    //                     </div>
    //                 </div>
    //                 <div className="column">
    //                     <div key={idx}>{contact.gender}</div>
    //                 </div>
    //                 <div className="column is-narrow">
    //                     <div className="buttons">
    //                         <button
    //                             className="button is-danger"
    //                             onClick={() => deleteContact(contact)}
    //                         >
    //                             Delete
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     });
    // };

    // const deleteContact = async (contact) => {
    //     var contact_name = contact.name;
    //     try {
    //         await axios
    //             .delete(`${API_URL}/api/contacts/${contact_name}`)
    //             .then((res) => {
    //                 console.log(res);
    //                 if (res.data.status === "success") {
    //                     // Refreshes the page to update contact list when useEffect is called in ContactList to get all contacts
    //                     window.location.reload();
    //                 }
    //             });
    //     } catch (err) {
    //         console.log("err: ", err);
    //     }
    // };

    // return <div>{getContactsToRender()}</div>;
};

export default Dashboard;
