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
                    <title>KitaBisa FE test</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta name="title" content="Kitabisa.com - Situs Donasi Terbesar dan Terpercaya di Indonesia" />
                    <meta name="keywords" content="Donasi, Sedekah, Zakat, Infaq, Tolong, Menolong, Kitabisa, Maal, Penghasilan, Donasi Online, Zakat Online, Wakaf" />
                    <meta name="description" content="Situs donasi dan menggalang dana (fundraising) untuk inisiatif, campaign dan program sosial. Mari bergotong royong membangun Indonesia!" />
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