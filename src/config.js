export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "eu-central-1",
        BUCKET: "eu-central-1-sporttrip"
    },
    apiGateway: {
        REGION: "eu-central-1",
        URL: "https://kulm9qtnnl.execute-api.eu-central-1.amazonaws.com/default"
    },
    cognito: {
        REGION: "eu-central-1",
        USER_POOL_ID: "eu-central-1_d51R1I3L7",
        APP_CLIENT_ID: "6unjtjuvsi6995msekqq91t39v",
        IDENTITY_POOL_ID: "eu-central-1:5c58f96f-2ff5-4f23-821f-dd232dce4deb"
    }
};
