"use strict";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const bodyParser = require('body-parser');
const PetcareModel = require('./models/petcare');
const ProductModel = require('./models/products');
const AddtaskModel = require('./models/addtask');
const CartModel = require('./models/cart');
const ContactModel = require('./models/contact');
const bcrypt = require('bcrypt');
const connectDB = require('./db');

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Email notification function
async function notifyAdmin(task, email) {
    if (!email) {
        console.error("No email provided for notification");
        return;
    }
    console.log(`Sending email to: ${email}`);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "swenagarajan2004@gmail.com",
            pass: "rjms pvsd mdem uvpj", // App Password
        },
    });

    const info = await transporter.sendMail({
        from: 'swenagarajan2004@gmail.com',
        to: email,
        subject: "Task Notification",
        text: `Reminder: Task ${task.task} is scheduled for today (${task.date}).`,
    });

    console.log("Message sent: %s", info.messageId);
}

// Function to check for tasks due today
async function checkTasks() {
    const today = new Date().toISOString().split('T')[0];
    console.log(`Checking tasks for today: ${today}`);

    try {
        const tasks = await AddtaskModel.find({ date: today, notified: false });
        console.log(`Tasks found: ${tasks.length}`);

        for (let task of tasks) {
            console.log(`Notifying for task: ${task.task} on ${task.date} for email ${task.userEmail}`);
            await notifyAdmin(task, task.userEmail);

            // Mark the task as notified
            task.notified = true;
            await task.save();
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await PetcareModel.findOne({ email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.json({ status: "success", email: user.email });
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("No record existed");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    PetcareModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            bcrypt.hash(password, 10)
                .then(hash => {
                    PetcareModel.create({ email, password: hash })
                        .then(newUser => res.json(newUser))
                        .catch(err => {
                            console.log(err.message);
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                })
                .catch(err => {
                    console.log(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/addtask', (req, res) => {
    console.log(req.body);
    AddtaskModel.create(req.body)
        .then(addtasks => res.json(addtasks))
        .catch(err => res.json(err));
});

app.get('/showtask', async (req, res) => {
    try {
        const tasks = await AddtaskModel.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/deleteTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await AddtaskModel.findByIdAndDelete(taskId);
        res.json({ message: "Task deleted successfully", deletedTaskId: taskId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/cart', (req, res) => {
    const { imageUrl, description, price } = req.body;

    const newCartItem = new CartModel({ imageUrl, description, price });

    newCartItem.save()
        .then(item => res.status(201).json(item))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/getcart', async (req, res) => {
    try {
        const carts = await CartModel.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/deletecart/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        await CartModel.findByIdAndDelete(cartId);
        res.json({ message: "Cart item deleted successfully", deletedCartId: cartId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/contact', (req, res) => {
    console.log('Request received:', req.body);
    ContactModel.create(req.body)
        .then(contact => {
            console.log('Contact saved:', contact);
            res.json(contact);
        })
        .catch(err => {
            console.error('Error saving contact:', err);
            res.status(500).json({ error: "An error occurred while saving the contact." });
        });
});



app.listen(7000, () => {
    console.log("Server is running on port 7000");
});

// Schedule the checkTasks function to run every minute for testing
cron.schedule('* * * * *', () => {
    console.log('Running the task check every minute');
    checkTasks();
});
