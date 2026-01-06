const express = require('express');
const { getRecipes,getRecipe,addRecipes,editRecipes,deleteRecipes,updateRecipePhoto,updateRecipeVideo,upload } = require('../controller/recipe');
const authMiddleware = require('../middleware/auth');
const router=express.Router();

// Optional auth middleware - allows both authenticated and unauthenticated requests
const optionalAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decoded.id;
            req.userEmail = decoded.email;
        }
        next();
    } catch (error) {
        // Continue without auth if token is invalid
        next();
    }
};

router.get("/",getRecipes);
router.get("/:id",getRecipe);
router.post("/", authMiddleware, addRecipes);
router.put("/:id", authMiddleware, editRecipes);
router.delete("/:id", authMiddleware, deleteRecipes);
router.patch("/:id/photo", optionalAuth, upload.single('photo'), updateRecipePhoto);
router.patch("/:id/video", optionalAuth, upload.single('video'), updateRecipeVideo);

module.exports=router;