import React, {useState} from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewSportTrip.css";
import {API} from "aws-amplify";
import {useFormFields} from "../libs/hooksLib";

export default function NewSportTrip(props) {
    const [fields, handleFieldChange] = useFormFields({
        locationName: "",
        tripDescription: "",
        tripDate: "",
        tripDifficulty: "",
        tripType: "",
        tripDuration: "",
        maxGroupCount: "",
        cost: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return true;
        // return content.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await createSportTrip(fields);
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
                <FormGroup controlId="locationName" bsSize="large">
                    <ControlLabel>Location</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={fields.locationName}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="tripDescription" bsSize="large">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        type="text"
                        value={fields.tripDescription}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="tripDate" bsSize="large">
                    <ControlLabel>Date</ControlLabel>
                    <FormControl
                        type="date"
                        value={fields.tripDate}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="tripDifficulty" bsSize="large">
                    <ControlLabel>Difficulty</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={fields.tripDifficulty}
                        onChange={handleFieldChange}
                        defaultValue="ONE"
                    >
                        <option/>
                        <option value={'ONE'}>1st category of difficulty</option>
                        <option value={'TWO'}>2 category of difficulty</option>
                        <option value={'THREE'}>3 category of difficulty</option>
                        <option value={'FOUR'}>4th category of difficulty</option>
                        <option value={'FIVE'}>5 category of difficulty</option>
                        <option value={'SIX'}>6 category of difficulty</option>
                        <option value={'WEEKEND_HIKE'}>Weekend hike</option>
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="tripType" bsSize="large">
                    <ControlLabel>Type</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={fields.tripType}
                        onChange={handleFieldChange}

                    >
                        <option/>
                        <option value={'HIKING'}>Hiking</option>
                        <option defaultValue={'BIKE_TRIP./P'} value={'BIKE_TRIP'}>Bike trip</option>
                        <option value={'MOUNTAIN_HIKE'}>Mountain hike</option>
                        <option value={'WATER_HIKE'}>Water hike</option>
                        <option value={'CAVING'}>Caving</option>
                        <option value={'SKI_TRIP'}>Ski trip</option>
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="tripDuration" bsSize="large">
                    <ControlLabel>Trip duration in days</ControlLabel>
                    <FormControl
                        type="number"
                        value={fields.tripDuration}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="maxGroupCount" bsSize="large">
                    <ControlLabel>Max group count</ControlLabel>
                    <FormControl
                        type="number"
                        value={fields.maxGroupCount}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="cost" bsSize="large">
                    <ControlLabel>Cost</ControlLabel>
                    <FormControl
                        type="number"
                        value={fields.cost}
                        onChange={handleFieldChange}
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