import React, { useState, useEffect } from "react";
import axios from "axios";

function AllergyTable() {
    const [allergies, setAllergies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const email = sessionStorage.getItem("email");

                const response = await axios.get(
                    `http://localhost:8080/api/user/allergy/${email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAllergies(response.data);
            } catch (error) {
                console.error("Error fetching allergy data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h3>Allergy Data</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>Common Allergies</th>
                    <th>Uncommon Allergies</th>
                    <th>Other Allergies</th>
                </tr>
                </thead>
                <tbody>
                {allergies.length > 0 ? (
                    allergies.map((allergy, index) => (
                        <tr key={index}>
                            <td>{allergy.common_allergies || "Not chosen"}</td>
                            <td>{allergy.uncommon_allergies || "Not chosen"}</td>
                            <td>{allergy.other_allergies || "Not chosen"}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center">No allergy data found, Please choose Allergy</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default AllergyTable;
