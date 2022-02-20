var express = require('express');
const app = express();
const port = 8303;
const firebase = require('./firebase')
const { v4: uuidv4 } = require('uuid');
const ftp = require("basic-ftp")
const streamifier = require('streamifier');
const ip = require("ip");

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './uploads');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

//var storageRef = firebase.storage.ref("uploads/todo.json");

//var upload = multer({ storage: storage })

const upload = multer({
  storage: multer.memoryStorage()
})

//app.use(upload.single());

app.get('/', (req, res) => {
  res.send('hello people Gaben');
});

app.get('/api/file', (req, res) => {
    res.send('hello people Gaben');
});

function today() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  return yyyy + '-' + mm + '-' + dd;
}

async function fileUploadFtp(req, res) {
  const client = new ftp.Client()
    client.ftp.verbose = true;
    let fileIdentifier = uuidv4();
    let currDate = today();

    try {
      await client.access({
            host: "feketegabor.com",
            user: "u355818362",
            password: "gD5Abb421!",
            secure: false
        })
        //console.log(await client.list())
        await client.ensureDir("uploads/" + currDate);
        //let currentPath = await client.pwd();
        const file = req.file;
        const {mimetype, filename, size, path: localPath} = file;
        console.log('Path: ' + file.originalname);
        const stream = await streamifier.createReadStream(req.file.buffer).pipe(process.stdout);
        //await client.cd("uploads");
        //await client.cd(currDate);
        await client.uploadFrom(stream, fileIdentifier)
    }
    catch(err) {
      console.log(err)
  }
  res.set('Content-Type', 'application/json');
  res.status(200).send({
    'id': fileIdentifier,
    'date': currDate,
    'Content-Type': req.file.mimetype,
    'url': 'http://feketegabor.com/uploads/' + currDate + '/' + fileIdentifier
  });
  client.close()
}

function fileUpload(req, res) {
  if(!req.file) {
    res.status(400).send("Error: No files found")
  } else {
      let fileIdentifier = uuidv4();
      let currDate = today();
      const blob = firebase.bucket.file('uploads/' + currDate + '/' + fileIdentifier)

      const blobWriter = blob.createWriteStream({
          metadata: {
              contentType: req.file.mimetype
          }
      })

      blobWriter.on('error', (err) => {
          console.log(err)
      })

      blobWriter.on('finish', () => {
      let projectId = process.env.FIREBASE_PROJECT_ID ? process.env.FIREBASE_PROJECT_ID : 'pppp-59919';
    	const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${encodeURIComponent(blob.name)}?alt=media`;
      //publicUrl = publicUrl.replace('/', '%2F');

      console.log('Public URL: ' + publicUrl);

        res.set('Content-Type', 'application/json');
        res.status(200).send({
          'id': fileIdentifier,
          'date': currDate,
          'Content-Type': req.file.mimetype,
          'url': publicUrl,
          'apiUrl': '/download/' + currDate + '/' + fileIdentifier
        });
      })
      blobWriter.end(req.file.buffer)
  }
}

function mySlowFunction(baseNumber) {
	console.time('mySlowFunction');
	let result = 0;	
	for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {		
		result += Math.atan(i) * Math.tan(i);
	};
	console.timeEnd('mySlowFunction');
}

app.get('/api/scale', (req, res) => {
  var startTime, endTime;
  startTime = new Date();
  let baseNumber = req.query.baseNumber;
  console.log('Slow function on ' + ip.address()  + ' started with baseNumber: ' + baseNumber);
  mySlowFunction(baseNumber);
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  //timeDiff /= 1000;
  console.log('Slow function ended. Took: ' + Math.round(timeDiff) + "ms");
  res.send('Slow function ended on ' + ip.address()  + ' !');
})

app.get('/api/file/test', upload.single('file'), (req, res) => {
  res.status(200).send('Env variable: ' + process.env.AUTH_SERVICE_ENDPOINT);
})
//app.get('/test', upload.single('file'), (req, res) => {
//  res.status(200).send('Env variable: ' + process.env.AUTH_SERVICE_ENDPOINT);
//})

//app.post('/upload', upload.single('file'), (req, res) => {
//  fileUpload(req, res)
//})
app.post('/api/file/upload', upload.single('file'), (req, res) => {
  //console.log('This is the uploaded file: ' + req.file);
  fileUpload(req, res);
})


//app.get('/download/:date/:id', (req, res) => {
//  const fileDate = req.params.date;
//  const fileIdentifier = req.params.id;
//  console.log('fileIdentifier: ' + fileIdentifier);
//
//  const file = firebase.bucket.file('uploads/' + fileDate + '/' + fileIdentifier)
//  file.download().then(function(data) {
//    const contents = data[0];
//    res.set('Content-Type', file.metadata.contentType);
//    res.status(200).send(contents);
//  });
//});
app.get('/api/file/download/:date/:id', (req, res) => {
  const fileDate = req.params.date;
  const fileIdentifier = req.params.id;
  console.log('fileIdentifier: ' + fileIdentifier);

  const file = firebase.bucket.file('uploads/' + fileDate + '/' + fileIdentifier)
  file.download().then(function(data) {
    const contents = data[0];
    res.set('Content-Type', file.metadata.contentType);
    res.status(200).send(contents);
  });
});

//app.post('/meta', upload.single('file'), (req, res) => {
//  try {
//    res.send(req.file);
//  }catch(err) {
//    res.send(400);
//  }
//});
app.post('/api/file/meta', upload.single('file'), (req, res) => {
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
});

//app.post('/uploads', upload.array('files', 4) , (req, res) =>{
//  try {
//      res.send(req.files);
//  } catch(error) {
//        console.log(error);
//         res.send(400);
//  }
//});
app.post('/api/file/uploads', upload.array('files', 4) , (req, res) =>{
  try {
      res.send(req.files);
  } catch(error) {
        console.log(error);
         res.send(400);
  }
});

app.listen(port, () => {
    console.log('listening to the port: ' + port);
});