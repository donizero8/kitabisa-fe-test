import express from "express"
import cors from "cors"
import ReactDOM from "react-dom/server"
import * as React from 'react'
import App from '../shared/App'

import serialize from "serialize-javascript"
import proxy from 'express-http-proxy'
import { fetchCampaign } from '../shared/api'

const app = express()

app.use(cors())
app.use(express.static("dist"))

app.use('/api', proxy('https://storage.googleapis.com/',))

app.get("/", (req, res, next) => {
    fetchCampaign()
        .then(initialData => {
            const markup = ReactDOM.renderToString(
                <App context={initialData} />
            )
            res.send(`
                <!DOCTYPE html>
                <html>
                    <head>
                    <title>SSR with React Router</title>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <script src="/bundle.js" defer></script>
                    <script>
                        window.__INITIAL_DATA__ = ${serialize(initialData)}
                    </script>
                    </head>
            
                    <body>
                    <div id="app">${markup}</div>
                    </body>
                </html>
                `)
        })
})
app.get("/:title", (req, res, next) => {
    fetchCampaign().then(initialData => {

        let arrayCampaign = initialData.data.filter((campaign) => {
            return campaign.short_url === req.params.title
        })

        res.send(arrayCampaign)
    })

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})