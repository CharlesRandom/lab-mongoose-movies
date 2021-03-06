const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')

//List Celebrities
router.get('/',(req, res, next)=>{
  Movie.find()
    .then(movies=>{
      res.render('movies/list',{movies})
    }).catch(e=>{
      next(e)
    })
})

router.get('/detail/:id',(req, res, next)=>{
  const {id} = req.params
  Movie.findById(id)
    .then(movie=>{
      res.render('movies/detail',movie)
    }).catch(e=>{
      next(e)
    })
})

//Create Movies
router.get('/new',(req, res)=>{
  const action = '/movies/new'
  res.render('movies/form',{action})
})

router.post('/new',(req, res)=>{
  Movie.create(req.body)
    .then(movie=>{
      res.redirect('/movies')
    }).catch(error=>{
      console.log(error)
      res.render('movies/form',{celebrity:req.body,error})
    })
})

//Delete Movies
router.get('/:id/delete',(req, res, next)=>{
  const {id} = req.params
  Movie.findById(id)
    .then(movie=>{
      res.render('movies/delete',movie)
    }).catch(e=>next(e))
})

router.post('/:id/delete',(req, res)=>{
  const {id} = req.params
  Movie.findByIdAndRemove(id)
    .then(movie=>{
      res.redirect('/movies')
    }).catch(e=>next(e))
})

//Update Movies
router.get('/:id/update',(req, res, next)=>{
  const {id} = req.params
  const action = `/movies/${id}/update`
  Movie.findById(id)
    .then(movie=>{
      res.render('movies/form',{movie,action})
    }).catch(e=>next(e))
})

router.post('/:id/update',(req, res, next)=>{
  const {id} = req.params
  Movie.findByIdAndUpdate(id,{$set:req.body},{new:true})
    .then(movie=>{
      res.redirect(`/movies/detail/${id}`)
    }).catch(error=>{
      res.render('movies/form',{movie:req.body,error})
    })
})

module.exports = router