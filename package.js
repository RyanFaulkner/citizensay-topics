Package.describe({
  name: 'citizensay:topics'
});

Package.onUse(function(api) {
  api.versionsFrom('1.10.2');
  api.use([
      'ecmascript',
      'citizensay:core',
      'citizensay:workflows'
  ]);
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
});