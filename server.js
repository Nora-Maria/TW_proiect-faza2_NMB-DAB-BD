const express = require("express")
const Sequelize = require("sequelize")

const app = express()

// app.use('/', express.static('public'))

const sequelize = new Sequelize('biblioteca', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
});


const Users = sequelize.define('users', {
    id_user: Sequelize.INTEGER,
    userName: Sequelize.STRING,
    parola: Sequelize.STRING,
    nume: Sequelize.STRING,
    prenume: Sequelize.STRING
});

const User_preferences = sequelize.define('user_preferences',{
    id_user: Sequelize.INTEGER,
    gen_preferat: Sequelize.STRING,
    autor_preferat: Sequelize.STRING
});

const Reviews = sequelize.define('reviews',{
    id_user: Sequelize.INTEGER,
    id_carte: Sequelize.INTEGER,
    recenzie: Sequelize.STRING
})

const Best_seller = sequelize.define('best_sellers',{
    id_autor: Sequelize.INTEGER,
    id_best_seller: Sequelize.INTEGER,
    nume_best_seller: Sequelize.STRING
})

app.use(express.json())
app.use(express.urlencoded())

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

//-------------------------------------------------------------------------------
//BEST SELLERS:

app.get('/best_sellers', (request, response) => {
    Best_seller.findAll().then((best_sellers)=>{
        response.status(200).json(best_sellers)
    })
})

app.get('/best_sellers/:id', (request, response) => {
    Best_seller.findById(request.params.id).then((best_sellers) => {
        if(best_sellers) {
            response.status(200).json(best_sellers)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.post('/best_sellers', (request, response) => {
    Best_seller.create(request.body).then((best_sellers)=>{
        response.status(201).json(best_sellers)
    })
})

app.put('/best_sellers/:id', (request, response) => {
    Best_seller.findById(request.params.id).then((best_sellers) => {
        if(best_sellers) {
            best_sellers.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
app.delete('/best_sellers/:id', (request, response) => {
    Best_seller.findById(request.params.id).then((best_sellers) => {
        if(best_sellers) {
            best_sellers.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//-------------------------------------------------------------------------
//REVIEWS :



app.get('/reviews', (request, response) => {
    Reviews.findAll().then((reviews)=>{
        response.status(200).json(reviews)
    })
})
app.get('/reviews/:id', (request, response) => {
    Reviews.findById(request.params.id).then((reviews) => {
        if(reviews) {
            response.status(200).json(reviews)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.post('/reviews', (request, response) => {
    Reviews.create(request.body).then((reviews)=>{
        response.status(201).json(reviews)
    })
})
app.put('/reviews/:id', (request, response) => {
    Reviews.findById(request.params.id).then((reviews) => {
        if(reviews) {
            reviews.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/reviews/:id', (request, response) => {
    Reviews.findById(request.params.id).then((reviews) => {
        if(reviews) {
            reviews.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//------------------------------------
//User preferences:

app.get('/user_preferences', (request, response) => {
    User_preferences.findAll().then((user_preferences)=>{
        response.status(200).json(user_preferences)
    })
})

app.get('/user_preferences/:id', (request, response) => {
    User_preferences.findById(request.params.id).then((user_preferences) => {
        if(user_preferences) {
            response.status(200).json(user_preferences)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.post('/user_preferences', (request, response) => {
    User_preferences.create(request.body).then((user_preferences)=>{
        response.status(201).json(user_preferences)
    })
})
app.put('/user_preferences/:id', (request, response) => {
    User_preferences.findById(request.params.id).then((user_preferences) => {
        if(user_preferences) {
            user_preferences.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/user_preferences/:id', (request, response) => {
    User_preferences.findById(request.params.id).then((user_preferences) => {
        if(user_preferences) {
            user_preferences.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//--------------------------------------------------------
//USERS: 

app.get('/users', (request, response) => {
    Users.findAll().then((users)=>{
        response.status(200).json(users)
    })
})
app.get('/users/:id', (request, response) => {
    Users.findById(request.params.id).then((users) => {
        if(users) {
            response.status(200).json(users)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
app.post('/users', (request, response) => {
    Users.create(request.body).then((users)=>{
        response.status(201).json(users)
    })
})
app.put('/users/:id', (request, response) => {
    Users.findById(request.params.id).then((users) => {
        if(users) {
            users.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/users/:id', (request, response) => {
    Users.findById(request.params.id).then((users) => {
        if(users) {
            users.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//-----------------------------



app.listen(8080)