// "use strict";
// const nodemailer = require("nodemailer");
// const cron = require("node-cron");
// const mongoose = require('mongoose');
// const AddtaskModel = require('./models/addtask');
// const connectDB = require('./db');

// connectDB();

// // Email notification function
// async function notifyAdmin(task, email) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: "swenagarajan2004@gmail.com",
//             pass: "afhe ejnj fyjq tolb", // App Password
//         },
//     });

//     const info = await transporter.sendMail({
//         from: 'swenagarajan2004@gmail.com',
//         to: email,
//         subject: "Task Notification",
//         text: `Reminder: Task ${task.task} is scheduled for today (${task.date}).`,
//     });

//     console.log("Message sent: %s", info.messageId);
// }

// // Function to check for tasks due today
// async function checkTasks() {
//     const today = new Date().toISOString().split('T')[0];
//     console.log(`Checking tasks for today: ${today}`);

//     try {
//         const tasks = await AddtaskModel.find({ date: today, notified: false });
//         console.log(`Tasks found: ${tasks.length}`);

//         for (let task of tasks) {
//             console.log(`Notifying for task: ${task.task} on ${task.date}`);
//             await notifyAdmin(task, "swetha.n2022cse@sece.ac.in"); // replace this email with the actual email from login when appropriate

//             // Mark the task as notified
//             task.notified = true;
//             await task.save();
//         }
//     } catch (error) {
//         console.error("Error fetching tasks:", error);
//     }
// }

// // Export both functions
// module.exports = { notifyAdmin, checkTasks };
