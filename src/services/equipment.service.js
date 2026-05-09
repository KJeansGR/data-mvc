import pool from '../model/db.connect.js';
import * as repo from './../model/equipment.repo.mysql.js';

export const getAll = async () => await repo.getAll();
export const getById = async id => await repo.getById(id);


export const create = async data => {
    const insertRecord = {
        ...data,
        isReturned: false,
        returnData: null
    };
    return await repo.create(insertRecord);
};


export const update = async (id,data) => {
    const {isReturned, returnDate, checkoutDate} = data;

    if(isReturned === true && !returnDate){
        throw new Error("returned items must have a reurn date");
    }
        // Fix checkoutDate format for MySQL DATE column
    if (checkoutDate) {
        data.checkoutDate = new Date(checkoutDate)
            .toISOString()
            .split("T")[0];
    }

    // Fix returnDate format too if needed
    if (returnDate) {
        data.returnDate = new Date(returnDate)
            .toISOString()
            .split("T")[0];
    }
    return await repo.update(id, data);
};
export const remove = id => repo.remove(id);