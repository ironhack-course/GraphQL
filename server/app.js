const express       = require('express');
const graphqlHTTP   = require('express-graphql');
const schema        = require('./schema/shema');
const mongoose      = require('mongoose');
const cors          = require('cors');

const app = express();

//allow cross-origin request
app.use(cors())

//connect to mongodb
mongoose.connect('mongodb+srv://cule:example123@cluster0-aqqz9.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('connected to the database');
});

//use graphql
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log(`Listening on port 4000!`)
})