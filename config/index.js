export default {
  'port': process.env.PORT || 5000,
  'socketPort': 4001,
  //'mongoUrl': 'mongodb://localhost:27017/pmp',
  'mongoUrl': process.env.MONGOLAB_URI || 'mongodb://root:edwin4312@ds149593.mlab.com:49593/pmp',
  'bodyLimit': '100Kb'
}
