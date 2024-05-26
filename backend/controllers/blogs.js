const cloudinary = require("cloudinary");
const expressAsyncHandler = require("express-async-handler");
const db = require("../db");

const blogPost = expressAsyncHandler(async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400);
    throw new Error("Blog Main Image is Mandatory!");
  }
  const { main_image, para_one_image, para_two_image } = req.files;
  if (!main_image) {
    res.status(400);
    throw new Error("Blog Main Image is Mandatory!");
  }
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
  if (
    !allowedFormats.includes(main_image.mimetype) ||
    (para_one_image && !allowedFormats.includes(para_one_image.mimetype)) ||
    (para_two_image && !allowedFormats.includes(para_two_image.mimetype))
  ) {
    res.status(400);
    throw new Error(
      "Invalid File type.Only JPEG,PNG and WEBP are allowed Formats!"
    );
  }

  const {
    title,
    intro,
    para_one_title,
    para_one_desc,
    para_two_title,
    para_two_desc,
    category,
  } = req.body;
  let { publish } = req.body;
  if (!publish) {
    publish = false;
  }

  const createdBy = req.user.user_id;
  const author_name = req.user.name;
  const author_avatar = req.user.avatar_url;

  if (!title || !intro || !category) {
    res.status(400);
    throw new Error("Fill Mandatory Fields");
  }
  const uploadPromises = [
    cloudinary.uploader.upload(main_image.tempFilePath),
    para_one_image
      ? cloudinary.uploader.upload(para_one_image.tempFilePath)
      : Promise.resolve(null),
    para_two_image
      ? cloudinary.uploader.upload(para_two_image.tempFilePath)
      : Promise.resolve(null),
  ];

  const [mainImageRes, paraOneRes, paraTwoRes] = await Promise.all(
    uploadPromises
  );
  if (
    !mainImageRes ||
    mainImageRes.error ||
    (para_one_image && (!paraOneRes || paraOneRes.error)) ||
    (para_two_image && (!paraTwoRes || paraTwoRes.error))
  ) {
    res.status(500);
    throw new Error("Image Uploading Error");
  }

  const blogData = {
    title: title,
    intro: intro,
    para_one_title: para_one_title,
    para_one_desc: para_one_desc,
    para_two_title: para_two_title,
    para_two_desc: para_two_desc,
    category: category,
    createdBy: createdBy,
    author_name: author_name,
    author_avatar: author_avatar,
    main_image_url: mainImageRes.secure_url,
    publish,
    main_image_id: mainImageRes.public_id,
  };
  if (paraOneRes) {
    blogData.para_one_image_url = paraOneRes.secure_url;
    blogData.para_one_image_id = paraOneRes.public_id;
  }
  if (paraTwoRes) {
    blogData.para_two_image_url = paraTwoRes.secure_url;
    blogData.para_two_image_id = paraTwoRes.public_id;
  }

  const { rows } = await db.query(
    "INSERT INTO blogs(title,intro,main_image_url,para_one_title,para_one_desc,para_one_image_url,para_two_title,para_two_desc,para_two_image_url,category,createdBy,author_name,author_avatar,publish,main_image_id,para_one_image_id,para_two_image_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *",
    [
      blogData.title,
      blogData.intro,
      blogData.main_image_url,
      blogData.para_one_title,
      blogData.para_one_desc,
      blogData.para_one_image_url,
      blogData.para_two_title,
      blogData.para_two_desc,
      blogData.para_two_image_url,
      blogData.category,
      blogData.createdBy,
      blogData.author_name,
      blogData.author_avatar,
      blogData.publish,
      blogData.main_image_id,
      blogData.para_one_image_id,
      blogData.para_two_image_id,
    ]
  );

  res.status(201).json({
    success: true,
    message: "Blog uploaded!",
    blog: rows[0],
  });
});

const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT * FROM blogs WHERE blog_id = $1 ", [
    id,
  ]);
  const { user_id } = req.user;

  if (rows.length === 0) {
    res.status(400);
    throw new Error("Blog not found!");
  }

  if (user_id !== rows[0].createdby) {
    res.status(403);
    throw new Error("Access Denied");
  }

  const { main_image_id, para_one_image_id, para_two_image_id } = rows[0];
  await cloudinary.uploader.destroy(main_image_id);
  para_one_image_id && (await cloudinary.uploader.destroy(para_one_image_id));
  para_two_image_id && (await cloudinary.uploader.destroy(para_two_image_id));
  await db.query("DELETE FROM blogs WHERE blog_id = $1", [id]);

  res.status(200).json({
    success: true,
    message: "Blog deleted!",
  });
});

const getAllBlogs = expressAsyncHandler(async (req, res) => {
  const { rows } = await db.query("SELECT * FROM blogs WHERE publish = $1", [
    true,
  ]);
  res.status(200).json({
    success: true,
    blogs: rows,
  });
});

const getSingleBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [
    id,
  ]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error("Blog is not found!");
  }
  res.status(200).json({
    success: true,
    blog: rows[0],
  });
});

const getAllMyBlogs = expressAsyncHandler(async (req, res) => {
  const createdBy = req.user.user_id;
  const { rows } = await db.query("SELECT * FROM blogs WHERE createdBy = $1", [
    createdBy,
  ]);
  res.status(200).json({
    success: true,
    blogs: rows,
  });
});

const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user;
  const { rows } = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [
    id,
  ]);
  if (rows.length === 0) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  if (user_id !== rows[0].createdby) {
    res.status(403);
    throw new Error("Access Denied");
  }

  const newBlogData = {
    title: req.body.title,
    intro: req.body.intro,
    category: req.body.category,
    para_one_title: req.body.para_one_title,
    para_two_title: req.body.para_two_title,
    para_one_desc: req.body.para_one_desc,
    para_two_desc: req.body.para_two_desc,
    publish: req.body.publish,
    
  };

  if (req.files) {
    const { main_image, para_one_image, para_two_image } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/wbep"];
    if (
      (main_image && !allowedFormats.includes(main_image.mimetype)) ||
      (para_one_image && !allowedFormats.includes(para_one_image.mimetype)) ||
      (para_two_image && !allowedFormats.includes(para_two_image.mimetype))
    ) {
      res.status(400);
      throw new Error("Please Upload Images only in Format JPEG,PNG,WBEP");
    }

    if (req.files && main_image) {
      const { main_image_id } = rows[0];
      await cloudinary.uploader.destroy(main_image_id);
      const newMainImage = await cloudinary.uploader.upload(
        main_image.tempFilePath
      );
      newBlogData.main_image_url = newMainImage.secure_url;
      newBlogData.main_image_id = newMainImage.public_id;
    }

    if (req.files && para_one_image) {
      if (rows[0].para_one_image_url) {
        const { para_one_image_id } = rows[0];
        await cloudinary.uploader.destroy(para_one_image_id);
        const newParaOneImage = await cloudinary.uploader.upload(
          para_one_image.tempFilePath
        );
        newBlogData.para_one_image_url = newParaOneImage.secure_url;
        newBlogData.para_one_image_id = newParaOneImage.public_id;
      }
    }
    if (req.files && para_two_image) {
      if (rows[0].para_two_image_url) {
        const { para_two_image_id } = rows[0];
        await cloudinary.uploader.destroy(para_two_image_id);
        const newParaTwoImage = await cloudinary.uploader.upload(
          para_two_image.tempFilePath
        );
        newBlogData.para_two_image_url = newParaTwoImage.secure_url;
        newBlogData.para_two_image_id = newParaTwoImage.public_id;
      }
    }
  }


  if (newBlogData.title) {
    await db.query("UPDATE blogs SET title = $1 WHERE blog_id = $2", [
      newBlogData.title,
      id,
    ]);
  }

  if (newBlogData.intro) {
    await db.query("UPDATE blogs SET intro = $1 WHERE blog_id = $2", [
      newBlogData.intro,
      id,
    ]);
  }

  if (newBlogData.category) {
    await db.query("UPDATE blogs SET category = $1 WHERE blog_id = $2", [
      newBlogData.category,
      id,
    ]);
  }

  if (newBlogData.para_one_title) {
    await db.query("UPDATE blogs SET para_one_title = $1 WHERE blog_id = $2", [
      newBlogData.para_one_title,
      id,
    ]);
  }

  if (newBlogData.para_one_desc) {
    await db.query("UPDATE blogs SET para_one_desc = $1 WHERE blog_id = $2", [
      newBlogData.para_one_desc,
      id,
    ]);
  }

  if (newBlogData.para_two_title) {
    await db.query("UPDATE blogs SET para_two_title = $1 WHERE blog_id = $2", [
      newBlogData.para_two_title,
      id,
    ]);
  }

  if (newBlogData.para_two_desc) {
    await db.query("UPDATE blogs SET para_two_desc = $1 WHERE blog_id = $2", [
      newBlogData.para_two_desc,
      id,
    ]);
  }

  if (newBlogData.publish) {
    await db.query("UPDATE blogs SET publish = $1 WHERE blog_id = $2", [
      newBlogData.publish,
      id,
    ]);
  }
  if (newBlogData.main_image_url) {
    await db.query(
      "UPDATE blogs SET main_image_url = $1,main_image_id = $2 WHERE blog_id = $3",
      [newBlogData.main_image_url, newBlogData.main_image_id, id]
    );
  }
  if (newBlogData.para_two_image_url) {
    await db.query(
      "UPDATE blogs SET para_two_image_url = $1,para_two_image_id = $2 WHERE blog_id = $3",
      [newBlogData.para_two_image_url, newBlogData.para_two_image_id, id]
    );
  }
  if (newBlogData.para_one_image_url) {
    await db.query(
      "UPDATE blogs SET para_one_image_url = $1,para_one_image_id = $2 WHERE blog_id = $3",
      [newBlogData.para_one_image_url, newBlogData.para_one_image_id, id]
    );
  }

  const newBlog = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [
    id,
  ]);

  res.status(201).json({
    success: true,
    message: "Blog updated!",
    blog: newBlog.rows[0],
  });
});
module.exports = {
  blogPost,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getAllMyBlogs,
  updateBlog,
};
