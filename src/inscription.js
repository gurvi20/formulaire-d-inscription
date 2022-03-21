import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./Card";

function Inscription() {
  const history = useHistory();
  const [jsonObj, setJsonObj] = useState();

  const getJsonHtml = () => {
    const htmlData = {
      questions: [
        {
          title: "Parlez-nous de vous",

          fields: [
            {
              name: "first_name",
              label: "Prénom",
              type: "text",
            },

            {
              name: "last_name",
              label: "Nom",
              type: "text",
            },

            {
              name: "email",
              label: "Email",
              type: "text",
            },

            {
              name: "phone_number",
              label: "Téléphone",
              type: "text",
            },
          ],
        },

        {
          title: "Votre adresse",

          fields: [
            {
              name: "street_address",
              label: "Adresse",
              type: "text",
            },
            {
              name: "post_code",
              label: "Code postal",
              type: "text",
            },
            {
              name: "country",
              label: "Pays",
              type: "dropdown",

              options: [
                {
                  value: "CA",
                  label: "Canada",
                },
                {
                  value: "US",
                  label: "USA",
                },
              ],
            },
          ],
        },
      ],
    };
    return htmlData;
  };

  const convertJsonToString = () => {
    let jsonData = getJsonHtml();
    let my_json = JSON.stringify(jsonData);
    let parsed_obj = JSON.parse(my_json);
    setJsonObj(parsed_obj);
  };

  useEffect(() => {
    convertJsonToString();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.first_name.value;

    const formData = {
      firstName: event.target.first_name.value,
      lastName: event.target.last_name.value,
      email: event.target.email.value,
      phoneNumber: event.target.phone_number.value,
      streetAddress: event.target.street_address.value,
      postalCode: event.target.post_code.value,
      country: event.target.country.value,
    };

    fetch("https://enovode7uq1r.x.pipedream.net/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
      });

    localStorage.setItem("formItems", JSON.stringify(formData));
    history.push(`/merci/${name}`);
  };
  return (
    <Card>
      <div className="container">
        {jsonObj != null ? (
          <form onSubmit={handleSubmit}>
            <h3 class="text-center indigo-text font-bold py-4">
              <strong>Inscription</strong>
            </h3>

            <label className="fw-bold h5">{jsonObj.questions[0].title}</label>

            <div>
              {jsonObj.questions[0].fields.map((field) => (
                <div>
                  <label className="mt-2">{field.label}</label>
                  <input
                    className="form-control"
                    name={field.name}
                    type={field.type}
                    placeholder={field.label}
                    required
                  />
                </div>
              ))}
            </div>

            <label className="fw-bold mt-3 h5">
              {jsonObj.questions[1].title}
            </label>

            <div className="row">
              {jsonObj.questions[1].fields.map((field) => (
                <div className="form-group col-md-4 mt-2">
                  <label>{field.label}</label>
                  {field.label === "Pays" ? (
                    <select className="form-control" name={field.name}>
                      <option selected>sélectionner une option</option>
                      <option value={field.options[0].value}>
                        {field.options[0].label}
                      </option>
                      <option value={field.options[1].value}>
                        {field.options[1].label}
                      </option>
                    </select>
                  ) : (
                    <input
                      placeholder={field.label}
                      className="form-control"
                      name={field.name}
                      type={field.type}
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            <input
              className="btn btn-secondary  mt-3 "
              type="submit"
              value="Enregistrer"
            />
          </form>
        ) : null}
      </div>
    </Card>
  );
}

export default Inscription;
