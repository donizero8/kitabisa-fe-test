import fetch from 'isomorphic-fetch'

export function fetchCampaign() {
    const encodedURI = encodeURI("http://localhost:3000/api/southern-waters-642.appspot.com/fe_code_challenge/campaign.json")

    return fetch(encodedURI)
        .then((data) => data.json())
        .catch((error) => {
            console.warn(error)
            return null
        });
}