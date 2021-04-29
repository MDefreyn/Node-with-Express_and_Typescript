import express from 'express'
import entityRoute from './routes/entityRoute'

const port = 3333
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

entityRoute(app)

app.get('/', (req, res) => res.json({ message: 'Sua landing page aqui!' }))


app.listen(port, () => console.log(`Server is running on port ${port}`));