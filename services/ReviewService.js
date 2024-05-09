const mongoose = require('mongoose');
let Reviews = require('./../model/Review');
let Movies = require('./../model/Movie');
const {movieExists} = require("./ReviewService");

const getAllReview = async () => {
    //return Reviews.find().populate('movie');
    return Reviews.find();
}
const getReviewById = async (reviewId) => {
    return Reviews.findById(reviewId).populate("movie");
}
const getReviewByMovieId = async (movieId) => {
    return Reviews.find({movie: movieId}).populate("movie");
}


const saveReview = async (review1) => {
    try {
        const {movie, rating, review} = review1;


        // Validate movieId before using it
        if (!mongoose.Types.ObjectId.isValid(movie)) {
            throw new Error('Invalid movieId');
        }

        // Check if the movie exists
        /*const movieExists = await Movies.findById(movie);
        if (!movieExists) {
            throw new Error('User Not Found');
        }*/

        let newReview = new Reviews({
            movie,
            rating,
            review,
        });

        // Save the new review and await the result
        const savedReview = await newReview.save();

        //return savedReview;
        return newReview.populate('movie');

    } catch (e) {
        throw new Error(e.message);
    }
}

const updateReview = async (reviewId, review) => {

    try {
        // Validate movieId before using it
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            throw new Error('Invalid movieId');
        }

        // review.movie = mongoose.Types.ObjectId(review.movie);
        //console.log('Review Id ',reviewId, ' Review ',review);
        const updatedReview = await Reviews.findByIdAndUpdate(reviewId, review, {new: true});
        return updatedReview.populate("movie");
    } catch (e) {
        throw new Error(e.message);
    }

}
    const deleteReview = async (reviewId) => {
        const deletedReview = await Reviews.findByIdAndDelete(reviewId);
        return deletedReview;
    }
    module.exports = {
        getAllReview,
        getReviewById,
        saveReview,
        getReviewByMovieId,
        updateReview,
        deleteReview,

    }