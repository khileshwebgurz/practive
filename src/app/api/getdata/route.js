import dbConnect from '../../../../lib/mongodb'; // Use dbConnect
import Post from '../../../../models/Post'; // Ensure this path and model name are correct

export async function GET(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch only 4 posts from the MongoDB collection
    const posts = await Post.find({}).limit(4).lean(); // Using .limit(4) to get only 4 posts

    // Return the data as JSON
    return new Response(JSON.stringify({ success: true, data: posts }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    // Handle any errors
    console.error('Error fetching data:', error); // Log error for debugging
    return new Response(JSON.stringify({ success: false, message: 'Failed to fetch data', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
