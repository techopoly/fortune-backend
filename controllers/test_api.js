exports.test_api = (req, res, next) => {
    res.status(200).json([{
        post: "this is the first post",
        content: 'first time is always amazing and you are bouged with details'
    },
    {
        post: "this is the second time",
        content: "2nd time you know a lot and you know that a lot of your assumptions you created at the first time are not true."
    }
    ])

}


exports.createPost = (req, res, next) => {
    //create post in db
    const post = {
        title: req.body.title,
        content: req.body.content
    }
    res.status(201).json({  //201: success with resource created
        message: "post is created",
        post : post
    })
}