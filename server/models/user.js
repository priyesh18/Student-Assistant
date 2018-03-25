var User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    }
});