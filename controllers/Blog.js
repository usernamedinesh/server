const BlogPost = require('../model/BlogPost');

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const message =
      !title ? "Title is missing" :
        !content ? "Content is missing" :
          "Title and content are missing";

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: message,
      });
    }
    const newPost = await BlogPost.create({
      title,
      content
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog post' });
  }
};



// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();

    if (posts.length === 0) {
      return res.status(200).json({ message: 'No projects' });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving blog posts' });
  }
};

//single blog with id 
exports.getBlogPostById = async (req, res) => {
  const  id  = req.params.id; // Get the ID from the URL parameters

  try {
    const post = await BlogPost.findById(id); // Find the blog post by its ID

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the blog post' });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedPost = await BlogPost.findByIdAndDelete(_id);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blog post' });
  }
};



//blog titles
// exports.getAllBlogTitile = async (req, res)  =>{
//   try {
//     const titles = await BlogPost.find({}, 'title').sort({ createdAt: -1 }); // Fetch only titles and sort by creation date
//     res.status(200).json(titles);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// }
// exports.getAllBlogTitile = async (req, res) => {
//   try {
//     const titles = await BlogPost.find().select('title');
//     res.json(titles);
//   } catch (error) {
//     console.error('Error fetching blog titles:', error);
//     res.status(500).json({ error: 'An error occurred while fetching blog titles' });
//   }
// };


// Fetch blog by title
exports.fetchBlogByTitle = async (req, res) => {
  const title = req.query.title;
  try {
    const blog = await BlogPost.findOne({ title });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error(`Error fetching blog for title ${title}:`, error);
    res.status(500).json({ error: 'An error occurred while fetching blog by title' });
  }
};



//Search for matching title
exports.searchMatchingTitles = async (req, res) => {
  const searchTerm = req.query.term;
  try {
    const matchingTitles = await BlogPost.find({ title: { $regex: searchTerm, $options: 'i' } });
    res.json(matchingTitles.map(blog => blog.title));
  } catch (error) {
    console.error('Error searching for matching titles:', error);
    res.status(500).json({ error: 'An error occurred while searching for matching titles' });
  }
};

// Update a blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const {  title, content } = req.body;
    const id = req.params.blogId

    if (!id) {
      return res.status(400).json({
        success: false,
        message: '_id is required',
      });
    }

    const updatedData = {
      title: title,
      content: content,
    };

    if (!title && !content) {
      return res.status(400).json({
        success: false,
        message: 'Provide necessary details',
      });
    }

    const query = { _id: id };
    const options = { new: true };

    const updatedPost = await BlogPost.findOneAndUpdate(query, updatedData, options);

    if (!updatedPost) {
      return res.status(404).json({ error: 'Blog post not found or no updates provided' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog post' });
  }
};



// Fetch the latest single blog post(s)
exports.getSingleBlogPost = async (req, res) => {
  try {
    const latestPost = await BlogPost.findOne()
      .sort({ createdAt: -1 })
      .limit(1);

    res.status(200).json(latestPost);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching most recent blog post' });
  }
};