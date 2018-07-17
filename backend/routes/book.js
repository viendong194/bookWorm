import express from 'express'
const router = express.Router();
router.get('/search',(req,res)=>{
  res.json({
    book:[
      {
        goodreadsId:3,
        title:'Build a real app by js',
        author:'Owel',
        covers:[

        ],
        pages:'198'
      },
      {
        goodreadsId:1,
        title:'How to learn Node',
        author:'Owel',
        covers:[

        ],
        pages:'198'
      }
    ]
  })
})

export default router