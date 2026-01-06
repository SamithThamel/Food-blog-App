const Recipe=require('../models/recipe');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, './public/images/')
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, './public/videos/')
    } else {
      cb(new Error('Invalid file type'))
    }
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
}) 

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp|bmp/;
  const allowedVideoTypes = /mp4|avi|mov|wmv|flv|mkv|webm/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (mimetype.startsWith('image/') && allowedImageTypes.test(extname)) {
    return cb(null, true);
  } else if (mimetype.startsWith('video/') && allowedVideoTypes.test(extname)) {
    return cb(null, true);
  } else {
    console.log('File rejected:', file.originalname, file.mimetype);
    cb(new Error('Only image and video files are allowed'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit for videos
})

const getRecipes=async (req,res)=>{
    const recipes=await Recipe.find({});
    return res.json(recipes);
}

const getRecipe=async (req,res)=>{
    const {id}=req.params;
    const recipe=await Recipe.findById(id);
    return res.json(recipe);
}

const addRecipes=async (req,res)=>{
    const {title,ingredients,instructions,time,coverImage}=req.body;
    const userId = req.userId;

    if(!title || !ingredients || !instructions){
        return res.json({message:"Please provide all required fields"});
    }

    const newRecipe=await Recipe.create({
        title,
        ingredients,
        instructions,
        time,
        coverImage,
        userId
    });

    return res.json(newRecipe);

    
}

const editRecipes=async (req,res)=>{
    try{
        const updatedRecipe=await Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedRecipe){
            return res.status(404).json({message:"Recipe not found"});
        }
        return res.json(updatedRecipe);
    }catch(err){
        return res.status(500).json({message:"Error updating recipe", error:err.message});
    }
}

const deleteRecipes=(req,res)=>{
    res.json({message:"Recipe deleted"});
}

const updateRecipePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId; // May be undefined if not authenticated

        console.log('Updating photo for recipe:', id);
        console.log('User ID:', userId);
        console.log('File received:', req.file);

        // Check if file was uploaded
        if (!req.file) {
            console.log('No file received in request');
            return res.status(400).json({ message: "No image file provided" });
        }

        // Find the recipe
        const recipe = await Recipe.findById(id);
        
        if (!recipe) {
            console.log('Recipe not found:', id);
            // Delete uploaded file if recipe not found
            if (req.file) {
                const uploadedFilePath = path.join(__dirname, '..', 'public', 'images', req.file.filename);
                if (fs.existsSync(uploadedFilePath)) {
                    fs.unlinkSync(uploadedFilePath);
                }
            }
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Check if user owns this recipe (only if recipe has userId AND user is authenticated)
        if (recipe.userId && userId && recipe.userId.toString() !== userId) {
            console.log('User not authorized to update this recipe');
            // Delete uploaded file if not authorized
            if (req.file) {
                const uploadedFilePath = path.join(__dirname, '..', 'public', 'images', req.file.filename);
                if (fs.existsSync(uploadedFilePath)) {
                    fs.unlinkSync(uploadedFilePath);
                }
            }
            return res.status(403).json({ message: "You are not authorized to update this recipe" });
        }

        // Delete old image if exists
        if (recipe.coverImage) {
            const oldImagePath = path.join(__dirname, '..', 'public', 'images', path.basename(recipe.coverImage));
            console.log('Attempting to delete old image:', oldImagePath);
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath);
                    console.log('Old image deleted successfully');
                } catch (err) {
                    console.error('Error deleting old image:', err);
                }
            }
        }

        // Update recipe with new image path
        const imagePath = `/images/${req.file.filename}`;
        recipe.coverImage = imagePath;
        
        // Set userId if authenticated and not already set
        if (userId && !recipe.userId) {
            recipe.userId = userId;
        }
        
        await recipe.save();
        console.log('Recipe photo updated successfully');

        return res.status(200).json({ 
            message: "Recipe photo updated successfully", 
            recipe 
        });

    } catch (error) {
        console.error('Error in updateRecipePhoto:', error);
        // Clean up uploaded file on error
        if (req.file) {
            const uploadedFilePath = path.join(__dirname, '..', 'public', 'images', req.file.filename);
            if (fs.existsSync(uploadedFilePath)) {
                try {
                    fs.unlinkSync(uploadedFilePath);
                } catch (err) {
                    console.error('Error deleting uploaded file:', err);
                }
            }
        }
        return res.status(500).json({ 
            message: "Error updating recipe photo", 
            error: error.message 
        });
    }
};




const updateRecipeVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        console.log('Updating video for recipe:', id);
        console.log('User ID:', userId);
        console.log('File received:', req.file);

        if (!req.file) {
            console.log('No file received in request');
            return res.status(400).json({ message: "No video file provided" });
        }

        const recipe = await Recipe.findById(id);
        
        if (!recipe) {
            console.log('Recipe not found:', id);
            if (req.file) {
                const uploadedFilePath = path.join(__dirname, '..', 'public', 'videos', req.file.filename);
                if (fs.existsSync(uploadedFilePath)) {
                    fs.unlinkSync(uploadedFilePath);
                }
            }
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.userId && userId && recipe.userId.toString() !== userId) {
            console.log('User not authorized to update this recipe');
            if (req.file) {
                const uploadedFilePath = path.join(__dirname, '..', 'public', 'videos', req.file.filename);
                if (fs.existsSync(uploadedFilePath)) {
                    fs.unlinkSync(uploadedFilePath);
                }
            }
            return res.status(403).json({ message: "You are not authorized to update this recipe" });
        }

        if (recipe.videoUrl) {
            const oldVideoPath = path.join(__dirname, '..', 'public', 'videos', path.basename(recipe.videoUrl));
            console.log('Attempting to delete old video:', oldVideoPath);
            if (fs.existsSync(oldVideoPath)) {
                try {
                    fs.unlinkSync(oldVideoPath);
                    console.log('Old video deleted successfully');
                } catch (err) {
                    console.error('Error deleting old video:', err);
                }
            }
        }

        const videoPath = `/videos/${req.file.filename}`;
        recipe.videoUrl = videoPath;
        
        if (userId && !recipe.userId) {
            recipe.userId = userId;
        }
        
        await recipe.save();
        console.log('Recipe video updated successfully');

        return res.status(200).json({ 
            message: "Recipe video updated successfully", 
            recipe 
        });

    } catch (error) {
        console.error('Error in updateRecipeVideo:', error);
        if (req.file) {
            const uploadedFilePath = path.join(__dirname, '..', 'public', 'videos', req.file.filename);
            if (fs.existsSync(uploadedFilePath)) {
                try {
                    fs.unlinkSync(uploadedFilePath);
                } catch (err) {
                    console.error('Error deleting uploaded file:', err);
                }
            }
        }
        return res.status(500).json({ 
            message: "Error updating recipe video", 
            error: error.message 
        });
    }
};

module.exports={getRecipes,getRecipe,addRecipes,editRecipes,deleteRecipes,updateRecipePhoto,updateRecipeVideo,upload};