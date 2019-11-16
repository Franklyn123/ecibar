/* eslint consistent-return:0 import/order:0 */
const express = require('express');
const logger = require('./logger');
const favicon = require('serve-favicon');
const path = require('path');
const rawicons = require('./rawicons');
const rawdocs = require('./rawdocs');
const argv = require('./argv');
const port = 7000;
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
  ? require('ngrok')
  : false;
const { resolve } = require('path');
const morgan = require('morgan');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');
const fi = require('./routes/api/ficha_inscripcion');
const asistencia = require('./routes/api/asistencia.route');
const seguimiento = require('./routes/api/seguimiento.route');
const historialExterno = require('./routes/api/hvendedor_externo.js');
const tramitador = require('./routes/api/tramitador.js');
const expediente = require('./routes/api/expediente.route');
const alumno = require('./routes/api/alumno.route');
const vehiculo = require('./routes/api/vehiculo.route');
const instructor = require('./routes/api/instructor.route');

// seguimiento de peticiones
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  ) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);
app.use('/api/fi', fi);
app.use('/api/asistencia', asistencia);
app.use('/api/seguimiento', seguimiento);
app.use('/api/historialexterno', historialExterno);
app.use('/api/tramitador', tramitador);
app.use('/api/expediente', expediente);
app.use('/api/alumno', alumno);
app.use('/api/vehiculo', vehiculo);
app.use('/api/instructor', instructor);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
// Load material icons

app.use('/api/icons', (req, res) => {
  res.json({
    records: [{ source: rawicons(req.query) }]
  });
});

// Load code preview
app.use('/api/docs', (req, res) => {
  res.json({
    records: [{ source: rawdocs(req.query) }]
  });
});

app.use('/', express.static('public', { etag: false }));
app.use(favicon(path.join('public', 'favicons', 'favicon.ico')));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + ".gz"; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
