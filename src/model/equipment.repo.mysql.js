import pool from "./db.connect.js";

//read
export const getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM equipment")
    return rows;
}

export const getById = async id =>{
    const [rows] = await pool.query("SELECT * FROM equipment WHERE id=?", [id]);
    return rows[0] || null;
}


//create
export const create = async data =>{
    const {itemName, checkedOutBy,checkoutDate, returnDate, isReturned} = data;

        const [result] = await pool.query("INSERT INTO equipment (itemName, checkedOutBy, checkoutDate, returnDate, isReturned) VALUES (?,?,?, ?, ?)", [itemName, checkedOutBy,checkoutDate, returnDate, isReturned]);

        const id = result.insertId;
        const record = await getById(id);
        return record;
    }


//update
export const update = async (id,data) =>{
    const {itemName, checkedOutBy,checkoutDate, returnDate, isReturned} = data;

        const [result] = await pool.query("UPDATE equipment SET itemName=?, checkedOutBy=?, checkoutDate=?, returnDate=?, isReturned=? WHERE id=?", [itemName, checkedOutBy,checkoutDate, returnDate, isReturned, id]);


        if(result.affectedRows === 0) return null;
        const record = await getById(id);
        return record;
    }



//delete
export const remove = async id =>{
    const record = await getById(id);
    if(!record) return null;

    await pool.query("DELETE FROM equipment WHERE id =?", [id]);
    return record;
}