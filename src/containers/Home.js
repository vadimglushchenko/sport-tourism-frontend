import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home(props) {
    const [sportTrips, setSportTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            try {
                const sportTrips = await loadSportTrips();
                setSportTrips(sportTrips);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    function loadSportTrips() {
        return API.get("sport_tourism", "/getAllSportTrips");
    }

    function renderSportTripList(sportTrips) {
        return [{}].concat(sportTrips).map((sportTrip, i) =>
            i !== 0 ? (
                <LinkContainer key={sportTrip.id} to={`/getAllSportTrips/${sportTrip.id}`}>
                    {/*<ListGroupItem header={sportTrip.content.trim().split("\n")[0]}>*/}
                    <ListGroupItem header={sportTrip[0]}>
                        {"Location: " + sportTrip.locationName + "\n"}
                        {"Description: " + sportTrip.tripDescription + "\n" }
                        {"Trip date: " + sportTrip.tripDate + "\n"}
                        {"Trip difficulty: " + sportTrip.tripDifficulty + "\n"}
                        {"Trip type: " + sportTrip.tripType + "\n"}
                        {"Trip duration: " + sportTrip.tripDuration + "\n"}
                        {"Max group count: " + sportTrip.maxGroupCount + "\n"}
                        {"Cost: " + sportTrip.cost + "\n"}
                        {"Is sport trip finished: " + sportTrip.isFinished + "\n"}
                        {"Is sport trip removed: " + sportTrip.isRemoved + "\n"}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/addSportTrip">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Create a new sport trip
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>Scratch</h1>
                <p>A simple sport trip taking app</p>
            </div>
        );
    }

    function renderSportTrips() {
        return (
            <div className="sportTrips">
                <PageHeader>Sport trips</PageHeader>
                <ListGroup>
                    {!isLoading && renderSportTripList(sportTrips)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {props.isAuthenticated ? renderSportTrips() : renderLander()}
        </div>
    );
}