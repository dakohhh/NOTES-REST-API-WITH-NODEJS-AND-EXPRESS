import { pool } from "./config/databse.js"



export async function getAllNotes(){
    let [rows] = await pool.query("SELECT * FROM notes")

    return rows[0]
}



export async function getNote(nodeid){
    try{
        let [rows] = await pool.query("SELECT * FROM notes WHERE id=?", [nodeid])
        return rows[0]
    }
    catch (e){throw e}
}

export async function AddNotes(title, content){
    try{
        const  result  = await pool.query("INSERT INTO notes(title, content) VALUES(?,?)", [title, content])

        return getNote(result[0].insertId)


    }
    catch (e){throw e}
}


export async function UpdateNoteContent(noteid, content){
    try{
        await pool.query("UPDATE notes SET content=? WHERE id=?", [content, noteid])

        return getNote(noteid)
    }
    catch (e){throw e}
}


export async function UpdateNoteTitle(noteid, title){
    try{
        await pool.query("UPDATE notes SET title=? WHERE id=?", [title, noteid])
        return getNote(noteid)

    }
    catch (e){throw e}
}

export async function DeleteNote(noteid){
    try{
        await pool.query("DELETE FROM notes WHERE id=?", [noteid])
    }
    catch (e){throw e}
}



