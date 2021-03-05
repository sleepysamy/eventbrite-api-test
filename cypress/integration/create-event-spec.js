// npm install @bearer/node
const bearer = require("@bearer/node")

// Initialize the client
const client = bearer("app_d4c2cd092f7fb55b312dc013ee65f95b7eebe4926e7274c96f")

// Set up the Eventbrite Integration
const eventBrite = client.integration("eventbrite").auth('https://www.eventbriteapi.com/v3/users/me/?token=Y6N6SQYKOABOML362NTS')

function createEvent() {
    eventBrite
        .post("organizations/32749705357/events/", {
            body: {
                event: {
                    name: {
                        html: "Test Event"
                    },
                    start: {
                        timezone: "America/Los_Angeles",
                        utc: "2021-03-05T02:00:00Z"
                    },
                    end: {
                        timezone: "America/Los_Angeles",
                        utc: "2021-03-06T05:00:00Z"
                    },
                    currency: "CAD"
                }
            }
        })
        .then(({ data }) => {
            console.log(data)
            console.log('Event Created!')
        })
}

function createTicket() {
    eventBrite
        .post("/events/12345/ticket_classes/", {
            body: {
                ticket_class: {
                    name: "General Entry",
                    free: true,
                    quantity_total: 50
                }
            }
        })
        .then(({ data }) => console.log(data))
        .catch(console.error)
}

function publish() {
    eventBrite
        .post("events/12345/publish/")
        .then(({ data }) => console.log(data))
        .catch(console.error)
}

function updateEvent() {
    eventBrite
        .post("/events/12345/", {
            body: {
                event: {
                    capacity: 200
                }
            }
        })
        .then(({ data }) => {
            console.log(data)
            console.log('Event Updated!')
        })
}

describe('Create and update event on event brite', () => {
    it('Creating the event', () => {
        createEvent();
        createTicket();
        publish();
    })

    it('Updating the event', () => {
        updateEvent();
    })
})