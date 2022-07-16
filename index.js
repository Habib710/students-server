const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3300
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

// midelware...
app.use(cors())
app.use(express.json())

// SsWMDjJ3cxZKA9j3

const uri =
  'mongodb+srv://students:SsWMDjJ3cxZKA9j3@cluster0.fn5os.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    await client.connect()
    const mycollection = client.db('students').collection('data-student')

    // get all.........

    app.get('/students', async (req, res) => {
      const query = {}
      const cursor = mycollection.find(query)
      const allstudent = await cursor.toArray()
      res.send(allstudent)
    })

    //  get one with id.................

    app.get('/students/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const student = await mycollection.findOne(query)
      res.send(student)
    })

    // delete  one with id ..............................

    app.delete('/students/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const student = await mycollection.deleteOne(query)
      res.send(student)
    })

    //   post  or add new ................

    app.post('/students', async (req, res) => {
      const AddStudents = req.body

      const newstudent = await mycollection.insertOne(AddStudents)
      res.send(newstudent)
    })

    // update.........................

    app.put('/students/:id', async (req, res) => {
      const id = req.params.id
      const updatestudent = req.body
      const query = { _id: ObjectId(id) }

      newstudent = {
        $set: {
          roll: updatestudent.Updated.updateRoll,
          clas: updatestudent.Updated.updateClass,
          result: updatestudent.Updated.updateResult,
          pic: updatestudent.Updated.updateURL,
        },
      }

      const update = await mycollection.updateMany(query, newstudent)
      res.send(update)
    })
  } finally {
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
