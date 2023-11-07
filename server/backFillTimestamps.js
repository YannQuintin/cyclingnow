import mongoose from "mongoose";
import Post from "./models/Post.js"; // Adjust the path as needed
import dotenv from 'dotenv';
dotenv.config();

// MongoDB connection string from .env
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
    console.log(`Using collection: ${Post.collection.name}`);
    backFillTimestamps();
  })
  .catch((err) => console.log(err));

// Returns a random date up to the specified number of days in the past
function randomDateInPast(days) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * days));
  return date;
}
async function backFillTimestamps() {
  const posts = await Post.find({ createdAt: { $exists: false } });

  for (const post of posts) {
    const createdAt = randomDateInPast(365);

    try {
      // Use the MongoDB driver directly to bypass Mongoose's automatic timestamp handling
      const result = await Post.collection.updateOne(
        { _id: post._id },
        { $set: { createdAt: createdAt } }
      );

      // Log the change
      if (result.modifiedCount === 1) {
        console.log(`Post ID: ${post._id} - Forced createdAt set to: ${createdAt.toISOString()}`);
      } else {
        console.log(`Post ID: ${post._id} - No changes made.`);
      }
    } catch (error) {
      console.error(`Error forcibly updating post ID: ${post._id}: ${error}`);
    }
  }
// async function backFillTimestamps() {
//   // Find all posts without createdAt timestamps
//   const posts = await Post.find({ createdAt: { $exists: false } });

//   for (const post of posts) {
//     const createdAt = randomDateInPast(365); // Generate a random past date for createdAt

//     try {
//       // Fetch the entire document
//       const postDocument = await Post.findById(post._id);
//       if (postDocument) {
//         // Change the createdAt field
//         postDocument.createdAt = createdAt;
        
//         // Save the document, which should trigger Mongoose's save middleware
//         const savedDocument = await postDocument.save();
    
//         // Log the change
//         console.log(`Post ID: ${post._id} - createdAt set to: ${createdAt.toISOString()}`);
//       } else {
//         console.log(`Post ID: ${post._id} - Document not found.`);
//       }
//     } catch (error) {
//       console.error(`Error updating post ID: ${post._id}: ${error}`);
//     }

  //   // Update the post with the new timestamp
  //   try {
  //     const result = await Post.updateOne({ _id: post._id }, { $set: { createdAt } });
  //     if (result.modifiedCount === 1) {
  //       console.log(`Post ID: ${post._id} - createdAt set to: ${createdAt.toISOString()}`);
  //     } else {
  //       console.log(`Post ID: ${post._id} - No changes made.`);
  //     }
  //   } catch (error) {
  //     console.log(`Error updating post ID: ${post._id}: ${error.message}`);
  //   }


  console.log(`Total posts updated: ${posts.length}`);
  mongoose.disconnect();
}

backFillTimestamps().catch((error) => {
  console.error("An error occurred:", error.stack);
  mongoose.disconnect();
});
