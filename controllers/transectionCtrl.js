const transectionModel = require('../models/transectionModel');
const moment = require("moment");

const getAllTransection = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body;
        let dateFilter = {};

        // If not custom, use frequency to filter transactions by date
        if (frequency !== 'custom') {
            dateFilter = {
                date: {
                    $gt: moment().subtract(Number(frequency), "days").toDate(),
                },
            };
        } else {
            // If custom, use selectedDate range to filter transactions
            dateFilter = {
                date: {
                    $gte: new Date(selectedDate[0]),
                    $lte: new Date(selectedDate[1]),
                },
            };
        }

        const transections = await transectionModel.find({
            ...dateFilter,
            userid: req.body.userid,
            ...(type !== 'all' && {type}),
        });

        res.status(200).json(transections);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


const deleteTransection = async (req, res) => {
    try{
        await transectionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transection Deleted!!')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};

const editTransection = async (req, res) => {
    try{
        await transectionModel.findOneAndUpdate({_id:req.body.transactionId}, req.body.payload);
        res.status(200).send("editted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


const addTransection = async (req, res) => {
    try {
        const newTransection = new transectionModel(req.body);
        await newTransection.save();
        res.status(201).send("Transection Created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { getAllTransection, addTransection, editTransection, deleteTransection};
