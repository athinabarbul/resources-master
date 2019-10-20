const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');

const products = require('./products.json');
const users = require('./users.json');
const orders = require('./orders.json');

const app = express();

app.use(cors());
app.use(bodyParser.json());

function toHeader({id, name, category, price}) {
    return { id, name, category, price };
}

function copy(id, { name, category, price, description, image }) {
    return { id, name, category, price, description, image };
}

function copyUser(username, fullName, roles, {cart}) {
	return { username, fullName, roles, cart };
}

let nextProductId = Math.max.apply(Math, Object.keys(products).map(n => parseInt(n, 10))) + 1;
let nextOrderId = Math.max.apply(Math, Object.keys(orders).map(n => parseInt(n, 10))) + 1;

app.get('/products', function (_, res) {
    res.send(Object.values(products)
        .sort((a, b) => a.id - b.id)
        .map(toHeader));
});

app.get('/products/:id', function (req, res) {
    if (products.hasOwnProperty(req.params.id)) {
        res.send(products[req.params.id]);
    } else {
        res.sendStatus(404);
    }
});

app.put('/products/:id', function (req, res) {
    if (products.hasOwnProperty(req.params.id)) {
        products[req.params.id] = copy(req.params.id, req.body || {});
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/products/:id', function (req, res) {
    if (products.hasOwnProperty(req.params.id)) {
        delete products[req.params.id];
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.post('/products', function (req, res) {
    const id = nextProductId++;
    const product = copy(id, req.body || {});
    products[id] = product;
    res.send(product);
});

app.post('/login', function (req, res) {
    const user = users[req.body.username];
    if (user && user.password === req.body.password) {
        const {password, ...withoutPassword} = user;
        res.send(withoutPassword)
    } else {
        res.sendStatus(401);
    }
});

app.get('/orders', function (_, res) {
    res.send(Object.values(orders));
});

app.get('/users', function (_, res) {
	var noPasswordUsers = [];
	var userList = Object.values(users)
	for (var i = 0; i < userList.length; i++) {	
		const {password, ...withoutPassword} = userList[i];	
		noPasswordUsers.push(withoutPassword);
	}
    res.send(Object.values(noPasswordUsers));
});

app.get('/users/:username', function (req, res) {
    if (users.hasOwnProperty(req.params.username)) {
       const user = users[req.params.username];
	   const {password, ...withoutPassword} = user;
       res.send(withoutPassword)
    } else {
        res.sendStatus(404);
    }
});

app.patch('/users/:username', function (req, res) {
   if (users.hasOwnProperty(req.params.username)) {
	    var currentUser = users[req.params.username];
        users[req.params.username] = copyUser(req.params.username, currentUser.fullName, currentUser.roles, req.body || {});
		res.send(users[req.params.username]);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.post('/orders', function (req, res) {
	
	const id = nextOrderId++;
	
    if (users[req.body.customer]) {
        for (let line of (req.body.products || [])) {
            if (line.quantity && !products[line.productId]) {
                res.status(404).send("Product " + line.productId + " not found.");
                return;
            }
        }
		
		orders[id] = req.body;
        res.sendStatus(201);
    } else {
        res.status(404).send("Customer not found.");
    }
});

app.use('/', swagger.serve, swagger.setup(require('./swagger.json')));

app.listen(3000, function() {
    console.log('Server listening on port 3000... Press CTRL + C to stop.')
});
