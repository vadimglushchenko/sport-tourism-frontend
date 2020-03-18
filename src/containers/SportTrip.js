import React, {useEffect, useState} from "react";
import {API} from "aws-amplify";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import "./SportTrip.css";
import {LinkContainer} from "react-router-bootstrap";

export default function SportTrip(props) {
    const [sportTrip, setSportTrip] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function loadSportTrip() {
            return API.get("sport_tourism", `/getSportTrips?id=${props.match.params.id}`);
        }

        async function onLoad() {
            try {
                const sportTrip = await loadSportTrip();
                setSportTrip(sportTrip);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.match.params.id]);

    function renderComments(comments) {
        return [{}].concat(comments).map((comment, i) =>
            i !== 0 ? (
                <ListGroupItem header={comment[0]}>
                    <p>{"Author: " + comment.authorUsername}</p>
                    <p>{"Comment: " + comment.commentText}</p>
                    <p> {"Creation date: " + comment.date}</p>
                </ListGroupItem>
            ) : (comments.length === 0) ? <p>Nobody left comments on this sport trip </p> : null
        )
    }

    function renderSportTrip(sportTrip) {
        return <ListGroupItem header={sportTrip[0]}>
            <p>{"Location: " + sportTrip.locationName}</p>
            <p>{"Description: " + sportTrip.tripDescription}</p>
            <p> {"Trip date: " + sportTrip.tripDate}</p>
            <p>{"Trip difficulty: " + sportTrip.tripDifficulty}</p>
            <p>{"Trip type: " + sportTrip.tripType}</p>
            <p>{"Trip duration: " + sportTrip.tripDuration}</p>
            <p>{"Max group count: " + sportTrip.maxGroupCount}</p>
            <p>{"Cost: " + sportTrip.cost}</p>
            <p>{"Status: ".concat(sportTrip.isFinished ? "Finished" : "Active")}</p>
            <p>{"Comments: "}</p>
            {renderComments(sportTrip.comments)}
        </ListGroupItem>
    }

    return (
        <div className="SportTrips">
            <ListGroup>
                {!isLoading && renderSportTrip(sportTrip)}
                <LinkContainer key="return" to="/">
                    <ListGroupItem>
                        <h4>Return to main page</h4>
                    </ListGroupItem>
                </LinkContainer>
            </ListGroup>
        </div>);
}