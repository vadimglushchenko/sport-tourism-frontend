import React, {useEffect, useState} from "react";
import {ListGroup, ListGroupItem, PageHeader} from "react-bootstrap";
import "./Home.css";
import {API} from "aws-amplify";
import {LinkContainer} from "react-router-bootstrap";

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
        return API.get("sport_tourism", "/getSportTrips?isCompleted=false");
    }

    function renderSportTripList(sportTrips) {
        return [{}].concat(sportTrips).map((sportTrip, i) =>
            i !== 0 ? (
                <LinkContainer key={sportTrip.id} to={`/sportTrips/${sportTrip.id}`}>
                    <ListGroupItem header={sportTrip[0]}>
                        <p>{"Location: " + sportTrip.locationName}</p>
                        <p>{"Description: " + sportTrip.tripDescription}</p>
                        <p> {"Trip date: " + sportTrip.tripDate}</p>
                        <p>{"Trip difficulty: " + sportTrip.tripDifficulty}</p>
                        <p>{"Trip type: " + sportTrip.tripType}</p>
                        <p>{"Trip duration: " + sportTrip.tripDuration}</p>
                        <p>{"Max group count: " + sportTrip.maxGroupCount}</p>
                        <p>{"Cost: " + sportTrip.cost}</p>
                        <p>{"Status: ".concat(sportTrip.isFinished ? "Finished" : "Active")}</p>
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