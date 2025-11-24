import express from "express"
const app = express()

const port = 8000
app.use(express.json())

app.listen(port, () => {
    console.log(`server is running at port ${port}..`)
})

let tea_data = []
let nextid = 1

// CREATE
app.post('/Data', (req, res) => {
    const { name, price } = req.body
    const newtea = { id: nextid++, name, price }
    tea_data.push(newtea)
    res.status(200).send(newtea)
})

// READ BY ID
app.get('/Datas/:id', (req, res) => {
    const tea = tea_data.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send("Tea Not found")
    }

    res.status(200).send(tea)
})

// UPDATE
app.put('/teas/:id', (req, res) => {
    const tea = tea_data.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send("Tea Not found")
    }

    const { name, price } = req.body
    tea.name = name
    tea.price = price

    res.status(200).send(tea)
})

// DELETE
app.delete('/delete/:id', (req, res) => {
    const index = tea_data.findIndex(t => t.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).send("Tea not found")
    }

    tea_data.splice(index, 1)
    res.status(200).send("Successfully Deleted")
})
