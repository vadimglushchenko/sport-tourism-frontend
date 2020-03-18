import React, {useState} from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewComment.css";
import {API, Auth} from "aws-amplify";
import {useFormFields} from "../libs/hooksLib";

export default function NewComment(props) {

    const [userName, setUserName] = useState("");

    const [fields, handleFieldChange] = useFormFields({
        authorUsername: getCurrentUserName(),
        commentText: "",
        date: new Date()
    });
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return true;
    }

    function getCurrentUserName() {
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(value =>
            value.getUserAttributes(function (err, userAttributes) {
                userAttributes.forEach(function (attribute) {
                    if (attribute.getName() === "email") {
                        setUserName(attribute.getValue())
                    }
                });
            }));
        return userName;
    }


    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        fields.authorUsername = userName;

        try {
            await createComment(fields, props.match.params.id);
            props.history.push(`/sportTrips/${props.match.params.id}`);
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function createComment(comment, id) {
        return API.post("sport_tourism", "/addCommentToSportTrip?id=".concat(id), {
            body: comment
        });
    }

    return (
        <div className="NewComment">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="commentText" bsSize="large">
                    <ControlLabel>Comment</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={fields.commentText}
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