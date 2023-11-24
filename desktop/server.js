const dbConnect = require('./src/app/database/connection');
const addInfo = require('./model/addData');
const addImg = require('./model/addImg');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();



app.use(cors())
dbConnect();


app.use(express.json());


app.get('/', (req, res) => {
  res.send('server is running !!!');
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });





app.post('/signup', upload.single('img'), async (req, res) => {
  try {
    const { fname, lname, phone, email, password, cpassword } = req.body;
    const img = req.file ? req.file.buffer : null;

    // Create a new user instance
    const newUser = new addInfo({
      fname,
      lname,
      phone,
      email,
      img,
      password,
      cpassword
    });

    console.log(req.body); // Log the request body
    console.log(req.file);

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message + 'Internal Server Error' });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginInfo = await addInfo.findOne({ email });
    if (email === loginInfo.email && password === loginInfo.password) {

      res.status(200).json(loginInfo);

    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/home', async (req, res) => {
  // console.log(req.body);
  // console.log(res.body);

});

app.post('/addimg', upload.single('img'), async (req, res) => {
  try {
    console.log(req);
    const { des } = req.body;
    const img = req.file ? req.file.buffer : null;

    // Create a new user instance
    const addcard = new addImg({
      des,
      img
    });

    console.log(req.body); // Log the request body
    console.log(req.file);

    // Save the user to the database
    await addcard.save();

    res.status(200).json({ message: 'card is created' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message + 'Internal Server Error' });
  }
});
app.get('/getimgdb', async (req, res) => {
  try {
    let getdata = await addImg.find({});
    res.send(getdata);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message + 'Internal Server Error' });
  }
})
app.post('/updatecard/:id', async (req, res) => {
  try {

    const updateData = req.body;
    const { id } = req.params;

    const find = await addImg.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(find);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.delete('/deletecard/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCard = await addImg.findByIdAndDelete(id);
    if (!deleteCard) throw "No card found";
    res.status(200).json({ message: 'card deleted successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: 'Not Found' });
  }
})

app.listen(8080);