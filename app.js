import express from "express"

import { getAllNotes, getNote, AddNotes, UpdateNoteContent, UpdateNoteTitle, DeleteNote } from "./func.js"
import { ErrorHandler } from "./errorHandler/error.js"

const app = express()
const port = 3000


app.use(express.json())


app.get('/', async (req, res)=> { 


    res.json({data: "Welcome to the jobs Api"})


})

//GET ALL NOTES
app.get("/api", async (req, res)=> {
    const rows = await getAllNotes()

    res.json(rows)
})


//GET PARTICULAR NOTES 
app.get("/api/:id", async (req, res)=> {
    const row = await getNote(req.params.id)

    res.status(200).json(row)
})

//ADD A NOTES
app.post('/api', async (req, res) => {
    try{
        const {title, content} =  req.body

        const result = await AddNotes(title, content)

        res.status(200).json(result)
    }catch(e){
        res.send({data: "Tilte already taken!"})
    }

})


//UPDATE NOTE TITLE
app.patch("/api/update_title/:id", async (req, res)=> {
    try{
        const {title} =  req.body
        const result = await UpdateNoteTitle(req.params.id, title)
        res.status(200).json(result)
    }
    catch(e){
        res.status(500).send({data: "Error occured when updating"})
    }
})



//UPDATE NOTE CONTENT
app.patch("/api/update_content/:id", async (req, res)=> {
    try{
        const {content} =  req.body
        const result = await UpdateNoteContent(req.params.id, content)
        res.status(200).json(result)
    }
    catch(e){
        res.status(500).send({data: "Error occured when updating"})
    }
})


//DELETE NOTE
app.delete("/api/:id", async (req, res)=>{
    
    await DeleteNote(req.params.id)

    res.sendStatus(200)

})




//Error Handler
app.use(ErrorHandler)



app.listen(port, () => console.log(`App listening on port ${port}!`))