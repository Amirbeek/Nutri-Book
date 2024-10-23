import React, { useEffect, useState } from "react";
import axios from "axios";import "bootstrap/dist/css/bootstrap.min.css";

import "./Styles/allergens_form.css";
import CheckAllergy from "./CheckAllergy.js";

function User() {
  const [formData, setFormData] = useState({
    username: "",
    common_allergies: "",
    uncommon_allergies: "",
    other: "",
  });

  useEffect(() => {
    console.log("FormData:", formData);
  }, [formData]);

  const submitForm = () => {
    const selectedOption = document.getElementById("common_allergies").value;
    const selectedOption2 = document.getElementById("uncommon_allergies").value;
    const otherText = document.getElementById("displayText").value;

    const token = sessionStorage.getItem('token');

    const email = sessionStorage.getItem('email');

    setFormData(prevState => ({
      ...prevState,
      email: email,
      common_allergies: selectedOption,
      uncommon_allergies: selectedOption2,
      other_allergies: otherText,
    }));

    axios.post('http://localhost:8080/api/user/createAllergy', {
      email: email,
      common_allergies: selectedOption,
      uncommon_allergies: selectedOption2,
      other_allergies: otherText,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
        .then(response => {
          console.log("Response:", response.data);
          alert("Data submitted successfully!");
        })
        .catch(error => {
          console.error('There was an error submitting the form:', error);
          if (error.response && error.response.status === 500 && error.response.data === "the allergy chooses already") {
            alert("The allergy has already been chosen.");
          } else {
            alert("The allergy has already been chosen.");
          }
        });
  };


  const updateText = () => {
    const checkbox = document.getElementById("allergyCheckbox");
    const text = document.getElementById("displayText");

    text.style.display = checkbox.checked ? "block" : "none";
  };

  return (
      <div className="App">
        <div className="row justify-content-md-center">
          <div className="col-5">
            <CheckAllergy/>
          </div>

        </div>
        <div className="page-container">
          <div className="row">
            <div className="col-12">
              <form action="/action_page.php" className="allergies">
                <h3 className="text-dark text-center">Allergies</h3>
                <label htmlFor="common_allergies" className="text-secondary">Most common Allergies</label>
                <select className="form-control" id="common_allergies" name="common_allergies" placeholder="Choose">
                  <option value="">Choose</option>
                  <option value="peanuts">Peanuts</option>
                  <option value="tree_nuts">Tree nuts (e.g., almonds, walnuts, cashews)</option>
                  <option value="milk">Milk</option>
                  <option value="eggs">Eggs</option>
                  <option value="soy">Soy</option>
                  <option value="wheat">Wheat</option>
                  <option value="fish">Fish (e.g., salmon, tuna, cod)</option>
                  <option value="shellfish">Shellfish (e.g., shrimp, crab, lobster)</option>
                  <option value="sesame_seeds">Sesame seeds</option>
                  <option value="mustard">Mustard</option>
                  <option value="sulphites">Sulphites (a group of sulfur-based compounds often used as food
                    preservatives)
                  </option>
                  <option value="gluten">Gluten (in individuals with celiac disease)</option>
                  <option value="lupin">Lupin (a type of legume)</option>
                  <option value="celery">Celery</option>
                  <option value="stone_fruits">Stone fruits (e.g., peaches, cherries, apricots) for some individuals with pollen-food syndrome</option>

                </select>
                <br />

                <label htmlFor="uncommon_allergies" className="text-secondary">Select uncommon allergies:</label>
                <select className="form-control" id="uncommon_allergies" name="uncommon_allergies" placeholder="Choose">
                  <option value="">Choose</option>
                  <option value="peanuts">Peanuts</option>
                  <option value="tree_nuts">Tree nuts (e.g., almonds, walnuts, cashews)</option>
                  <option value="milk">Milk</option>
                  <option value="eggs">Eggs</option>
                  <option value="soy">Soy</option>
                  <option value="wheat">Wheat</option>
                  <option value="fish">Fish (e.g., salmon, tuna, cod)</option>
                  <option value="shellfish">Shellfish (e.g., shrimp, crab, lobster)</option>
                  <option value="sesame_seeds">Sesame seeds</option>
                  <option value="mustard">Mustard</option>
                  <option value="sulphites">Sulphites (a group of sulfur-based compounds often used as food
                    preservatives)
                  </option>
                  <option value="gluten">Gluten (in individuals with celiac disease)</option>
                  <option value="lupin">Lupin (a type of legume)</option>
                  <option value="celery">Celery</option>
                  <option value="stone_fruits">Stone fruits (e.g., peaches, cherries, apricots) for some individuals
                    with pollen-food syndrome
                  </option>
                  <option value="red_meat">Red meat allergy: Some people can develop an allergy to a sugar molecule
                    called alpha-gal found in mammalian meat (e.g., beef, pork, lamb). This allergy is often associated
                    with tick bites.
                  </option>
                  <option value="corn">Corn allergy: Allergic reactions to corn and corn-based products can occur but
                    are relatively rare.
                  </option>
                  <option value="avocado">Avocado allergy: Allergic reactions to avocados, which are rich in healthy
                    fats, are uncommon but can occur.
                  </option>
                  <option value="kiwi">Kiwi allergy: Kiwi fruit can cause allergic reactions in some individuals.
                  </option>
                  <option value="banana">Banana allergy: While not as common as some other fruit allergies, banana
                    allergies can still occur.
                  </option>
                  <option value="quinoa">Quinoa allergy: Quinoa is generally considered a healthy food, but a small
                    number of people may be allergic to it.
                  </option>
                  <option value="sunflower_seed">Sunflower seed allergy: Allergies to sunflower seeds, often found in
                    trail mixes and baked goods, can be uncommon but exist.
                  </option>
                  <option value="other_meat">Meat allergies other than alpha-gal: Some individuals may have allergies to
                    specific meats such as chicken, turkey, or rabbit.
                  </option>
                  <option value="spices_herbs">Spices and herbs: Allergic reactions to certain spices and herbs, like
                    coriander, paprika, or basil, can be uncommon.
                  </option>
                  <option value="hops">Hops allergy: Hops are used in brewing beer and can cause allergies in some
                    individuals.
                  </option>

                </select>
                <br/>
                <div className="ko">
                  <label htmlFor="allergyCheckbox" className="text-secondary">Choose an allergy:</label>
                  <input type="checkbox" id="allergyCheckbox" onChange={updateText}/>
                  <input type="text" className="form-control inp" placeholder="Type allergy" id="displayText"/>
                </div>
                <button type="button" className="custom-btn btn-4 mt-3 btn btn-dark" onClick={submitForm}>Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default User;
