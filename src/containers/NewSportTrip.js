import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewSportTrip.css";
import { API } from "aws-amplify";

export default function NewSportTrip(props) {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return content.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await createSportTrip({ content });
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function createSportTrip(sportTrip) {
        return API.post("sport_tourism", "/addSportTrip", {
            body: sportTrip
        });
    }

    return (
        <div className="NewSportTrip">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="content">
                    <FormControl
                        value={content}
                        componentClass="textarea"
                        onChange={e => setContent(e.target.value)}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
                </LoaderButton>
            </form>
        </div>
    );
}