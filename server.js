const app = require('./app');
const PORT    = process.env.PORT || 3000;

app.get("/", (req, res)=>{
	res.render('./login');
});

app.listen(PORT, ()=>{
	console.log(`Server started on port: ${PORT}`);
});